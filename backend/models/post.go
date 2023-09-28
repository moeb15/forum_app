package models

import (
	"forum_api/database"
	"forum_api/pagination"

	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Title    string `gorm:"not null" json:"title"`
	Content  string `gorm:"not null" json:"content"`
	Likes    int    `gorm:"default:0" json:"likes"`
	Dislikes int    `gorm:"default:0" json:"dislikes"`
	Tags     string `json:"tags"`
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

func (post *Post) Update() (*Post, error) {
	err := database.Database.Updates(&post).Error
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

func FindPostByTitle(title string, limit, page int) ([]Post, error) {
	var posts []Post
	err := database.Database.Scopes(pagination.NewPaginate(limit, page).PaginatedResult).
		Where("Title LIKE ?", "%"+title+"%").Find(&posts).Error
	if err != nil {
		return []Post{}, err
	}
	return posts, nil
}

func AllPosts(limit, page int) ([]Post, error) {
	var posts []Post
	err := database.Database.Scopes(pagination.NewPaginate(limit, page).PaginatedResult).
		Find(&posts).Error
	if err != nil {
		return []Post{}, err
	}
	return posts, nil
}
