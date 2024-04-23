package models

import "time"

type Audio struct {
	ID         int       `json:"id" gorm:"column:id;"`
	Name       string    `json:"name" gorm:"column:name;"`
	Audio_URL  string    `json:"audio_url" gorm:"column:audio_url;"`
	Size       int       `json:"size" gorm:"column:size;"`
	Extension  string    `json:"extension" gorm:"extension"`
	Upload_Day time.Time `json:"upload_date" gorm:"column:upload_date;"`
	User_ID    int       `json:"user_id" gorm:"column:user_id;"`
	Scene_ID   int       `json:"scene_id" gorm:"column:scene_id;"`
	// Dữ liệu thêm - lấy theo khóa ngoại user_id
	User User `json:"user" gorm:"foreignKey:user_id"`
}

type Audio_DTO struct {
	ID             int    `json:"id" gorm:"column:id;"`
	Audio_Url      string `json:"file_url" gorm:"column:file_url;"`
	Is_Current_Use int    `json:"is_current_use" gorm:"is_current_use"`
}

func (Audio_DTO) TableName() string {
	return "audios"
}
