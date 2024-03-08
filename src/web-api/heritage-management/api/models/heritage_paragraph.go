package models

// Heritage Paragraph struct
type Heritage_Paragraph struct {
	ID                int    `json:"id" gorm:"column:id;"`
	Title             string `json:"title" gorm:"column:title;"`
	Description       string `json:"description" gorm:"column:description;"`
	Image_Description string `json:"image_description" gorm:"column:image_description;"`
	ImageURL          string `json:"image_url" gorm:"column:image_url;"`
	Heritage_ID       int    `json:"heritage_id" gorm:"column:heritage_id;"`
}
