package models

type Scene struct {
	ID       int      `json:"id" gorm:"column:id;"`
	Title    string   `json:"type" gorm:"column:type;"`
	ImageUrl string   `json:"image_url" gorm:"column:image_url;"`
	Pitch    float64  `json:"pitch" gorm:"column:pitch;"`
	Yaw      float64  `json:"yaw" gorm:"column:yaw;"`
	Hotspots []string `json:"hotspots" gorm:"-"`
}
