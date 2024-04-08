package models

type Hotspot struct {
	ID         int     `json:"id" gorm:"column:id;"`
	Type       string  `json:"type" gorm:"column:type;"`
	Name       string  `json:"name" gorm:"column:name;"`
	ImageUrl   string  `json:"image_url" gorm:"column:image_url;"`
	Pitch      float64 `json:"pitch" gorm:"column:pitch;"`
	Yaw        float64 `json:"yaw" gorm:"column:yaw;"`
	CssClass   string  `json:"css_class" gorm:"column:css_class;"`
	SceneID    int     `json:"scene_id" gorm:"column:scene_id;"`
	HeriTageID int     `json:"heritage_id" gorm:"column:heritage_id;"`
}
