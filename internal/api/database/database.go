// Copyright 2023 The Perses Authors
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package database

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net"
	"strings"
	"time"

	modelAPI "github.com/perses/perses/pkg/model/api"
	modelV1 "github.com/perses/perses/pkg/model/api/v1"
	"github.com/tidwall/gjson"

	"github.com/go-sql-driver/mysql"
	databaseFile "github.com/perses/perses/internal/api/database/file"
	databaseModel "github.com/perses/perses/internal/api/database/model"
	databaseSQL "github.com/perses/perses/internal/api/database/sql"
	"github.com/perses/perses/pkg/model/api/config"
	promConfig "github.com/prometheus/common/config"
	"github.com/sirupsen/logrus"
)

type dao struct {
	databaseModel.DAO
	client databaseModel.DAO
}

func (d *dao) Close() error {
	return d.client.Close()
}

func (d *dao) Init() error {
	return d.client.Init()
}
func (d *dao) IsCaseSensitive() bool {
	return d.client.IsCaseSensitive()
}
func (d *dao) Create(entity modelAPI.Entity) error {
	return d.client.Create(entity)
}
func (d *dao) Upsert(entity modelAPI.Entity) error {
	return d.client.Upsert(entity)
}
func (d *dao) Get(kind modelV1.Kind, metadata modelAPI.Metadata, entity modelAPI.Entity) error {
	return d.client.Get(kind, metadata, entity)
}
func (d *dao) Query(query databaseModel.Query, slice interface{}) error {
	return d.client.Query(query, slice)
}
func (d *dao) RawQuery(query databaseModel.Query) ([]json.RawMessage, error) {
	return d.client.RawQuery(query)
}
func (d *dao) RawMetadataQuery(query databaseModel.Query, kind modelV1.Kind) ([]json.RawMessage, error) {
	raws, err := d.client.RawQuery(query)
	if err != nil {
		return nil, err
	}
	// now let's extract the metadata and the kind
	result := make([]json.RawMessage, 0, len(raws))
	for _, raw := range raws {
		metadata := gjson.GetBytes(raw, "metadata").String()
		result = append(result, []byte(fmt.Sprintf(`{"kind":"%s","metadata":%s,"spec":{}}`, kind, metadata)))
	}
	return result, nil
}
func (d *dao) Delete(kind modelV1.Kind, metadata modelAPI.Metadata) error {
	return d.client.Delete(kind, metadata)
}
func (d *dao) DeleteByQuery(query databaseModel.Query) error {
	return d.client.DeleteByQuery(query)
}
func (d *dao) HealthCheck() bool {
	return d.client.HealthCheck()
}
func (d *dao) GetLatestUpdateTime(kind []modelV1.Kind) (*string, error) {
	return d.client.GetLatestUpdateTime(kind)
}

func New(conf config.Database) (databaseModel.DAO, error) {
	var client databaseModel.DAO
	if conf.File != nil {
		client = &databaseFile.DAO{
			Folder:        conf.File.Folder,
			Extension:     conf.File.Extension,
			CaseSensitive: conf.File.CaseSensitive,
		}
	} else if conf.SQL != nil {
		c := conf.SQL

		driver := c.Driver
		if driver == "" {
			driver = "mysql"
		}

		var dsn string
		var sqlDriver string
		switch driver {
		case "postgres", "pg", "psql":
			// Use Addr (secret.Hidden) as host[:port]
			addrStr := string(c.Addr)
			hostPart := ""
			if addrStr != "" {
				h, p, err := net.SplitHostPort(addrStr)
				if err == nil {
					hostPart = fmt.Sprintf("host=%s port=%s", h, p)
				} else {
					// If Addr doesn't include port, use it as host
					// NOTE: lib/pq will accept "host=..." without port.
					hostPart = fmt.Sprintf("host=%s", addrStr)
				}
			}

			// Determine sslmode. If TLSConfig provided, prefer require; otherwise disable.
			sslmode := "disable"
			if c.TLSConfig != nil {
				sslmode = "require"
			}

			// connect_timeout in seconds (use 0 if not set)
			timeoutSec := int(time.Duration(c.Timeout).Seconds())

			// Build DSN. We quote values using simple formatting; for more complex values consider url.QueryEscape.
			// lib/pq accepts space-separated key=value pairs.
			dsnParts := []string{}
			if hostPart != "" {
				dsnParts = append(dsnParts, hostPart)
			}
			if string(c.User) != "" {
				dsnParts = append(dsnParts, fmt.Sprintf("user=%s", string(c.User)))
			}
			if string(c.Password) != "" {
				dsnParts = append(dsnParts, fmt.Sprintf("password=%s", string(c.Password)))
			}
			if c.DBName != "" {
				dsnParts = append(dsnParts, fmt.Sprintf("dbname=%s", c.DBName))
			}
			dsnParts = append(dsnParts, fmt.Sprintf("sslmode=%s", sslmode))
			if timeoutSec > 0 {
				dsnParts = append(dsnParts, fmt.Sprintf("connect_timeout=%d", timeoutSec))
			}

			dsn = strings.Join(dsnParts, " ")
			sqlDriver = "postgres"

			// Note: If TLSConfig is provided and you need client cert files or custom CA,
			// you will have to write cert files and set sslrootcert/sslcert/sslkey paths
			// in the DSN or use lib/pq TLSConfig hooks.

		case "mysql":
			mysqlConfig := mysql.Config{
				User:                     string(c.User),
				Passwd:                   string(c.Password),
				Net:                      c.Net,
				Addr:                     string(c.Addr),
				DBName:                   c.DBName,
				Collation:                c.Collation,
				Loc:                      c.Loc,
				MaxAllowedPacket:         c.MaxAllowedPacket,
				ServerPubKey:             c.ServerPubKey,
				Timeout:                  time.Duration(c.Timeout),
				ReadTimeout:              time.Duration(c.ReadTimeout),
				WriteTimeout:             time.Duration(c.WriteTimeout),
				AllowAllFiles:            c.AllowAllFiles,
				AllowCleartextPasswords:  c.AllowCleartextPasswords,
				AllowFallbackToPlaintext: c.AllowFallbackToPlaintext,
				AllowNativePasswords:     c.AllowNativePasswords,
				AllowOldPasswords:        c.AllowOldPasswords,
				CheckConnLiveness:        c.CheckConnLiveness,
				ClientFoundRows:          c.ClientFoundRows,
				ColumnsWithAlias:         c.ColumnsWithAlias,
				InterpolateParams:        c.InterpolateParams,
				MultiStatements:          c.MultiStatements,
				ParseTime:                c.ParseTime,
				RejectReadOnly:           c.RejectReadOnly,
			}

			// (OPTIONAL) Configure TLS
			if c.TLSConfig != nil {
				tlsConfig, parseErr := promConfig.NewTLSConfig(c.TLSConfig)
				if parseErr != nil {
					logrus.WithError(parseErr).Error("Failed to parse TLS from configuration")
					return nil, parseErr
				}
				tlsConfigName := "perses-tls"
				if err := mysql.RegisterTLSConfig(tlsConfigName, tlsConfig); err != nil {
					logrus.WithError(err).Error("Failed to register TLS configuration for mysql connection")
					return nil, err
				}
				mysqlConfig.TLSConfig = tlsConfigName
			}

			dsn = mysqlConfig.FormatDSN()
			sqlDriver = "mysql"
		default:
			return nil, fmt.Errorf("unsupported SQL driver: %s", driver)
		}

		db, err := sql.Open(sqlDriver, dsn)
		if err != nil {
			return nil, err
		}

		db.SetConnMaxLifetime(time.Minute * 5)
		db.SetMaxOpenConns(25)
		db.SetMaxIdleConns(25)

		if err := db.Ping(); err != nil {
			return nil, err
		}

		client = &databaseSQL.DAO{
			DB:            db,
			SchemaName:    c.DBName,
			CaseSensitive: c.CaseSensitive,
		}
	} else {
		return nil, fmt.Errorf("no dao defined")
	}
	return &dao{client: client}, nil
}
