package models

type Hotspot struct {
	ID            int     `json:"id" gorm:"column:id;"`
	Name          string  `json:"name" gorm:"column:name;"`
	Type          string  `json:"type" gorm:"column:type;"`
	Category      int     `json:"category" gorm:"column:category;"`
	Pitch         float64 `json:"pitch" gorm:"column:pitch;"`
	Yaw           float64 `json:"yaw" gorm:"column:yaw;"`
	CSS_Class     string  `json:"css_class" gorm:"column:css_class;"`
	Scene_ID      int     `json:"scene_id" gorm:"column:scene_id;"`
	Move_Scene_ID int     `json:"move_scene_id" gorm:"column:move_scene_id;"`
	Heritage_ID   int     `json:"heritage_id" gorm:"column:heritage_id;"`
	Model_URL     string  `json:"model_url" gorm:"column:model_url;"`
}
