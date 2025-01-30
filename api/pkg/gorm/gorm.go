package gorm

import (
	"sports-day/api/pkg/env"
	"sports-day/api/pkg/errors"
	"time"

	"github.com/go-sql-driver/mysql"
	gormmysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormlogger "gorm.io/gorm/logger"
)

func Open(logger gormlogger.Writer) (*gorm.DB, error) {
	config := env.Get()
	mysqlConfig := mysql.Config{
		User:                 config.RDB.User,
		Passwd:               config.RDB.Pass,
		Addr:                 config.RDB.Address,
		DBName:               config.RDB.Name,
		Net:                  "tcp",
		ParseTime:            true,
		Loc:                  time.Local,
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
