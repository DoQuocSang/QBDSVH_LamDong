package controllers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"heritage-management/api/db"
	"heritage-management/api/utils"
)

// Lấy id của item cuối cùng được thêm vào bảng
func GetLastInsertedHotspotID(c *gin.Context) {
	var lastInsertedID int

	// Sử dụng Last() để lấy dữ liệu cuối cùng từ bảng
	result := db.GetDB().Raw("SELECT id FROM hotspots ORDER BY id DESC LIMIT 1").Scan(&lastInsertedID)

	if result.Error != nil {
		log.Println(result.Error)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal Server Error"})
		return
	}

	// Trả về ID của item cuối cùng được thêm vào bảng
	utils.SuccessResponse(c, http.StatusOK, gin.H{"last_inserted_id": lastInsertedID})
}
