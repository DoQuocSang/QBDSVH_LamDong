package models

// Heritage struct
type Heritage struct {
	ID                   int                   `json:"id" gorm:"column:id;"`
	Name                 string                `json:"name" gorm:"column:name;"`
	Short_Description    string                `json:"short_description" gorm:"column:short_description;"`
	Times                string                `json:"time" gorm:"column:time;"`
	Image_360_URL        string                `json:"image_360_url" gorm:"column:image_360_url;"`
	UrlSlug              string                `json:"urlslug" gorm:"column:urlslug;"`
	VideoURL             string                `json:"video_url" gorm:"column:video_url;"`
	Location_ID          int                   `json:"location_id" gorm:"column:location_id;"`
	Management_Unit_ID   int                   `json:"management_unit_id" gorm:"column:management_unit_id;"`
	Heritage_Type_ID     int                   `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
	Heritage_Category_ID int                   `json:"heritage_category_id" gorm:"column:heritage_category_id;"`
	View_Count           int                   `json:"view_count" gorm:"column:view_count;"`
	HeritageCategory     Heritage_Category_DTO `json:"heritage_category" gorm:"foreignKey:heritage_category_id"`
	HeritageType         Heritage_Type_DTO     `json:"heritage_type" gorm:"foreignKey:heritage_type_id"`
	Location             Location_DTO          `json:"location" gorm:"foreignKey:location_id"`
	ManagementUnit       Management_Unit_DTO   `json:"management_unit" gorm:"foreignKey:management_unit_id"`
	Images               []string              `json:"images" gorm:"-"`
}

// Heritage struct
type Heritage_DTO struct {
	ID                   int      `json:"id" gorm:"column:id;"`
	Name                 string   `json:"name" gorm:"column:name;"`
	Short_Description    string   `json:"short_description" gorm:"column:short_description;"`
	Times                string   `json:"time" gorm:"column:time;"`
	Image_360_URL        string   `json:"image_360_url" gorm:"column:image_360_url;"`
	UrlSlug              string   `json:"urlslug" gorm:"column:urlslug;"`
	VideoURL             string   `json:"video_url" gorm:"column:video_url;"`
	Location_ID          int      `json:"location_id" gorm:"column:location_id;"`
	Management_Unit_ID   int      `json:"management_unit_id" gorm:"column:management_unit_id;"`
	Heritage_Type_ID     int      `json:"heritage_type_id" gorm:"column:heritage_type_id;"`
	Heritage_Category_ID int      `json:"heritage_category_id" gorm:"column:heritage_category_id;"`
	View_Count           int      `json:"view_count" gorm:"column:view_count;"`
	Images               []string `json:"images" gorm:"-"`
}

func (Heritage_DTO) TableName() string {
	return "heritages"
}

// Heritage struct
type Heritage_Gallery struct {
	ID                int      `json:"id" gorm:"column:id;"`
	Name              string   `json:"name" gorm:"column:name;"`
	Short_Description string   `json:"short_description" gorm:"column:short_description;"`
	Image_360_URL     string   `json:"image_360_url" gorm:"column:image_360_url;"`
	VideoURL          string   `json:"video_url" gorm:"column:video_url;"`
	UrlSlug           string   `json:"urlslug" gorm:"column:urlslug;"`
	Images            []string `json:"images" gorm:"-"`
	ImageDescriptions []string `json:"image_descriptions" gorm:"-"`
}

func (Heritage_Gallery) TableName() string {
	return "heritages"
}
