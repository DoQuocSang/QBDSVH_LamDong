package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/models"
	"heritage-management/api/utils"
)

type UserController struct{}

// RegisterUser đăng ký tài khoản mới
func RegisterUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	// Kiểm tra xem tên đăng nhập đã tồn tại chưa
	var existingUser models.User
	if err := db.GetDB().Where("user_name = ?", user.User_Name).First(&existingUser).Error; err == nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Username already exists")
		return
	}

	if err := db.GetDB().Create(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not create user")
		return
	}

	// Ẩn mật khẩu trong phản hồi
	user.Password = ""
	utils.SuccessResponse(c, http.StatusCreated, user)
}

// ResetPassword đặt lại mật khẩu của người dùng
func ResetPassword(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	var newPassword models.ResetPasswordRequest
	if err := c.ShouldBindJSON(&newPassword); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	user.Password = newPassword.Password
	if err := db.GetDB().Save(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not reset password")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "Password reset successful"})
}

// GetUsers trả về danh sách tất cả người dùng (không bao gồm mật khẩu) với phân trang
func GetPagedUsers(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	var total int64
	var users []models.User

	// Đếm tổng số lượng người dùng
	if err := db.GetDB().Model(&models.User{}).Count(&total).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get users")
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
	if err := db.GetDB().Order(orderClause).Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	// Kiểm tra dữ liệu trả về rỗng
	if len(users) == 0 {
		utils.ErrorResponse(c, http.StatusNotFound, "No data available")
		return
	}

	// Tạo đối tượng phản hồi phân trang
	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       users,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}

// UpdateUser cập nhật thông tin của một người dùng dựa trên ID
func UpdateUser(c *gin.Context) {

	id := c.Param("id")

	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	if err := c.ShouldBindJSON(&user); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body")
		return
	}

	if err := db.GetDB().Save(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not update user")
		return
	}

	// Ẩn mật khẩu trong phản hồi
	user.Password = ""
	utils.SuccessResponse(c, http.StatusOK, user)
}

// DeleteUser xóa một người dùng dựa trên ID
func DeleteUser(c *gin.Context) {
	id := c.Param("id")

	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	if err := db.GetDB().Delete(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not delete user")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, gin.H{"message": "User deleted successfully"})
}

// GetUserByID trả về thông tin của một người dùng dựa trên ID
func GetUserByID(c *gin.Context) {
	id := c.Param("id")

	var user models.User

	if err := db.GetDB().Where("id = ?", id).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, user)
}

// GetUserByID trả về thông tin của một người dùng dựa trên tên đăng nhập
func GetUserByUserName(c *gin.Context) {
	name := c.Param("username")

	var user models.User

	if err := db.GetDB().Where("user_name = ?", name).First(&user).Error; err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "User not found")
		return
	}

	utils.SuccessResponse(c, http.StatusOK, user)
}

// SearchUser trả về thông tin tài khoản theo tên
func SearchUser(c *gin.Context) {
	hq := models.HeritageQuery{}
	if err := c.ShouldBindQuery(&hq); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid search parameters")
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	columnName := c.DefaultQuery("columnName", "id")
	sortOrder := c.DefaultQuery("sortOrder", "desc")

	query := db.GetDB().Model(&models.User{})

	if hq.Key != "" {
		query = query.Where("user_name LIKE ?", "%"+hq.Key+"%")
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

	var users []models.User
	if err := query.Order(orderClause).Offset(offset).Limit(limit).Find(&users).Error; err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Could not get data")
		return
	}

	pagination := utils.Pagination{
		Total:      total,
		Page:       page,
		Limit:      limit,
		TotalPages: totalPages,
		Data:       users,
	}

	utils.SuccessResponse(c, http.StatusOK, pagination)
}
