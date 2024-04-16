package main

import (
	"fmt"
	"log"

	"heritage-management/api/config"
	"heritage-management/api/db"
	"heritage-management/api/routers"

	// "gorm.io/driver/mysql"
	// "gorm.io/gorm"
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

	//Tạo chuỗi kết nối
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	// dsn := "user:my-secret-pwpass@tcp(127.0.0.1:3306)/hotspotsmap?charset=utf8mb4&parseTime=True&loc=Local"
	// db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	// if err != nil {
	// 	log.Fatalln(err)
	// }
	// fmt.Println(db)

	

}

//CRUD:Create, Read, Update, Delete
// POST /v1/items (create a new item)
// GET /v1/items (list item) /v1/items?page=1
// GET /v1/items/:id (get item detail by id)
// (PUT || PATH) /v1/items (update an item by id)
// DELETE /v1/items/:id (delete item by id)
