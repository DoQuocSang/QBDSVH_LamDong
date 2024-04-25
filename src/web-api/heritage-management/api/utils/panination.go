package utils

type Pagination struct {
	Total      int64       `json:"total"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
	Data       interface{} `json:"data"`
}

type FilePagination struct {
	Total      int64       `json:"total"`
	Page       int         `json:"page"`
	Limit      int         `json:"limit"`
	TotalPages int         `json:"total_pages"`
	Data       interface{} `json:"data"`
	TotalSize  int64       `json:"total_size"`
}
