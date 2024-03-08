package models

type ResetPasswordRequest struct {
	Password string `json:"password" binding:"required"`
}
