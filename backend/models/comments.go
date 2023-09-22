package models

import (
	"forum_api/database"

	"gorm.io/gorm"
)

type Comments struct {
	gorm.Model
	Content  string `gorm:"not null" json:"content"`
	Likes    int    `gorm:"default:0" json:"likes"`
	Dislikes int    `gorm:"default:0" json:"dislikes"`
	PostID   uint
	UserID   uint
}

func (cmt *Comments) Save() (*Comments, error) {
	err := database.Database.Create(&cmt).Error
	if err != nil {
		return &Comments{}, err
	}
	return cmt, nil
}
