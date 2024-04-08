package models

import "time"

type UploadFile struct {
	ID             int       `json:"id" gorm:"column:id;"`
	Name           string    `json:"name" gorm:"column:name;"`
	File_Url       string    `json:"file_url" gorm:"column:file_url;"`
	Thumbnail_Url  string    `json:"thumbnail_url" gorm:"column:thumbnail_url;"`
	Upload_Day     time.Time `json:"upload_date" gorm:"column:upload_date;"`
	User_ID        int       `json:"user_id" gorm:"column:user_id;"`
	Heritage_ID    int       `json:"heritage_id" gorm:"column:heritage_id;"`
	Size           int       `json:"size" gorm:"column:size;"`
	User           User      `json:"user" gorm:"foreignKey:user_id"`
	Extension      string    `json:"extension" gorm:"extension"`
	Is_Current_Use int       `json:"is_current_use" gorm:"is_current_use"`
}

type UploadFile_DTO struct {
	ID             int    `json:"id" gorm:"column:id;"`
	Heritage_ID    int    `json:"heritage_id" gorm:"column:heritage_id;"`
	File_Url       string `json:"file_url" gorm:"column:file_url;"`
	Thumbnail_Url  string `json:"thumbnail_url" gorm:"column:thumbnail_url;"`
	Is_Current_Use int    `json:"is_current_use" gorm:"is_current_use"`
}

func (UploadFile_DTO) TableName() string {
	return "upload_files"
}
