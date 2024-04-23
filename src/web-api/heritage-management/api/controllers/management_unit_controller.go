package controllers

import (
	"errors"
	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetPagedManagementUnits trả về danh sách tất cả các đơn vị quản lý với phân trang
func GetPagedManagementUnits(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var ManagementUnits []models.Management_Unit_FullInfo

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.Management_Unit{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Đếm tổng số trang
	// Chia % vì nếu chia có dư thì đồng nghĩa vẫn còn trang sau nên phải tăng thêm 1
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	// // Phân trang
	// offset := (page - 1) * limit
	// orderClause := columnName + " " + sortOrder
	// if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Find(&ManagementUnits).Error; err != nil {
	// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
	// 	return
	// }

	// Phân trang
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder
	if err := db.GetDB().Model(&models.Management_Unit{}).
		Select("management_units.*, COUNT(heritages.id) as heritage_count").
		Joins("LEFT JOIN heritages ON management_units.id = heritages.management_unit_id").
		Group("management_units.id").
		Order(orderClause).
		Offset(offset).
		Limit(limit).
		Find(&ManagementUnits).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(ManagementUnits) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       ManagementUnits,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetManagementUnitByID trả về thông tin của một đơn vị quản lý dựa trên ID
func GetManagementUnitByID(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management unit not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, ManagementUnit)
}

// CreateManagementUnit tạo mới một đơn vị quản lý
func CreateManagementUnit(c *gin.Context) {
	var ManagementUnit models.Management_Unit

	if err := c.ShouldBindJSON(&ManagementUnit); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create management unit")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, ManagementUnit)
}

// UpdateManagementUnit cập nhật thông tin của một đơn vị quản lý dựa trên ID
func UpdateManagementUnit(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	// Lấy thông tin về đơn vị quản lý dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management unit not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&ManagementUnit); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update management unit")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, ManagementUnit)
}

// DeleteManagementUnit xóa một đơn vị quản lý dựa trên ID
func DeleteManagementUnit(c *gin.Context) {
	id := c.Param("id")

	var ManagementUnit models.Management_Unit

	// Lấy thông tin về đơn vị quản lý dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management unit not found")
		return
	}

	// Xóa đơn vị quản lý khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete management unit")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Management unit deleted successfully"})
}

// GetHeritageByUnitSlug trả về danh sách di sản văn hóa dựa trên URL slug của đơn vị
func GetHeritageByUnitSlug(c *gin.Context) {
	unitSlug := c.Param("urlSlug")

	var unit models.Management_Unit
	if err := db.GetDB().Where("urlslug = ?", unitSlug).First(&unit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Unit not found")
		return
	}

	var heritage []models.Heritage
	if err := db.GetDB().Where("management_unit_id = ?", unit.ID).Find(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// GetPagedHeritageByUnitSlug trả về danh sách di sản văn hóa dựa trên URL slug của đơn vị có phân trang
func GetPagedHeritageByUnitSlug(c *gin.Context) {
	unitSlug := c.Param("urlSlug")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	// Lấy thông tin của địa điểm dựa trên URL slug
	var unit models.Management_Unit
	if err := db.GetDB().Where("urlslug = ?", unitSlug).First(&unit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Unit not found")
		return
	}

	// Tìm tổng số lượng di sản văn hóa dựa trên ID của đơn vị
	var total int64
	if err := db.GetDB().Model(&models.Heritage{}).Where("management_unit_id = ?", unit.ID).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Tính toán số trang, offset và loại sắp xếp
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder

	// Truy vấn di sản văn hóa dựa trên ID của đơn vị và phân trang
	var heritages []models.Heritage
	if err := db.GetDB().Order(orderClause).Where("management_unit_id = ?", unit.ID).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(heritages) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No heritage available")
		return
	}

	// // Lấy danh sách hình ảnh cho mỗi di sản
	// for i := range heritages {
	// 	var heritageParagraphs []models.Heritage_Paragraph

	// 	if err := db.GetDB().Where("heritage_id = ?", heritages[i].ID).Find(&heritageParagraphs).Error; err != nil {
	// 		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
	// 		return
	// 	}

	// 	images := make([]string, 0)

	// 	for _, paragraph := range heritageParagraphs {
	// 		images = append(images, paragraph.ImageURL)
	// 	}

	// 	// Gán danh sách hình ảnh vào thuộc tính Images của di sản tương ứng
	// 	heritages[i].Images = images
	// }

	// Dùng Map để cải thiện hiệu suất api, giảm số lần truy vấn dữ liệu
	// Lấy danh sách hình ảnh cho mỗi di sản
	var heritageIDs []int

	for i := range heritages {
		heritageIDs = append(heritageIDs, heritages[i].ID)
	}

	var heritageParagraphs []models.Heritage_Paragraph

	if err := db.GetDB().Where("heritage_id IN ?", heritageIDs).Find(&heritageParagraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraphs")
		return
	}

	// Tạo map để lưu trữ danh sách hình ảnh cho từng di sản
	heritageImagesMap := make(map[int][]string)

	for _, paragraph := range heritageParagraphs {
		imageURLs := strings.Split(paragraph.ImageURL, ",")

		for _, url := range imageURLs {
			trimmedURL := strings.TrimSpace(url)
			if trimmedURL != "" {
				heritageImagesMap[paragraph.Heritage_ID] = append(heritageImagesMap[paragraph.Heritage_ID], trimmedURL)
			}
		}
	}

	// Gán danh sách hình ảnh vào thuộc tính Images của di sản tương ứng
	for i := range heritages {
		// Biến ok dùng để kiểm tra giá trị có tồn tại không
		if images, ok := heritageImagesMap[heritages[i].ID]; ok {
			heritages[i].Images = images
		} else {
			heritages[i].Images = []string{} // Gán mảng rỗng nếu không có ảnh
		}
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       heritages,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetManagementUnitBySlug trả về thông tin của một đơn vị quản lý dựa trên slug
func GetManagementUnitBySlug(c *gin.Context) {
	slug := c.Param("urlSlug")

	var managementUnit models.Management_Unit

	if err := db.GetDB().Where("urlslug = ?", slug).First(&managementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management Unit not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, managementUnit)
}

// SearchUnit trả về thông tin đơn vị theo tên
func SearchUnit(c *gin.Context) {
	hq := models.HeritageQuery{}
	if err := c.ShouldBindQuery(&hq); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid search parameters")
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	query := db.GetDB().Model(&models.Management_Unit{})

	if hq.Key != "" {
		query = query.Where("name LIKE ?", "%"+hq.Key+"%")
	}

	var total int64
	if err := query.Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder

	var units []models.Management_Unit
	if err := query.Order(orderClause).Offset(offset).Limit(limit).Find(&units).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       units,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// cập nhật image 360 của một đơn vị quản lý
func UpdateManagementUnitImage360(c *gin.Context) {
	id := c.Param("id")

	var management_unit models.Management_Unit_DTO

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&management_unit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management Unit not found")
		return
	}

	// Tạo một struct để chứa thông tin cập nhật chỉ thuộc tính image_360_url
	var updateData struct {
		Image_360_URL string `json:"image_360_url"`
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&updateData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Cập nhật chỉ thuộc tính model_360_url
	management_unit.Image360Url = updateData.Image_360_URL

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&management_unit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not Management Unit")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, management_unit)
}

// ----------------------------------------

// // CreateHeritageAndParagraphs tạo một di sản mới và các mô tả di sản cho di sản đó
// func CreateSceneWithPanoramaImageAndHotspot(c *gin.Context) {
// 	var requestData struct {
// 		Scenes []models.SceneData `json:"scenes"`
// 	}

// 	if err := c.ShouldBindJSON(&requestData); err != nil {
// 		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request data")
// 		return
// 	}

// 	// Map để lưu trữ mapping giữa scene_id cũ và scene_id mới
// 	sceneMap := make(map[int]int)

// 	// Thêm tất cả scene trước
// 	for _, sceneData := range requestData.Scenes {
// 		// Tạo scene mới
// 		newScene := sceneData.Scene
// 		// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
// 		newScene.ID = 0
// 		if err := db.GetDB().Create(&newScene).Error; err != nil {
// 			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create scene")
// 			return
// 		}

// 		// Lưu trữ mapping giữa scene_id cũ và scene_id mới
// 		sceneMap[sceneData.Scene.ID] = newScene.ID
// 	}

// 	// Thêm dữ liệu vào bảng panorama_images và hotspots
// 	for _, sceneData := range requestData.Scenes {
// 		// Cập nhật scene_id mới cho panorama_image
// 		panoramaImage := sceneData.PanoramaImage
// 		// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
// 		// panoramaImage.ID = 0
// 		panoramaImage.Scene_ID = sceneMap[sceneData.Scene.ID]
// 		panoramaImage.Is_Current_Use = 1

// 		// Thêm panorama_image vào bảng panorama_images
// 		// if err := db.GetDB().Create(&panoramaImage).Error; err != nil {
// 		// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create panorama image")
// 		// 	return
// 		// }

// 		// Cập nhật panorama_image trong bảng panorama_images thay vì tạo mới
// 		if err := db.GetDB().Model(&panoramaImage).Where("id = ?", panoramaImage.ID).Updates(panoramaImage).Error; err != nil {
// 			// Xử lý lỗi
// 			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update panorama image")
// 			return
// 		}

// 		// Cập nhật scene_id mới và thêm dữ liệu vào bảng hotspots
// 		for _, hotspot := range sceneData.Hotspots {
// 			// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
// 			hotspot.ID = 0
// 			hotspot.Scene_ID = sceneMap[sceneData.Scene.ID]
// 			hotspot.Move_Scene_ID = sceneMap[hotspot.Move_Scene_ID]
// 			if err := db.GetDB().Create(&hotspot).Error; err != nil {
// 				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspot")
// 				return
// 			}
// 		}
// 	}
// 	utils.SuccessResponse(c, http.StatusCreated, gin.H{
// 		"scenes": requestData.Scenes,
// 	})
// }

// func CreateOrUpdateManagementUnitWithSceneData(c *gin.Context) {
// 	var requestData struct {
// 		ManagementUnit models.Management_Unit `json:"management_unit"`
// 		Scenes         []models.SceneData     `json:"scenes"`
// 	}

// 	if err := c.ShouldBindJSON(&requestData); err != nil {
// 		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request data")
// 		return
// 	}

// 	// Kiểm tra xem ManagementUnit có tồn tại không
// 	var existingManagementUnit models.Management_Unit
// 	result := db.GetDB().Where("id = ?", requestData.ManagementUnit.ID).First(&existingManagementUnit)

// 	if result.Error == nil {
// 		// Nếu ManagementUnit đã tồn tại, cập nhật toàn bộ
// 		if err := db.GetDB().Model(&existingManagementUnit).Where("id = ?", requestData.ManagementUnit.ID).Updates(requestData.ManagementUnit).Error; err != nil {
// 			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update management unit")
// 			return
// 		}
// 		// Lưu ID hiện tại của ManagementUnit để sử dụng sau
// 		requestData.ManagementUnit.ID = existingManagementUnit.ID
// 	} else {
// 		// Nếu ManagementUnit không tồn tại, thêm mới
// 		if err := db.GetDB().Create(&requestData.ManagementUnit).Error; err != nil {
// 			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create management unit")
// 			return
// 		}
// 		// // Lưu ID mới của ManagementUnit để cập nhật lại trong các Scene
// 		// requestData.ManagementUnit.ID = requestData.ManagementUnit.ID
// 	}

// 	// Map để lưu trữ mapping giữa ID cũ và ID mới của Scene
// 	sceneIDMap := make(map[int]int)

// 	// Xử lý scenes trong requestData
// 	for _, sceneData := range requestData.Scenes {
// 		// Xử lý scene
// 		scene := sceneData.Scene

// 		// Cập nhật management_unit_id của Scene với ID mới của ManagementUnit
// 		scene.Management_Unit_Id = requestData.ManagementUnit.ID

// 		// Tìm scene trong cơ sở dữ liệu dựa trên ID
// 		var existingScene models.Scene
// 		result = db.GetDB().Where("id = ?", scene.ID).First(&existingScene)

// 		if result.Error == nil {
// 			// Nếu scene đã tồn tại, cập nhật toàn bộ scene
// 			if err := db.GetDB().Model(&existingScene).Where("id = ?", scene.ID).Updates(scene).Error; err != nil {
// 				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update scene")
// 				return
// 			}
// 			// Lưu ID hiện tại của scene
// 			sceneIDMap[scene.ID] = existingScene.ID
// 		} else {
// 			// Nếu scene không tồn tại, thêm scene mới
// 			if err := db.GetDB().Create(&scene).Error; err != nil {
// 				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create scene")
// 				return
// 			}
// 			// Lưu ID mới của scene
// 			sceneIDMap[scene.ID] = scene.ID
// 		}

// 		// Xử lý panorama image
// 		panoramaImage := sceneData.PanoramaImage
// 		panoramaImage.Scene_ID = sceneIDMap[scene.ID] // Liên kết với ID mới của scene
// 		panoramaImage.Is_Current_Use = 1

// 		// Kiểm tra xem panorama image có tồn tại không
// 		var existingPanoramaImage models.PanoramaImage
// 		result = db.GetDB().Where("id = ?", panoramaImage.ID).First(&existingPanoramaImage)

// 		if result.Error == nil {
// 			// Nếu panorama image đã tồn tại, cập nhật toàn bộ panorama image
// 			if err := db.GetDB().Model(&existingPanoramaImage).Where("id = ?", panoramaImage.ID).Updates(panoramaImage).Error; err != nil {
// 				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update panorama image")
// 				return
// 			}
// 		} else {
// 			// Nếu panorama image không tồn tại, thêm mới
// 			if err := db.GetDB().Create(&panoramaImage).Error; err != nil {
// 				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create panorama image")
// 				return
// 			}
// 		}

// 		// Xử lý hotspots
// 		for _, hotspot := range sceneData.Hotspots {
// 			// Liên kết với ID mới của scene và Move_Scene_ID
// 			hotspot.Scene_ID = sceneIDMap[scene.ID]
// 			hotspot.Move_Scene_ID = sceneIDMap[hotspot.Move_Scene_ID]

// 			// Kiểm tra xem hotspot có tồn tại không
// 			var existingHotspot models.Hotspot
// 			result = db.GetDB().Where("id = ?", hotspot.ID).First(&existingHotspot)

// 			if result.Error == nil {
// 				// Nếu hotspot đã tồn tại, cập nhật toàn bộ hotspot
// 				if err := db.GetDB().Model(&existingHotspot).Where("id = ?", hotspot.ID).Updates(hotspot).Error; err != nil {
// 					utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update hotspot")
// 					return
// 				}
// 			} else {
// 				// Nếu hotspot không tồn tại, thêm mới
// 				if err := db.GetDB().Create(&hotspot).Error; err != nil {
// 					utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspot")
// 					return
// 				}
// 			}
// 		}
// 	}

// 	utils.SuccessResponse(c, http.StatusOK, requestData)
// }

func GetManagementUnitWithSceneDataByID(c *gin.Context) {
	// Lấy management_unit_id từ URL hoặc body request
	managementUnitID := c.Param("id")
	if managementUnitID == "" {
		utils.ErrorResponse(c, http.StatusBadRequest, "management_unit_id is required")
		return
	}

	// Tạo struct để lưu kết quả
	var resultData struct {
		ManagementUnit models.Management_Unit `json:"management_unit"`
		Scenes         []models.SceneData     `json:"scenes"`
	}

	// Lấy thông tin đơn vị quản lý
	if err := db.GetDB().Where("id = ?", managementUnitID).First(&resultData.ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management unit not found")
		return
	}

	// Truy vấn cơ sở dữ liệu để lấy danh sách các scene theo management_unit_id
	var scenes []models.Scene
	if err := db.GetDB().Where("management_unit_id = ?", managementUnitID).Find(&scenes).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not fetch scenes")
		return
	}

	// Duyệt qua các scene đã truy vấn được
	for _, scene := range scenes {
		// Tạo SceneData để lưu dữ liệu cho scene hiện tại
		sceneData := models.SceneData{
			Scene: scene,
		}

		// Truy vấn cơ sở dữ liệu để lấy panorama_image tương ứng với scene
		var panoramaImage models.PanoramaImage
		if err := db.GetDB().Where("scene_id = ? AND is_current_use = 1", scene.ID).First(&panoramaImage).Error; err != nil && !errors.Is(err, gorm.ErrRecordNotFound) {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not fetch panorama image")
			return
		}
		sceneData.PanoramaImage = panoramaImage

		// Truy vấn cơ sở dữ liệu để lấy mảng các hotspots tương ứng với scene
		var hotspots []models.Hotspot
		if err := db.GetDB().Where("scene_id = ?", scene.ID).Find(&hotspots).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not fetch hotspots")
			return
		}
		sceneData.Hotspots = hotspots

		// Truy vấn cơ sở dữ liệu để lấy vị trí hotspot trên map tương ứng với sceneg
		var hotspotMap models.Hotspots_Map
		if err := db.GetDB().Where("scene_id = ?", scene.ID).First(&hotspotMap).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not fetch hotspot map")
			return
		}
		sceneData.HotspotMap = hotspotMap

		// Thêm sceneData vào mảng kết quả
		resultData.Scenes = append(resultData.Scenes, sceneData)
	}

	// Trả về dữ liệu kết quả
	utils.SuccessResponse(c, http.StatusOK, resultData)
}

// CreateSceneWithPanoramaImageAndHotspot
func CreateManagementUnitWithSceneData(c *gin.Context) {
	var requestData struct {
		ManagementUnit models.Management_Unit `json:"management_unit"`
		Scenes         []models.SceneData     `json:"scenes"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request data")
		return
	}

	// Tạo đơn vị quản lý
	if err := db.GetDB().Create(&requestData.ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create management unit")
		return
	}

	// Map để lưu trữ mapping giữa scene_id cũ và scene_id mới
	sceneMap := make(map[int]int)

	// Thêm tất cả scene trước
	for _, sceneData := range requestData.Scenes {
		// Tạo scene mới
		newScene := sceneData.Scene
		// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
		newScene.ID = 0
		// Cập nhật management_unit_id của Scene với ID mới của ManagementUnit
		newScene.Management_Unit_Id = requestData.ManagementUnit.ID

		if err := db.GetDB().Create(&newScene).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create scene")
			return
		}

		// Lưu trữ mapping giữa scene_id cũ và scene_id mới
		sceneMap[sceneData.Scene.ID] = newScene.ID
	}

	// Thêm dữ liệu vào bảng panorama_images và hotspots
	for _, sceneData := range requestData.Scenes {
		// Cập nhật scene_id mới cho panorama_image
		panoramaImage := sceneData.PanoramaImage
		// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
		// panoramaImage.ID = 0
		panoramaImage.Scene_ID = sceneMap[sceneData.Scene.ID]
		panoramaImage.Is_Current_Use = 1

		// Thêm panorama_image vào bảng panorama_images
		// if err := db.GetDB().Create(&panoramaImage).Error; err != nil {
		// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create panorama image")
		// 	return
		// }

		// Cập nhật panorama_image trong bảng panorama_images thay vì tạo mới
		if err := db.GetDB().Model(&panoramaImage).Where("id = ?", panoramaImage.ID).Updates(panoramaImage).Error; err != nil {
			// Xử lý lỗi
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update panorama image")
			return
		}

		// Cập nhật scene_id mới và thêm dữ liệu vào bảng hotspots
		for _, hotspot := range sceneData.Hotspots {
			// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
			hotspot.ID = 0
			hotspot.Scene_ID = sceneMap[sceneData.Scene.ID]
			hotspot.Move_Scene_ID = sceneMap[hotspot.Move_Scene_ID]
			if err := db.GetDB().Create(&hotspot).Error; err != nil {
				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspot")
				return
			}
		}

		// Thêm mới hotspots_map
		hotspotMap := sceneData.HotspotMap
		hotspotMap.Scene_ID = sceneMap[sceneData.Scene.ID]

		// Thêm hoặc cập nhật hotspots_map vào bảng hotspots_maps
		if err := db.GetDB().Create(&hotspotMap).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspot map")
			return
		}
	}
	utils.SuccessResponse(c, http.StatusCreated, requestData)
}

func UpdateManagementUnitWithSceneData(c *gin.Context) {
	// Lấy id từ param
	managementUnitID := c.Param("id")

	var requestData struct {
		ManagementUnit models.Management_Unit `json:"management_unit"`
		Scenes         []models.SceneData     `json:"scenes"`
	}

	if err := c.ShouldBindJSON(&requestData); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request data")
		return
	}

	// Kiểm tra xem đơn vị quản lý có tồn tại không
	var existingManagementUnit models.Management_Unit
	if err := db.GetDB().Where("id = ?", managementUnitID).First(&existingManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Management unit not found")
		return
	}

	// Cập nhật đơn vị quản lý với dữ liệu từ request
	if err := db.GetDB().Model(&existingManagementUnit).Updates(requestData.ManagementUnit).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update management unit")
		return
	}

	// Xóa tất cả scenes và hotspots theo management unit ID
	var scenes []models.Scene
	db.GetDB().Where("management_unit_id = ?", managementUnitID).Find(&scenes)

	// Xóa tất cả hotspots của scenes
	var sceneIDs []int
	for _, scene := range scenes {
		sceneIDs = append(sceneIDs, scene.ID)
	}

	// Lấy danh sách hotspot hiện có trong cơ sở dữ liệu cho management unit này
	existingHotspots := make(map[int]bool)
	db.GetDB().Model(&models.Hotspot{}).Where("scene_id IN (?)", sceneIDs).Pluck("id", &existingHotspots)

	db.GetDB().Where("scene_id IN (?)", sceneIDs).Delete(&models.Hotspot{})

	db.GetDB().Where("scene_id IN (?)", sceneIDs).Delete(&models.Hotspots_Map{})

	db.GetDB().Where("scene_id IN (?)", sceneIDs).Model(&models.PanoramaImage{}).Update("is_current_use", 0)

	db.GetDB().Where("management_unit_id = ?", managementUnitID).Delete(&models.Scene{})

	// Map để lưu trữ mapping giữa scene_id cũ và scene_id mới
	sceneMap := make(map[int]int)

	// Thêm mới scenes
	for _, sceneData := range requestData.Scenes {
		// Tạo scene mới
		newScene := sceneData.Scene
		// Loại bỏ giá trị id để cơ sở dữ liệu tự động tạo id mới
		// newScene.ID = 0

		// Chuyển đổi từ string sang int
		managementUnitIDInt, err := strconv.Atoi(managementUnitID)
		if err != nil {
			utils.ErrorResponse(c, http.StatusBadRequest, "Invalid management unit ID")
			return
		}

		newScene.Management_Unit_Id = managementUnitIDInt

		// if err := db.GetDB().Create(&newScene).Error; err != nil {
		// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create scene")
		// 	return
		// }

		// Sử dụng FirstOrCreate để thêm mới hoặc cập nhật scene
		if err := db.GetDB().Where(models.Scene{ID: newScene.ID}).Assign(newScene).FirstOrCreate(&newScene).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create or update scene")
			return
		}

		// Lưu trữ mapping giữa scene_id cũ và scene_id mới
		sceneMap[sceneData.Scene.ID] = newScene.ID
	}

	// Thêm mới panorama_images và hotspots
	for _, sceneData := range requestData.Scenes {
		// Cập nhật scene_id mới cho panorama_image
		panoramaImage := sceneData.PanoramaImage
		panoramaImage.Scene_ID = sceneMap[sceneData.Scene.ID]
		panoramaImage.Is_Current_Use = 1

		// Thêm hoặc cập nhật panorama_image vào bảng panorama_images
		if err := db.GetDB().Where("id = ?", panoramaImage.ID).Assign(panoramaImage).FirstOrCreate(&panoramaImage).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create or update panorama image")
			return
		}

		// Thêm mới hotspots
		for _, hotspot := range sceneData.Hotspots {
			// Loại bỏ giá trị ID để cơ sở dữ liệu tự động tạo ID mới
			// hotspot.ID = 0
			// Liên kết scene_id và move_scene_id mới
			hotspot.Scene_ID = sceneMap[sceneData.Scene.ID]
			hotspot.Move_Scene_ID = sceneMap[hotspot.Move_Scene_ID]

			if err := db.GetDB().Where("id = ?", hotspot.ID).Assign(hotspot).FirstOrCreate(&hotspot).Error; err != nil {
				utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create or update hotspot")
				return
			}
			// if err := db.GetDB().Create(&hotspot).Error; err != nil {
			// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspot")
			// 	return
			// }
		}

		// Thêm mới hotspots_map
		hotspotMap := sceneData.HotspotMap
		hotspotMap.Scene_ID = sceneMap[sceneData.Scene.ID]

		// Thêm hoặc cập nhật hotspots_map vào bảng hotspots_maps
		if err := db.GetDB().Where("id = ?", hotspotMap.ID).Assign(hotspotMap).FirstOrCreate(&hotspotMap).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create or update hotspot map")
			return
		}
	}

	utils.SuccessResponse(c, http.StatusCreated, requestData)
}

func DeleteManagementUnitWithScenesData(c *gin.Context) {
	// Lấy id từ param
	managementUnitID := c.Param("id")

	// Chuyển đổi từ string sang int
	managementUnitIDInt, err := strconv.Atoi(managementUnitID)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid management unit ID")
		return
	}

	// Lấy danh sách các scene thuộc management unit
	var scenes []models.Scene
	db.GetDB().Where("management_unit_id = ?", managementUnitIDInt).Find(&scenes)

	// Xóa các hotspot thuộc các scene
	var sceneIDs []int
	for _, scene := range scenes {
		sceneIDs = append(sceneIDs, scene.ID)
	}

	// Xóa tất cả các hotspots của scenes
	db.GetDB().Where("scene_id IN (?)", sceneIDs).Delete(&models.Hotspot{})

	// Xóa hotspot map của scene
	db.GetDB().Where("scene_id IN (?)", sceneIDs).Delete(&models.Hotspots_Map{})

	// Cập nhật `is_current_use` của các `panorama_image` thuộc scene_id thành 0
	db.GetDB().Where("scene_id IN (?)", sceneIDs).Model(&models.PanoramaImage{}).Update("is_current_use", 0)

	// Xóa các scene thuộc management unit
	db.GetDB().Where("management_unit_id = ?", managementUnitIDInt).Delete(&models.Scene{})

	// Xóa management unit theo ID
	if err := db.GetDB().Where("id = ?", managementUnitIDInt).Delete(&models.Management_Unit{}).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete management unit")
		return
	}

	// Trả về thông báo thành công
	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Management unit deleted successfully"})
}
