package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// GetAudioByID trả về thông tin giới thiệu di sản văn hóa dựa trên ID
func GetAudioByID(c *gin.Context) {
	id := c.Param("id")

	var audio models.Audio

	if err := db.GetDB().Where("id = ?", id).First(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, audio)
}

// CreateAudio tạo mới một audio cho scene
func CreateAudio(c *gin.Context) {
	var audio models.Audio

	if err := c.ShouldBindJSON(&audio); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create file")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, gin.H{"id": audio.ID})
}

// UpdateAudio cập nhật audio giới thiệu của một di sản văn hóa dựa trên ID
func UpdateAudio(c *gin.Context) {
	id := c.Param("id")

	var audio models.Audio

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&audio); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Kiểm tra xem audio có URL không
	if audio.Audio_URL == "" {
		// Xóa item ra khỏi cơ sở dữ liệu
		if err := db.GetDB().Delete(&audio).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
			return
		}
		utils.SuccessResponse(c, http.StatusOK, "File deleted successfully")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, audio)
}

func DeleteAudio(c *gin.Context) {
	id := c.Param("id")

	var audio models.Audio

	// Lấy thông tin về audio giới thiệu di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Xóa audio khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&audio).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "File deleted successfully"})
}

// GetPagedAudio trả về danh sách tất cả các audio giới thiệu di sản văn hóa
func GetPagedAudios(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var audios []models.Audio

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.Audio{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	var totalSize int64
	if err := db.GetDB().Model(&models.Audio{}).Select("SUM(size)").Scan(&totalSize).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get total size")
		return
	}

	// Đếm tổng số trang
	// Chia % vì nếu chia có dư thì đồng nghĩa vẫn còn trang sau nên phải tăng thêm 1
	totalPages := int(total) / limit
	if int(total)%limit != 0 {
		totalPages++
	}

	// Phân trang
	offset := (page - 1) * limit
	orderClause := columnName + " " + sortOrder
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("User").Find(&audios).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(audios) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.FilePagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       audios,
		TotalSize:  totalSize,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}
