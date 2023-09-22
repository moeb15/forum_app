package models

import (
	"forum_api/database"

	"gorm.io/gorm"
)

type Tag []string

type Post struct {
	gorm.Model
	Content  string `gorm:"not null" json:"content"`
	Likes    int    `gorm:"default:0" json:"likes"`
	Dislikes int    `gorm:"default:0" json:"dislikes"`
	Tags     Tag    `gorm:"type:text" json:"tags"`
	Comments []Comments
	UserID   uint
}

func (post *Post) Save() (*Post, error) {
	err := database.Database.Create(&post).Error
	if err != nil {
		return &Post{}, err
	}
	return post, nil
}

func (post *Post) Delete() error {
	err := database.Database.Unscoped().Delete(&post).Error
	if err != nil {
		return err
	}
	return nil
}

func FindPostById(pid uint) (Post, error) {
	var post Post
	err := database.Database.Preload("Comments").Where("ID=?", pid).Find(&post).Error
	if err != nil {
		return Post{}, err
	}
	return post, nil
}
