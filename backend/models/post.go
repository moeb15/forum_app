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
	Tags     string `json:"tags"`
	Comments []Comments
	Username string
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
		Where("Title LIKE ?", "%"+title+"%").Order("ID desc").Find(&posts).Error
	if err != nil {
		return []Post{}, err
	}
	return posts, nil
}

func FindPostByTags(tags string, limit, page int) ([]Post, error) {
	var posts []Post
	err := database.Database.Scopes(pagination.NewPaginate(limit, page).PaginatedResult).
		Where("Tags LIKE ?", "%"+tags+"%").Order("ID desc").Find(&posts).Error
	if err != nil {
		return []Post{}, err
	}
	return posts, nil
}

func AllPosts(limit, page int) ([]Post, error) {
	var posts []Post
	err := database.Database.Scopes(pagination.NewPaginate(limit, page).PaginatedResult).
		Preload("Comments").Order("ID desc").Find(&posts).Error
	if err != nil {
		return []Post{}, err
	}
	return posts, nil
}
