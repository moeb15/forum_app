package main

import (
	"forum_api/controller"
	"forum_api/database"
	"forum_api/middleware"
	"forum_api/models"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDatabase()
	serveApplication()
}

func serveApplication() {
	router := gin.Default()

	// Public Routes
	public_routes := router.Group("/auth")
	public_routes.POST("/register", controller.Register)
	public_routes.POST("/login", controller.Login)

	protected_routes := router.Group("/api")
	protected_routes.Use(middleware.JWTAuthMiddleware())

	// Protected Routes (Posts)
	protected_routes.POST("/posts", controller.AddPost)
	protected_routes.GET("/posts", controller.GetAllPosts)
	protected_routes.GET("/posts/:id", controller.GetPost)
	protected_routes.DELETE("/posts/:id", controller.DeletePost)

	//Protected Routes (Comments)
	protected_routes.POST("/posts/:id", controller.AddComment)

	log.Fatal(router.Run(":8000"))
}

func loadEnv() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Could not load environment variables")
	}
}

func loadDatabase() {
	database.Connect()
	database.Database.AutoMigrate(&models.User{})
	database.Database.AutoMigrate(&models.Post{})
	database.Database.AutoMigrate(&models.Comments{})
}
