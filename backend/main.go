package main

import (
	"forum_api/controller"
	"forum_api/database"
	"forum_api/middleware"
	"forum_api/models"
	"log"
	"time"

	"github.com/gin-contrib/cors"
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
	router.Use(cors.New(cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		AllowCredentials: false,
		AllowAllOrigins:  true,
		MaxAge:           12 * time.Hour,
	}))

	// Public Routes
	public_routes := router.Group("/auth")
	public_routes.POST("/register", controller.Register)
	public_routes.POST("/login", controller.Login)

	protected_routes := router.Group("/api")
	protected_routes.Use(middleware.JWTAuthMiddleware())

	// Protected Routes (Posts)
	protected_routes.POST("/posts", controller.AddPost)
	protected_routes.POST("/posts/search", controller.SearchPosts)
	protected_routes.GET("/posts", controller.GetUsersPosts)
	protected_routes.GET("/posts/:id", controller.GetPost)
	protected_routes.GET("/posts/all", controller.GetAllPosts)
	protected_routes.DELETE("/posts/:id", controller.DeletePost)
	protected_routes.PATCH("/posts/:id", controller.UpdatePost)

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
