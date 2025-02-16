package gorm

import (
	"fmt"
	"time"

	"sports-day/api"
	"sports-day/api/pkg/env"
	"sports-day/api/pkg/errors"

	"github.com/go-sql-driver/mysql"
	gormmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

func Open(logger gormlogger.Writer) (*gorm.DB, error) {
	config := env.Get()
	mysqlConfig := mysql.Config{
		User:      config.RDB.User,
		Passwd:    config.RDB.Pass,
		Addr:      config.RDB.Address,
		DBName:    config.RDB.Name,
		Net:       "tcp",
		ParseTime: true,
		Loc:       time.Local,
	}
	// create dsn
	dsn := mysqlConfig.FormatDSN()

	// setup logger
	gormLogger := gormlogger.New(
		logger,
		gormlogger.Config{
			LogLevel:                  gormlogger.Info,
			IgnoreRecordNotFoundError: true,
			Colorful:                  true,
		},
	)

	// open db
	db, err := gorm.Open(
		gormmysql.Open(dsn),
		&gorm.Config{
			Logger: gormLogger,
		},
	)
	if err != nil {
		return nil, errors.Wrap(err)
	}

	return db, nil
}

func OpenWithRetry(logger gormlogger.Writer) (*gorm.DB, error) {
	for i := 0; i < 100; i++ {
		db, err := Open(logger)
		if err == nil {
			api.Logger.Info().
				Str("label", "database").
				Msg("Successfully connected to database")
			return db, nil
		}
		
		api.Logger.Warn().
			Err(err).
			Str("label", "database").
			Msg("failed to connect to database. retry...")
		// wait for 3 seconds
		time.Sleep(time.Second * 3)
	}
	return nil, errors.Wrap(fmt.Errorf("failed to connect to database"))
}
