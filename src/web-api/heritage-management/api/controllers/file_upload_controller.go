package controllers

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

// GetUploadFileByID trả về thông tin của một di sản văn hóa dựa trên ID
func GetUploadFileByID(c *gin.Context) {
	id := c.Param("id")

	var upload_file models.UploadFile

	if err := db.GetDB().Where("id = ?", id).First(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, upload_file)
}

// CreateUploadFile tạo mới một di sản văn hóa
func CreateUploadFile(c *gin.Context) {
	var upload_file models.UploadFile

	if err := c.ShouldBindJSON(&upload_file); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Create(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create file")
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, gin.H{"id": upload_file.ID})
}

// UpdateUploadFile cập nhật thông tin của một di sản văn hóa dựa trên ID
func UpdateUploadFile(c *gin.Context) {
	id := c.Param("id")

	var upload_file models.UploadFile

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Parse thông tin cập nhật từ request body
	if err := c.ShouldBindJSON(&upload_file); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Kiểm tra nếu cả file_url và thumbnail_url đều rỗng hoặc null
	if upload_file.File_Url == "" && upload_file.Thumbnail_Url == "" {
		// Xóa item ra khỏi cơ sở dữ liệu
		if err := db.GetDB().Delete(&upload_file).Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
			return
		}
		utils.SuccessResponse(c, http.StatusOK, "File deleted successfully")
		return
	}

	// Lưu thông tin cập nhật vào cơ sở dữ liệu
	if err := db.GetDB().Save(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, upload_file)
}

func DeleteUploadFile(c *gin.Context) {
	id := c.Param("id")

	var upload_file models.UploadFile

	// Lấy thông tin về di sản văn hóa dựa trên ID từ cơ sở dữ liệu
	if err := db.GetDB().Where("id = ?", id).First(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "File not found")
		return
	}

	// Xóa di sản văn hóa khỏi cơ sở dữ liệu
	if err := db.GetDB().Delete(&upload_file).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete file")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "File deleted successfully"})
}

// GetPagedUploadFile trả về danh sách tất cả các di sản văn hóa với phân trang
func GetPagedUploadFile(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var upload_files []models.UploadFile

	// Đếm tổng số lượng
	if err := db.GetDB().Model(&models.UploadFile{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	var totalSize int64
	if err := db.GetDB().Model(&models.UploadFile{}).Select("SUM(size)").Scan(&totalSize).Error; err != nil {
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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Preload("User").Find(&upload_files).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(upload_files) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.FilePagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       upload_files,
		TotalSize:  totalSize,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

func GetAllUploadFileGroupedByUploadDate(c *gin.Context) {
	type GroupedFiles struct {
		UploadDate time.Time           `json:"upload_date"`
		Files      []models.UploadFile `json:"files"`
	}

	type ResultData struct {
		Data      []GroupedFiles `json:"data"`
		TotalSize int            `json:"total_size"`
	}

	var uploadDates []time.Time
	// Lấy danh sách các ngày tải lên khác nhau
	if err := db.GetDB().
		Model(&models.UploadFile{}).
		Select("DISTINCT DATE(upload_date) AS upload_date").
		Order("upload_date DESC").
		Pluck("upload_date", &uploadDates).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not retrieve upload dates")
		return
	}

	var groupedFiles []GroupedFiles
	var totalSize int = 0

	// Truy vấn file cho từng ngày tải lên
	for _, date := range uploadDates {
		var files []models.UploadFile
		// Truy vấn file cho ngày tải lên cụ thể
		if err := db.GetDB().
			Where("DATE(upload_date) = DATE(?)", date).
			Preload("User").
			Order("id DESC").
			Find(&files).
			Error; err != nil {
			utils.ErrorResponse(c, http.StatusInternalServerError, "Could not retrieve upload file for date")
			return
		}

		// Tính tổng kích thước cho nhóm hình ảnh hiện tại
		var currentGroupSize int = 0
		for _, file := range files {
			currentGroupSize += file.Size
		}

		// Tạo cấu trúc nhóm cho ngày này và thêm vào danh sách
		groupedFiles = append(groupedFiles, GroupedFiles{
			UploadDate: date,
			Files:      files,
		})

		// Cộng dồn tổng kích thước của các ảnh vào totalSize
		totalSize += currentGroupSize
	}

	// Tạo kết quả dữ liệu
	resultData := ResultData{
		Data:      groupedFiles,
		TotalSize: totalSize,
	}

	// Trả về dữ liệu đã nhóm theo ngày tải lên cùng với totalSize
	utils.SuccessResponse(c, http.StatusOK, resultData)
}
