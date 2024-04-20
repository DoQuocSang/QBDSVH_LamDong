package models

type Hotspots_Map struct {
	ID       int    `json:"id" gorm:"column:id;"`
	Top      string `json:"top" gorm:"column:top;"`
	Left     string `json:"left" gorm:"column:left;"`
	Scene_ID int    `json:"scene_id" gorm:"column:scene_id;"`
}

// `id` int NOT NULL AUTO_INCREMENT,
// `top` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
// `left` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
// `imgaes` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
// `scene` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,


