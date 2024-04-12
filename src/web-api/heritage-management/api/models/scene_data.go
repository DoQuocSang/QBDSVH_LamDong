package models

type SceneData struct {
	Scene         Scene         `json:"scene"`
	PanoramaImage PanoramaImage `json:"panorama_image"`
	Hotspots      []Hotspot     `json:"hotspots"`
}
