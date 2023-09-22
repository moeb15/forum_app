package controller

import (
	"forum_api/helpers"
	"forum_api/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddComment(c *gin.Context) {
	var user_input models.Comments

	if err := c.ShouldBindJSON(&user_input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	post_id, err := strconv.ParseUint(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := helpers.CurrentUser(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user_input.UserID = user.ID
	user_input.PostID = uint(post_id)
	saved_cmt, err := user_input.Save()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"data": saved_cmt})
}
