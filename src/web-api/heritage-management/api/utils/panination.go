package utils

type Pagination struct {
	Total      int64       `json:"total"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
	Data       interface{} `json:"data"`
}
