package config

import "github.com/gin-gonic/gin"

type AppConfig struct {
	Server struct {
		Address string
	}
	Database struct {
		Host     string
		Port     string
		Name     string
		User     string
		Password string
	}
	Port string
}

func GetAppConfig() *AppConfig {
	return &AppConfig{
		Server: struct {
			Address string
		}{
			Address: ":8080",
		},
		Database: struct {
			Host     string
			Port     string
			Name     string
			User     string
			Password string
		}{
			Host:     "localhost",
			Port:     "3306",
			Name:     "QLDSVH",
			User:     "root",
			Password: "my-secret-pw",
		},
		Port: "8080",
	}
}

// ======================== Config Server ================================================================================================
func AddCorsHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST, HEAD, PATCH, OPTIONS, GET, PUT, POST, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
