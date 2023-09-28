package pagination

import "gorm.io/gorm"

type paginate struct {
	Page  int
	Limit int
}

func NewPaginate(limit, page int) *paginate {
	return &paginate{Page: page, Limit: limit}
}

func (p *paginate) PaginatedResult(db *gorm.DB) *gorm.DB {
	offset := (p.Page - 1) * p.Limit
	return db.Offset(offset).Limit(p.Limit)
}
