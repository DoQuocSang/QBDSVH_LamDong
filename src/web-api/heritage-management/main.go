package main

import (
	"fmt"
	"log"

	"heritage-management/api/config"
	"heritage-management/api/db"
	"heritage-management/api/routers"
)

func main() {
	// Kết nối cơ sở dữ liệu
	db.ConnectDB()

	// Tạo router và định nghĩa đường dẫn
	router := routers.SetupRouter()

	// Lắng nghe yêu cầu từ client
	appConfig := config.GetAppConfig()
	if err := router.Run(fmt.Sprintf(":%s", appConfig.Port)); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
