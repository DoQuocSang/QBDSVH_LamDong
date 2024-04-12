package models

type Scene struct {
	ID                 int     `json:"id" gorm:"column:id;"`
	Name               string  `json:"name" gorm:"column:name;"`
	Pitch              float64 `json:"pitch" gorm:"column:pitch;"`
	Yaw                float64 `json:"yaw" gorm:"column:yaw;"`
	Management_Unit_Id int     `json:"management_unit_id" gorm:"column:management_unit_id;"`
}
