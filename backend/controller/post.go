package controller

import (
	"forum_api/helpers"
	"forum_api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

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

	if post.UserID != user.ID {
		c.JSON(http.StatusForbidden, gin.H{"error": "Unauthorized Action"})
		return
	}

	err = post.Delete()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusNotFound, gin.H{"data": ""})
}
