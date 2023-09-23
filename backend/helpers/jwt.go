package helpers

import (
	"errors"
	"fmt"
	"forum_api/models"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
)

var private_key = []byte(os.Getenv("JWT_PRIVATE_KEY"))

func GenerateJWT(user models.User) (string, error) {
	token_ttl, _ := strconv.Atoi(os.Getenv("JWT_TTL"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"iat": time.Now().Unix(),
		"eat": time.Now().Add(time.Minute * time.Duration(token_ttl)).Unix(),
	})
	return token.SignedString(private_key)
}

func CurrentUser(c *gin.Context) (models.User, error) {
	err := ValidateJWT(c)
	if err != nil {
		return models.User{}, err
	}

	token, _ := getToken(c)
	claims, _ := token.Claims.(jwt.MapClaims)
	userId := uint(claims["id"].(float64))

	user, err := models.FindUserById(userId)
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}

func ValidateJWT(c *gin.Context) error {
	token, err := getToken(c)
	if err != nil {
		return err
	}
	_, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		return nil
	}

	return errors.New("invalid token provided")
}

func getToken(c *gin.Context) (*jwt.Token, error) {
	token_str := getTokenFromRequest(c)
	token, err := jwt.Parse(token_str, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return private_key, nil
	})

	return token, err
}

func getTokenFromRequest(c *gin.Context) string {
	bearer_token := c.Request.Header.Get("Authorization")
	split_token := strings.Split(bearer_token, " ")
	if len(split_token) == 2 {
		return split_token[1]
	}
	return ""
}
