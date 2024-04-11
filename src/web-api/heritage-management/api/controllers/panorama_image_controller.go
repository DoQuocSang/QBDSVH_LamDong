package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// GetPanoramaImageByID trả về thông tin của một di sản văn hóa dựa trên ID
func GetPanoramaImageByID(c *gin.Context) {
	id := c.Param("id")

	var panorama_image models.PanoramaImage

	if err := db.GetDB().Where("id = ?", id).First(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, panorama_image)
}

// CreatePanoramaImage tạo mới một di sản văn hóa
func CreatePanoramaImage(c *gin.Context) {
	var panorama_image models.PanoramaImage

	if err := c.ShouldBindJSON(&panorama_image); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create file")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, gin.H{"id": panorama_image.ID})
}

// UpdatePanoramaImage cập nhật thông tin của một di sản văn hóa dựa trên ID
func UpdatePanoramaImage(c *gin.Context) {
	id := c.Param("id")

	var panorama_image models.PanoramaImage

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&panorama_image); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Kiểm tra nếu cả file_url và thumbnail_url đều rỗng hoặc null
	if panorama_image.File_Url == "" && panorama_image.Thumbnail_Url == "" {
		// Xóa item ra khỏi cơ sở dữ liệu
		if err := db.GetDB().Delete(&panorama_image).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
			return
		}
		utils.SuccessResponse(c, http.StatusOK, "File deleted successfully")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, panorama_image)
}

func DeletePanoramaImage(c *gin.Context) {
	id := c.Param("id")

	var panorama_image models.PanoramaImage

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Xóa di sản văn hóa khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&panorama_image).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "File deleted successfully"})
}

// GetPagedPanoramaImage trả về danh sách tất cả các di sản văn hóa với phân trang
func GetPagedPanoramaImage(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var panorama_images []models.PanoramaImage

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.PanoramaImage{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	var totalSize int64
	if err := db.GetDB().Model(&models.PanoramaImage{}).Select("SUM(size)").Scan(&totalSize).Error; err != nil {
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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("User").Find(&panorama_images).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(panorama_images) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.FilePagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       panorama_images,
		TotalSize:  totalSize,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}
