package models

// HeritageCategory struct
type Heritage_Category struct {
	ID          int    `json:"id" gorm:"column:id;"`
	Name        string `json:"name" gorm:"column:name;"`
	Description string `json:"description" gorm:"column:description;"`
	UrlSlug     string `json:"urlslug" gorm:"column:urlslug;"`
}

type Heritage_Category_DTO struct {
	ID   int    `json:"id" gorm:"column:id;"`
	Name string `json:"name" gorm:"column:name;"`
}

func (Heritage_Category_DTO) TableName() string {
	return "heritage_categories"
}
