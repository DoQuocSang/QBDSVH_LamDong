package models

import "time"

type PanoramaImage struct {
	ID             int       `json:"id" gorm:"column:id;"`
	Name           string    `json:"name" gorm:"column:name;"`
	File_Url       string    `json:"file_url" gorm:"column:file_url;"`
	Thumbnail_Url  string    `json:"thumbnail_url" gorm:"column:thumbnail_url;"`
	Upload_Date    time.Time `json:"upload_date" gorm:"column:upload_date;"`
	User_ID        int       `json:"user_id" gorm:"column:user_id;"`
	Scene_ID       int       `json:"scene_id" gorm:"column:scene_id;"`
	Size           int       `json:"size" gorm:"column:size;"`
	Extension      string    `json:"extension" gorm:"extension"`
	Is_Current_Use int       `json:"is_current_use" gorm:"is_current_use"`
	User           User      `json:"user" gorm:"foreignKey:user_id"`
}

type PanoramaImage_DTO struct {
	ID             int    `json:"id" gorm:"column:id;"`
	File_Url       string `json:"file_url" gorm:"column:file_url;"`
	Scene_ID       int    `json:"scene_id" gorm:"column:scene_id;"`
	Thumbnail_Url  string `json:"thumbnail_url" gorm:"column:thumbnail_url;"`
	Is_Current_Use int    `json:"is_current_use" gorm:"is_current_use"`
}

func (PanoramaImage_DTO) TableName() string {
	return "panorama_images"
}
