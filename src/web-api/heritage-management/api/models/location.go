package models

type Location struct {
	ID               int    `json:"id" gorm:"column:id;"`
	Name             string `json:"name" gorm:"column:name;"`
	UrlSlug          string `json:"urlslug" gorm:"column:urlslug;"`
	ImageUrl         string `json:"image_url" gorm:"column:image_url;"`
	Description      string `json:"description" gorm:"column:description;"`
	ShortDescription string `json:"short_description" gorm:"column:short_description;"`
}

type Location_DTO struct {
	ID   int    `json:"id" gorm:"column:id;"`
	Name string `json:"name" gorm:"column:name;"`
}

func (Location_DTO) TableName() string {
	return "locations"
}

type Location_Full_Info struct {
	ID               int    `json:"id" gorm:"column:id;"`
	Name             string `json:"name" gorm:"column:name;"`
	UrlSlug          string `json:"urlslug" gorm:"column:urlslug;"`
	ImageUrl         string `json:"image_url" gorm:"column:image_url;"`
	Description      string `json:"description" gorm:"column:description;"`
	ShortDescription string `json:"short_description" gorm:"column:short_description;"`
	HeritageCount    int    `json:"heritage_count" gorm:"heritage_count"`
}
