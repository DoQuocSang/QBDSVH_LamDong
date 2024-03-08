package models

import "time"

type User struct {
	ID            int       `json:"id" gorm:"column:id;"`
	User_Name     string    `json:"user_name" gorm:"column:user_name;"`
	Subscribe_Day time.Time `json:"subscribe_day" gorm:"column:subscribe_day;"`
	Password      string    `json:"password" gorm:"column:password;"`
	Permission    int       `json:"permission" gorm:"column:permission;"`
}
