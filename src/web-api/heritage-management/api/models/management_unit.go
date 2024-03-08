package models

type Management_Unit struct {
	ID               int    `json:"id" gorm:"column:id;"`
	Name             string `json:"name" gorm:"column:name;"`
	Description      string `json:"description" gorm:"column:description;"`
	UrlSlug          string `json:"urlslug" gorm:"column:urlslug;"`
	ImageUrl         string `json:"image_url" gorm:"column:image_url;"`
	Address          string `json:"address" gorm:"column:address;"`
	Note             string `json:"note" gorm:"column:note;"`
	ShortDescription string `json:"short_description" gorm:"column:short_description;"`
}

type Management_Unit_DTO struct {
	ID   int    `json:"id" gorm:"column:id;"`
	Name string `json:"name" gorm:"column:name;"`
}

func (Management_Unit_DTO) TableName() string {
	return "management_units"
}

type Management_Unit_FullInfo struct {
	ID               int    `json:"id" gorm:"column:id;"`
	Name             string `json:"name" gorm:"column:name;"`
	Description      string `json:"description" gorm:"column:description;"`
	UrlSlug          string `json:"urlslug" gorm:"column:urlslug;"`
	ImageUrl         string `json:"image_url" gorm:"column:image_url;"`
	Address          string `json:"address" gorm:"column:address;"`
	Note             string `json:"note" gorm:"column:note;"`
	ShortDescription string `json:"short_description" gorm:"column:short_description;"`
	HeritageCount    int    `json:"heritage_count" gorm:"heritage_count"`
}
