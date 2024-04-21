package routers

import (
	"heritage-management/api/config"
	"heritage-management/api/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRouter thiết lập router cho web server
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Thêm CORS middleware
	r.Use(config.AddCorsHeaders())

	// Routes
	v1 := r.Group("/api/v1")
	{
		heritage := v1.Group("/heritage")
		{
			heritage.GET("", controllers.GetPagedHeritagesWithImages)
			heritage.GET("/combobox", controllers.GetAllHeritagesForCombobox)
			heritage.GET("/:id", controllers.GetHeritageByID)
			heritage.POST("", controllers.CreateHeritage)
			heritage.PUT("/model/:id", controllers.UpdateHeritageModel)
			heritage.PUT("/:id", controllers.UpdateHeritage)
			heritage.DELETE("/:id", controllers.DeleteHeritageWithParagraphsById)
			heritage.GET("/random", controllers.GetRandomHeritages)
			heritage.GET(":id/paragraphs", controllers.GetHeritageParagraphsByHeritageID)
			heritage.GET(":id/images", controllers.GetAllImagesByHeritageID)
			heritage.POST("/full-info", controllers.CreateHeritageAndParagraphs)
			heritage.PUT("/full-info/:id", controllers.UpdateHeritageAndParagraphs)
			heritage.GET("/full-info/slug/:urlSlug", controllers.GetHeritageWithParagraphsBySlug)
			heritage.GET("/full-info/id/:id", controllers.GetHeritageWithParagraphsById)
			heritage.GET("/related/:urlSlug", controllers.GetRelatedHeritagesWithImages)
			heritage.GET("/increase-view-count/:urlSlug", controllers.IncreaseViewCount)
			heritage.GET("/gallery", controllers.GetPagedHeritagesImagesForGallery)
			heritage.GET("/search", controllers.SearchHeritage)
			heritage.GET("/slug-by-id/:id", controllers.GetHeritageSlugByID)
		}
		heritage_paragraph := v1.Group("/heritage-paragraph")
		{
			heritage_paragraph.GET("", controllers.GetAllHeritageParagraphs)
			heritage_paragraph.GET("/:id", controllers.GetHeritageParagraphByID)
			heritage_paragraph.POST("", controllers.CreateHeritageParagraph)
			heritage_paragraph.PUT("/:id", controllers.UpdateHeritageParagraph)
			heritage_paragraph.DELETE("/:id", controllers.DeleteHeritageParagraph)
		}
		heritage_type := v1.Group("/heritage-type")
		{
			heritage_type.GET("", controllers.GetPagedHeritageTypes)
			heritage_type.GET("/:id", controllers.GetHeritageTypeByID)
			heritage_type.POST("", controllers.CreateHeritageType)
			heritage_type.PUT("/:id", controllers.UpdateHeritageType)
			heritage_type.DELETE("/:id", controllers.DeleteHeritageType)
			heritage_type.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByTypeSlug)
			heritage_type.GET("/slug/:urlSlug", controllers.GetHeritageTypeBySlug)
			heritage_type.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByTypeSlug)
			heritage_type.GET("/search", controllers.SearchType)
		}
		management_unit := v1.Group("/management-unit")
		{
			management_unit.GET("", controllers.GetPagedManagementUnits)
			management_unit.GET("/:id", controllers.GetManagementUnitByID)
			management_unit.POST("", controllers.CreateManagementUnit)
			management_unit.PUT("/:id", controllers.UpdateManagementUnit)
			management_unit.PUT("/image360/:id", controllers.UpdateManagementUnitImage360)
			management_unit.DELETE("/:id", controllers.DeleteManagementUnit)
			management_unit.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByUnitSlug)
			management_unit.GET("/slug/:urlSlug", controllers.GetManagementUnitBySlug)
			management_unit.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByUnitSlug)
			management_unit.GET("/search", controllers.SearchUnit)
			management_unit.GET("/full-info/:id", controllers.GetManagementUnitWithSceneDataByID)
			management_unit.POST("/full-info", controllers.CreateManagementUnitWithSceneData)
			management_unit.PUT("/full-info/:id", controllers.UpdateManagementUnitWithSceneData)
			management_unit.DELETE("/full-info/:id", controllers.DeleteManagementUnitWithScenesData)

		}
		location := v1.Group("/location")
		{
			location.GET("", controllers.GetPagedLocations)
			location.GET("/:id", controllers.GetLocationByID)
			location.POST("", controllers.CreateLocation)
			location.PUT("/:id", controllers.UpdateLocation)
			location.DELETE("/:id", controllers.DeleteLocation)
			location.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByLocationSlug)
			location.GET("/slug/:urlSlug", controllers.GetLocationBySlug)
			location.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByLocationSlug)
			location.GET("/search", controllers.SearchLocation)
		}
		user := v1.Group("/user")
		{
			user.GET("", controllers.GetPagedUsers)
			user.GET("/:id", controllers.GetUserByID)
			user.GET("/username/:username", controllers.GetUserByUserName)
			user.POST("", controllers.RegisterUser)
			user.PUT("/:id", controllers.UpdateUser)
			user.DELETE("/:id", controllers.DeleteUser)
			user.GET("/search", controllers.SearchUser)
		}
		heritage_category := v1.Group("/heritage-category")
		{
			heritage_category.GET("", controllers.GetPagedHeritageCategories)
			heritage_category.GET("/:id", controllers.GetHeritageCategoryByID)
			heritage_category.POST("", controllers.CreateHeritageCategory)
			heritage_category.PUT("/:id", controllers.UpdateHeritageCategory)
			heritage_category.DELETE("/:id", controllers.DeleteHeritageCategory)
			heritage_category.GET("/slug/:urlSlug/heritages", controllers.GetHeritageByCategorySlug)
			heritage_category.GET("/slug/:urlSlug", controllers.GetHeritageCategoryBySlug)
			heritage_category.GET("/slug/:urlSlug/heritages/paged", controllers.GetPagedHeritageByCategorySlug)
			heritage_category.GET("/search", controllers.SearchCategory)
		}
		upload_file := v1.Group("/upload-file")
		{
			upload_file.GET("", controllers.GetPagedUploadFile)
			upload_file.GET("/:id", controllers.GetUploadFileByID)
			upload_file.POST("", controllers.CreateUploadFile)
			upload_file.PUT("/:id", controllers.UpdateUploadFile)
			upload_file.DELETE("/:id", controllers.DeleteUploadFile)
			upload_file.GET("/group", controllers.GetAllUploadFileGroupedByUploadDate)
		}
		panorama_image := v1.Group("/panorama-image")
		{
			panorama_image.GET("", controllers.GetPagedPanoramaImage)
			panorama_image.GET("/:id", controllers.GetPanoramaImageByID)
			panorama_image.POST("", controllers.CreatePanoramaImage)
			panorama_image.PUT("/:id", controllers.UpdatePanoramaImage)
			panorama_image.DELETE("/:id", controllers.DeletePanoramaImage)
			panorama_image.GET("/last-inserted-id", controllers.GetLastInsertedSceneID)
			panorama_image.GET("/group", controllers.GetAllPanoramaImagesGroupedByUploadDate)
		}
		scene := v1.Group("/scene")
		{
			scene.GET("/:id", controllers.GetPagedSceneByManagementUnitID)
			scene.GET("/last-inserted-id", controllers.GetLastInsertedSceneID)
		}
		hotspot := v1.Group("/hotspot")
		{
			hotspot.GET("/last-inserted-id", controllers.GetLastInsertedHotspotID)
		}
		hotspots_map := v1.Group("/hotspots-map")
		{
			hotspots_map.GET("", controllers.GetAllHotspotMap)
			hotspots_map.GET("/by-management-unit/:id", controllers.GetAllHotspotMapByManagementUnitID)
			hotspots_map.GET("/:id", controllers.GetHotspotsMapByID)
			hotspots_map.POST("", controllers.CreateHotspotsMap)
			hotspots_map.PUT("/:id", controllers.UpdateHotspotsMap)
			hotspots_map.DELETE("/:id", controllers.DeleteHHotspotsMap)
		}
	}

	return r
}
