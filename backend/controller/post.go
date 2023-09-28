package controller

import (
	"forum_api/helpers"
	"forum_api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SearchQuery struct {
	Title string `json:"title"`
}

func AddPost(c *gin.Context) {
	var user_post models.Post
	if err := c.ShouldBindJSON(&user_post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helpers.CurrentUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_post.UserID = user.ID
	saved_post, err := user_post.Save()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": saved_post})
}

func GetAllPosts(c *gin.Context) {
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))

	posts, err := models.AllPosts(limit, page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": posts})
}

func GetUsersPosts(c *gin.Context) {
	user, err := helpers.CurrentUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": user.Post})
}

func GetPost(c *gin.Context) {
	post_id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post, err := models.FindPostById(uint(post_id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusFound, gin.H{"data": post})
}

func DeletePost(c *gin.Context) {
	user, err := helpers.CurrentUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post_id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post, err := models.FindPostById(uint(post_id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.ID != post.UserID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized action"})
		return
	}

	for _, cmt := range post.Comments {
		err := cmt.Delete()

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
	}

	err = post.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNotFound, gin.H{"data": ""})
}

func UpdatePost(c *gin.Context) {
	user, err := helpers.CurrentUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updated_post models.Post
	if err := c.ShouldBindJSON(&updated_post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post_id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post, err := models.FindPostById(uint(post_id))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if post.UserID != user.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized action"})
		return
	}

	post.Content = updated_post.Content
	post.Title = updated_post.Title

	patched_post, err := post.Update()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": patched_post})
}

func SearchPosts(c *gin.Context) {
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "10"))
	search_query := SearchQuery{}

	if err := c.ShouldBindJSON(&search_query); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "test"})
		return
	}

	posts, err := models.FindPostByTitle(search_query.Title, limit, page)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusFound, gin.H{"data": posts})
}
