package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// GetAllHeritageParagraphs trả về danh sách tất cả các đoạn mô tả di sản
func GetAllHeritageParagraphs(c *gin.Context) {
	var heritageParagraphs []models.Heritage_Paragraph

	if err := db.GetDB().Find(&heritageParagraphs).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get heritage paragraph")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritageParagraphs)
}

// GetHeritageParagraphByID trả về thông tin của một đoạn mô tả di sản dựa trên ID
func GetHeritageParagraphByID(c *gin.Context) {
	id := c.Param("id")

	var heritageParagraph models.Heritage_Paragraph

	if err := db.GetDB().Where("id = ?", id).First(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage paragraph not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritageParagraph)
}

// CreateHeritageParagraph tạo mới một đoạn mô tả di sản
func CreateHeritageParagraph(c *gin.Context) {
	var heritageParagraph models.Heritage_Paragraph

	if err := c.ShouldBindJSON(&heritageParagraph); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create heritage paragraph")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, heritageParagraph)
}

// UpdateHeritageParagraph cập nhật thông tin của một đoạn mô tả di sản dựa trên ID
func UpdateHeritageParagraph(c *gin.Context) {
	id := c.Param("id")

	var heritageParagraph models.Heritage_Paragraph

	if err := db.GetDB().Where("id = ?", id).First(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage paragraph not found")
		return
	}

	if err := c.ShouldBindJSON(&heritageParagraph); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update heritage paragraph")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, heritageParagraph)
}

// DeleteHeritageParagraph xóa một đoạn mô tả di sản dựa trên ID
func DeleteHeritageParagraph(c *gin.Context) {
	id := c.Param("id")

	var heritageParagraph models.Heritage_Paragraph

	if err := db.GetDB().Where("id = ?", id).First(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Heritage paragraph not found")
		return
	}

	if err := db.GetDB().Delete(&heritageParagraph).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete heritage paragraph")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Heritage paragraph deleted successfully"})
}
