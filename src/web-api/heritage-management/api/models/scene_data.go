package models

type SceneData struct {
	Scene         Scene         `json:"scene"`
	PanoramaImage PanoramaImage `json:"panorama_image"`
	Audio         Audio         `json:"audio"`
	HotspotMap    Hotspots_Map  `json:"hotspot_map"`
	Hotspots      []Hotspot     `json:"hotspots"`
}
