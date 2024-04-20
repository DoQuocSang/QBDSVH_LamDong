package controllers

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// Lấy id của item cuối cùng được thêm vào bảng
func GetLastInsertedSceneID(c *gin.Context) {
	var lastInsertedID int

	// Sử dụng Last() để lấy dữ liệu cuối cùng từ bảng
	result := db.GetDB().Raw("SELECT id FROM scenes ORDER BY id DESC LIMIT 1").Scan(&lastInsertedID)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Trả về ID của item cuối cùng được thêm vào bảng
	utils.SuccessResponse(c, http.StatusOK, gin.H{"last_inserted_id": lastInsertedID})
}

func GetPagedSceneByManagementUnitID(c *gin.Context) {
	managementUnitID := c.Param("id")

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var scenes []models.SceneWithPanoramaImage

	if err := db.GetDB().Model(&models.Scene_DTO{}).Where("management_unit_id = ?", managementUnitID).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	offset := (page - 1) * limit

	orderClause := columnName + " " + sortOrder
	err := db.GetDB().
		Table("scenes").
		Select("scenes.id, scenes.name").
		Where("scenes.management_unit_id = ?", managementUnitID).
		Order(orderClause).
		Offset(offset).
		Limit(limit).
		Find(&scenes).Error

	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	sceneIDs := make([]int, len(scenes))
	for i, scene := range scenes {
		sceneIDs[i] = scene.ID
	}

	var panoramaImages []models.PanoramaImage_DTO
	err = db.GetDB().
		Table("panorama_images").
		Select("scene_id, thumbnail_url").
		Where("scene_id IN (?) AND is_current_use = 1", sceneIDs).
		Find(&panoramaImages).Error

	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	sceneMap := make(map[int]string)
	for _, image := range panoramaImages {
		sceneMap[image.Scene_ID] = image.Thumbnail_Url
	}

	for i, scene := range scenes {
		if url, ok := sceneMap[scene.ID]; ok {
			scenes[i].Thumbnail_URL = url
		}
	}

	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       scenes,
	}

	// Return success response with paginated data
	utils.SuccessResponse(c, http.StatusOK, pagination)
}
