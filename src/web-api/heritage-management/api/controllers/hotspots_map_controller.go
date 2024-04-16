package controllers

import (
	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GetAllHotsportMap trả về danh sách tất cả các địa điểm
func GetAllHotsportMap(c *gin.Context) {
	var hotspots_map []models.Hotspots_Map

	if err := db.GetDB().Find(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get all scene-id")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hotspots_map)
}

// GetHotspotsMapByID trả về thông tin của ID của hotspotsmap
func GetHotspotsMapByID(c *gin.Context) {
	id := c.Param("id")

	var hotspots_map models.Hotspots_Map

	if err := db.GetDB().Where("id = ?", id).First(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Hotspots-map not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hotspots_map)
}

// CreateHotspotsMap tạo mới một hotspotsmap
func CreateHotspotsMap(c *gin.Context) {
	var hotspots_map models.Hotspots_Map

	if err := c.ShouldBindJSON(&hotspots_map); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create hotspots")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, gin.H{"id": hotspots_map.ID})
}

// UpdateHotspotsMap cập nhật thông tin của một địa điểm dựa trên ID
func UpdateHotspotsMap(c *gin.Context) {
	id := c.Param("id")

	var hotspots_map models.Hotspots_Map

	if err := db.GetDB().Where("id = ?", id).First(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Map-hotspots not found")
		return
	}

	if err := c.ShouldBindJSON(&hotspots_map); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update hotspots_map")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, hotspots_map)
}

// DeleteHotspots-map xóa một hotspots dựa trên ID
func DeleteHHotspotsMap(c *gin.Context) {
	id := c.Param("id")

	var hotspots_map models.Hotspots_Map

	if err := db.GetDB().Where("id = ?", id).First(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Hotspots-map not found")
		return
	}

	if err := db.GetDB().Delete(&hotspots_map).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete Hotspots-map")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Hotspots-map deleted successfully"})
}
