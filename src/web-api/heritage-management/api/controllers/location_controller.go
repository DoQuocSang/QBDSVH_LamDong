package controllers

import (
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// GetAllLocations trả về danh sách tất cả các địa điểm
func GetAllLocations(c *gin.Context) {
	var locations []models.Location

	if err := db.GetDB().Find(&locations).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get locations")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, locations)
}

// GetAllLocations trả về danh sách tất cả các địa điểm với phân trang
func GetPagedLocations(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var locations []models.Location_Full_Info

	// Đếm tổng số lượng địa điểm
	if err := db.GetDB().Model(&models.Location{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get locations")
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
	// if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Find(&locations).Error; err != nil {
	// 	utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
	// 	return
	// }

	// Phân trang
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder
	if err := db.GetDB().Model(&models.Location{}).
		Select("locations.*, COUNT(heritages.id) as heritage_count").
		Joins("LEFT JOIN heritages ON locations.id = heritages.location_id").
		Group("locations.id").
		Order(orderClause).
		Offset(offset).
		Limit(limit).
		Find(&locations).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(locations) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       locations,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// GetLocationByID trả về thông tin của một địa điểm dựa trên ID
func GetLocationByID(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, location)
}

// CreateLocation tạo mới một địa điểm
func CreateLocation(c *gin.Context) {
	var location models.Location

	if err := c.ShouldBindJSON(&location); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create location")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, location)
}

// UpdateLocation cập nhật thông tin của một địa điểm dựa trên ID
func UpdateLocation(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	if err := c.ShouldBindJSON(&location); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update location")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, location)
}

// DeleteLocation xóa một địa điểm dựa trên ID
func DeleteLocation(c *gin.Context) {
	id := c.Param("id")

	var location models.Location

	if err := db.GetDB().Where("id = ?", id).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	if err := db.GetDB().Delete(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete location")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Location deleted successfully"})
}

// GetHeritageByLocationSlug trả về danh sách di sản văn hóa dựa trên URL slug của địa điểm
func GetHeritageByLocationSlug(c *gin.Context) {
	locationSlug := c.Param("urlSlug")

	var location models.Location
	if err := db.GetDB().Where("urlslug = ?", locationSlug).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	var heritage []models.Heritage
	if err := db.GetDB().Where("location_id = ?", location.ID).Find(&heritage).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritage)
}

// GetPagedHeritageByLocationSlug trả về danh sách di sản văn hóa dựa trên URL slug của địa điểm có phân trang
func GetPagedHeritageByLocationSlug(c *gin.Context) {
	locationSlug := c.Param("urlSlug")
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	// Lấy thông tin của địa điểm dựa trên URL slug
	var location models.Location
	if err := db.GetDB().Where("urlslug = ?", locationSlug).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	// Tìm tổng số lượng di sản văn hóa dựa trên ID của địa điểm
	var total int64
	if err := db.GetDB().Model(&models.Heritage{}).Where("location_id = ?", location.ID).Count(&total).Error; err != nil {
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

	// Truy vấn di sản văn hóa dựa trên ID của địa điểm và phân trang
	var heritages []models.Heritage
	if err := db.GetDB().Order(orderClause).Where("location_id = ?", location.ID).Offset(offset).Limit(limit).Preload("HeritageType").Preload("HeritageCategory").Preload("Location").Preload("ManagementUnit").Find(&heritages).Error; err != nil {
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

// GetLocationBySlug trả về thông tin của một địa điểm dựa trên slug
func GetLocationBySlug(c *gin.Context) {
	slug := c.Param("urlSlug")

	var location models.Location

	if err := db.GetDB().Where("urlslug = ?", slug).First(&location).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Location not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, location)
}

// SearchLocation trả về thông tin địa điểm theo tên
func SearchLocation(c *gin.Context) {
	hq := models.HeritageQuery{}
	if err := c.ShouldBindQuery(&hq); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid search parameters")
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	query := db.GetDB().Model(&models.Location{})

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

	var locations []models.Location
	if err := query.Order(orderClause).Offset(offset).Limit(limit).Find(&locations).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       locations,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}
