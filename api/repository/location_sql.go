package repository

import (
	"context"

	"gorm.io/gorm"

	"sports-day/api/db_model"
	"sports-day/api/pkg/errors"
)

type locationRepository struct{}

func NewLocation() Location {
	return &locationRepository{}
}

func (r *locationRepository) Save(ctx context.Context, db *gorm.DB, location *db_model.Location) (*db_model.Location, error) {
	if err := db.WithContext(ctx).Save(location).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return location, nil
}

func (r *locationRepository) Delete(ctx context.Context, db *gorm.DB, id string) (*db_model.Location, error) {
	var location db_model.Location
	if err := db.WithContext(ctx).First(&location, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.ErrLocationNotFound
		}
		return nil, errors.Wrap(err)
	}

	if err := db.WithContext(ctx).Delete(&location).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return &location, nil
}

func (r *locationRepository) Get(ctx context.Context, db *gorm.DB, id string) (*db_model.Location, error) {
	var location db_model.Location
	if err := db.WithContext(ctx).First(&location, "id = ?", id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.ErrLocationNotFound
		}
		return nil, errors.Wrap(err)
	}
	return &location, nil
}

func (r *locationRepository) BatchGet(ctx context.Context, db *gorm.DB, ids []string) ([]*db_model.Location, error) {
	var locations []*db_model.Location
	if err := db.WithContext(ctx).Where("id IN ?", ids).Find(&locations).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return locations, nil
}

func (r *locationRepository) List(ctx context.Context, db *gorm.DB) ([]*db_model.Location, error) {
	var locations []*db_model.Location
	if err := db.WithContext(ctx).Find(&locations).Error; err != nil {
		return nil, errors.Wrap(err)
	}
	return locations, nil
}
