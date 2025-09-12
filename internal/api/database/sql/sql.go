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

package databasesql

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
	"strings"

	"github.com/huandu/go-sqlbuilder"
	databaseModel "github.com/perses/perses/internal/api/database/model"
	modelAPI "github.com/perses/perses/pkg/model/api"
	modelV1 "github.com/perses/perses/pkg/model/api/v1"
	"github.com/sirupsen/logrus"
)

const (
	tableDashboard          = "dashboard"
	tableDatasource         = "datasource"
	tableEphemeralDashboard = "ephemeraldashboard"
	tableFolder             = "folder"
	tableGlobalDatasource   = "globaldatasource"
	tableGlobalRole         = "globalrole"
	tableGlobalRoleBinding  = "globalrolebinding"
	tableGlobalSecret       = "globalsecret"
	tableGlobalVariable     = "globalvariable"
	tableProject            = "project"
	tableRole               = "role"
	tableRoleBinding        = "rolebinding"
	tableSecret             = "secret"
	tableUser               = "users"
	tableVariable           = "variable"

	tableTeam       = "team"
	tableTeamMember = "team_member"

	colID      = "id"
	colDoc     = "doc"
	colName    = "name"
	colProject = "project"
	colType    = "type"

	colProjectID = "project_id"
	colUserID    = "user_id"
	colFolderID  = "folder_id"
)

func getTableName(kind modelV1.Kind) string {
	switch kind {
	case modelV1.KindDashboard:
		return tableDashboard
	case modelV1.KindDatasource:
		return tableDatasource
	case modelV1.KindEphemeralDashboard:
		return tableEphemeralDashboard
	case modelV1.KindFolder:
		return tableFolder
	case modelV1.KindGlobalDatasource:
		return tableGlobalDatasource
	case modelV1.KindGlobalRole:
		return tableGlobalRole
	case modelV1.KindGlobalRoleBinding:
		return tableGlobalRoleBinding
	case modelV1.KindGlobalSecret:
		return tableGlobalSecret
	case modelV1.KindGlobalVariable:
		return tableGlobalVariable
	case modelV1.KindProject:
		return tableProject
	case modelV1.KindRole:
		return tableRole
	case modelV1.KindRoleBinding:
		return tableRoleBinding
	case modelV1.KindSecret:
		return tableSecret
	case modelV1.KindUser:
		return tableUser
	case modelV1.KindVariable:
		return tableVariable
	default:
		return ""
	}
}

func generateID(metadata modelAPI.Metadata) (string, error) {
	switch m := metadata.(type) {
	case *modelV1.ProjectMetadata:
		return fmt.Sprintf("%s|%s", m.Project, m.Name), nil
	case *modelV1.Metadata:
		return m.Name, nil
	}
	return "", fmt.Errorf("metadata %T not managed", metadata)
}

type DAO struct {
	databaseModel.DAO
	DB            *sql.DB
	SchemaName    string
	CaseSensitive bool
}

func (d *DAO) Init() error {
	_, err := d.DB.Exec("CREATE SCHEMA IF NOT EXISTS perses;")
	if err != nil {
		return err
	}
	tables := []string{
		//d.createResourceTable(tableGlobalDatasource),
		//d.createResourceTable(tableGlobalRole),
		//d.createResourceTable(tableGlobalRoleBinding),
		//d.createResourceTable(tableGlobalSecret),
		//d.createResourceTable(tableGlobalVariable),
		//d.createResourceTable(tableProject),
		//d.createResourceTable(tableUser),
		//
		//d.createProjectResourceTable(tableDashboard),
		//d.createProjectResourceTable(tableDatasource),
		//d.createProjectResourceTable(tableEphemeralDashboard),
		//d.createProjectResourceTable(tableFolder),
		//d.createProjectResourceTable(tableRole),
		//d.createProjectResourceTable(tableRoleBinding),
		//d.createProjectResourceTable(tableSecret),
		//d.createProjectResourceTable(tableVariable),

		d.createUserTable(),
		d.createProjectTable(),
		d.createFolderTable(),
		d.createDashboardTable(),
		d.createDatasourceTable(),
		d.createSecretTable(),
		d.createVariableTable(),
		d.createTeamTable(),
		d.createTeamMemberTable(),
	}

	for _, table := range tables {
		if err := d.createTable(table); err != nil {
			return err
		}
	}
	return nil
}

func (d *DAO) IsCaseSensitive() bool {
	return d.CaseSensitive
}

func (d *DAO) createResourceTable(tableName string) string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableName)).IfNotExists().
		Define(colID, "VARCHAR(128)", "NOT NULL", "PRIMARY KEY").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		String()
}

func (d *DAO) createProjectResourceTable(tableName string) string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableName)).IfNotExists().
		Define(colID, "VARCHAR(256)", "NOT NULL", "PRIMARY KEY").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colProject, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		String()
}

func (d *DAO) createUserTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableUser)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define(colName, "VARCHAR(128)", "NOT NULL", "UNIQUE").
		Define(colType, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		String()
}

func (d *DAO) createProjectTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableProject)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define("user_id", "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (user_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (user_id) REFERENCES %s.users(id) ON DELETE CASCADE",
			d.SchemaName,
		)).
		String()
}

func (d *DAO) createFolderTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableFolder)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define("project_id", "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (project_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (project_id) REFERENCES %s.project(id) ON DELETE CASCADE",
			d.SchemaName,
		)).
		String()
}

func (d *DAO) createDashboardTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableDashboard)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define("folder_id", "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (folder_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (folder_id) REFERENCES %s.folder(id) ON DELETE CASCADE",
			d.SchemaName,
		)).
		String()
}

func (d *DAO) createDatasourceTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableDatasource)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define(colProjectID, "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (project_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (project_id) REFERENCES %s.project(id) ON DELETE CASCADE",
			d.SchemaName,
		)).
		String()
}

func (d *DAO) createSecretTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableSecret)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define(colProjectID, "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (project_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (project_id) REFERENCES %s.project(id) ON DELETE CASCADE",
			d.SchemaName,
		)).String()
}

func (d *DAO) createVariableTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableVariable)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define(colProjectID, "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL").
		Define(colDoc, "JSON", "NOT NULL").
		Define("UNIQUE (project_id, name)").
		Define(fmt.Sprintf(
			"FOREIGN KEY (project_id) REFERENCES %s.project(id) ON DELETE CASCADE",
			d.SchemaName,
		)).String()
}

func (d *DAO) createTeamTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableTeam)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define("org_id", "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL", "UNIQUE").
		Define(fmt.Sprintf(
			"FOREIGN KEY (org_id) REFERENCES %s.users(id) ON DELETE CASCADE",
			d.SchemaName,
		)).String()
}

func (d *DAO) createTeamMemberTable() string {
	return sqlbuilder.CreateTable(d.generateCompleteTableName(tableTeamMember)).IfNotExists().
		Define(colID, "BIGSERIAL", "PRIMARY KEY").
		Define("user_id", "BIGINT", "NOT NULL").
		Define("org_id", "BIGINT", "NOT NULL").
		Define("team_id", "BIGINT", "NOT NULL").
		Define(colName, "VARCHAR(128)", "NOT NULL", "UNIQUE").
		Define(fmt.Sprintf(
			"FOREIGN KEY (team_id) REFERENCES %s.team(id) ON DELETE CASCADE",
			d.SchemaName,
		)).String()
}

func (d *DAO) createTable(query string) error {
	r, e := d.DB.Query(query)
	if e != nil {
		return e
	}
	return r.Close()
}

//// GetLatestUpdateTime queries the database to retrieve the latest update time for the specified table names.
//func (d *DAO) GetLatestUpdateTime(kinds []modelV1.Kind) (*string, error) {
//	sb := sqlbuilder.Select("UPDATE_TIME")
//	sb.From("information_schema.tables")
//	var whereConditions []string
//	for _, kind := range kinds {
//		tableName, err := getTableName(kind)
//		if err != nil {
//			return nil, err
//		}
//		whereConditions = append(whereConditions, sb.Equal("TABLE_NAME", tableName))
//	}
//	sb.Where(sb.Equal("TABLE_SCHEMA", d.SchemaName), sb.Or(whereConditions...))
//	sb.OrderBy("UPDATE_TIME").Desc()
//	query, args := sb.Build()
//
//	r, err := d.DB.Query(query, args...)
//	if err != nil {
//		return nil, err
//	}
//	defer r.Close() //nolint:errcheck
//
//	if r.Next() {
//		var timestamp *string
//		if scanErr := r.Scan(&timestamp); scanErr != nil {
//			return nil, scanErr
//		}
//		return timestamp, nil
//	}
//	return nil, fmt.Errorf("failed to retrieve last update time for tables: %v", kinds)
//}

//func (d *DAO) GetLatestUpdateTime(kinds []modelV1.Kind) (*string, error) {
//	var tableNames []string
//	for _, kind := range kinds {
//		tableName, err := getTableName(kind)
//		if err != nil {
//			return nil, err
//		}
//		tableNames = append(tableNames, tableName)
//	}
//
//	// In Postgres, we can use pg_stat_all_tables.last_vacuum or last_analyze as a rough "last touched" time
//	// Another option is relfrozenxid_age or checking modification tracking manually.
//	// Here we use pg_stat_all_tables for an approximation.
//	sb := sqlbuilder.NewSelectBuilder()
//	sb.Select("MAX(GREATEST(COALESCE(last_vacuum, 'epoch'::timestamp), COALESCE(last_autovacuum, 'epoch'::timestamp), COALESCE(last_analyze, 'epoch'::timestamp), COALESCE(last_autoanalyze, 'epoch'::timestamp))) AS last_update")
//	sb.From("pg_stat_all_tables")
//	sb.Where(
//		sb.And(
//			sb.Equal("schemaname", d.SchemaName),
//			sb.In("relname", tableNames),
//		),
//	)
//
//	query, args := sb.Build()
//	row := d.DB.QueryRow(query, args...)
//
//	var lastUpdate sql.NullTime
//	if err := row.Scan(&lastUpdate); err != nil {
//		return nil, err
//	}
//	if lastUpdate.Valid {
//		ts := lastUpdate.Time.Format("2006-01-02 15:04:05")
//		return &ts, nil
//	}
//	return nil, fmt.Errorf("failed to retrieve last update time for tables: %v", kinds)
//}

func (d *DAO) GetLatestUpdateTime(kinds []modelV1.Kind) (*string, error) {
	if len(kinds) == 0 {
		return nil, fmt.Errorf("no kinds provided")
	}

	// Generate table names
	tableNames := make([]string, 0, len(kinds))
	for _, kind := range kinds {
		tName := d.generateCompleteTableName(getTableName(kind))
		tableNames = append(tableNames, tName)
	}

	// Build SQL with expanded placeholders for IN clause
	inPlaceholders := make([]string, len(tableNames))
	args := make([]interface{}, 0, len(tableNames)+1)
	args = append(args, d.SchemaName) // $1 = schema
	for i, name := range tableNames {
		inPlaceholders[i] = fmt.Sprintf("$%d", i+2) // placeholders start at $2
		args = append(args, name)
	}

	query := fmt.Sprintf(
		`SELECT MAX(
			GREATEST(
				COALESCE(last_vacuum, 'epoch'::timestamp),
				COALESCE(last_autovacuum, 'epoch'::timestamp),
				COALESCE(last_analyze, 'epoch'::timestamp),
				COALESCE(last_autoanalyze, 'epoch'::timestamp)
			)
		) AS last_update
		FROM pg_stat_all_tables
		WHERE schemaname = $1 AND relname IN (%s)`,
		strings.Join(inPlaceholders, ","),
	)

	// Execute query
	var lastUpdate sql.NullTime
	row := d.DB.QueryRow(query, args...)
	if err := row.Scan(&lastUpdate); err != nil {
		return nil, err
	}

	if lastUpdate.Valid {
		ts := lastUpdate.Time.Format("2006-01-02 15:04:05")
		return &ts, nil
	}

	return nil, fmt.Errorf("failed to retrieve last update time for tables: %v", kinds)
}

func (d *DAO) Close() error {
	return d.DB.Close()
}

func (d *DAO) Create(entity modelAPI.Entity) error {
	// Flatten the metadata in case the config is activated.
	// We are modifying the metadata to be sure the user will acknowledge this config.
	// Also, it will avoid an issue with the permission when activated.
	// See https://github.com/perses/perses/issues/1721 for more details.
	entity.GetMetadata().Flatten(d.CaseSensitive)
	id, isExist, err := d.exists(modelV1.Kind(entity.GetKind()), entity.GetMetadata())
	if err != nil {
		return err
	}
	if isExist {
		return &databaseModel.Error{Key: strconv.FormatInt(id, 10), Code: databaseModel.ErrorCodeConflict}
	}

	sqlQuery, args, queryErr := d.generateInsertQuery(entity)
	if queryErr != nil {
		return queryErr
	}

	fmt.Printf("sqlQuery: %s\n", sqlQuery)

	createQuery, createErr := d.DB.Query(sqlQuery, args...)
	if createErr != nil {
		return createErr
	}
	return createQuery.Close()
}

func (d *DAO) Upsert(entity modelAPI.Entity) error {
	entity.GetMetadata().Flatten(d.CaseSensitive)
	_, isExist, err := d.exists(modelV1.Kind(entity.GetKind()), entity.GetMetadata())
	if err != nil {
		return err
	}
	var sqlQuery string
	var args []any
	var queryGeneratorErr error
	if !isExist {
		sqlQuery, args, queryGeneratorErr = d.generateInsertQuery(entity)
	} else {
		sqlQuery, args, queryGeneratorErr = d.generateUpdateQuery(entity)
	}
	if queryGeneratorErr != nil {
		return queryGeneratorErr
	}
	upsertQuery, upsertErr := d.DB.Query(sqlQuery, args...)
	if upsertErr != nil {
		return upsertErr
	}
	return upsertQuery.Close()
}

func (d *DAO) Get(kind modelV1.Kind, metadata modelAPI.Metadata, entity modelAPI.Entity) error {
	metadata.Flatten(d.CaseSensitive)
	id, query, queryErr := d.get(kind, metadata)
	if queryErr != nil {
		return queryErr
	}
	defer query.Close() //nolint:errcheck
	if query.Next() {
		var rowJSONDoc string
		if scanErr := query.Scan(&id, &rowJSONDoc); scanErr != nil {
			return scanErr
		}
		return json.Unmarshal([]byte(rowJSONDoc), entity)
	}
	return &databaseModel.Error{Key: strconv.FormatInt(id, 10), Code: databaseModel.ErrorCodeNotFound}
}

func (d *DAO) GetIDAndType(kind modelV1.Kind, metadata modelAPI.Metadata) (int64, string, error) {
	var id int64
	tableName := d.generateCompleteTableName(getTableName(kind))

	queryBuilder := sqlbuilder.PostgreSQL.NewSelectBuilder()
	queryBuilder.Select(colID, colType).
		From(tableName).
		Where(
			queryBuilder.Equal(colName, metadata.GetName()),
		)

	sqlQuery, args := queryBuilder.Build()
	fmt.Printf("sqlQuery: %s\n", sqlQuery)
	rows, err := d.DB.Query(sqlQuery, args...)
	if err != nil {
		return 0, "", err
	}

	defer rows.Close() //nolint:errcheck
	if rows.Next() {
		var userType string
		if scanErr := rows.Scan(&id, &userType); scanErr != nil {
			return 0, "", scanErr
		}
		return id, userType, nil
	}
	return 0, "", &databaseModel.Error{Key: strconv.FormatInt(id, 10), Code: databaseModel.ErrorCodeNotFound}
}

func (d *DAO) GetProjectID(metadata modelAPI.Metadata) (int64, error) {
	tableName := d.generateCompleteTableName(getTableName(modelV1.KindProject))

	queryBuilder := sqlbuilder.PostgreSQL.NewSelectBuilder()
	queryBuilder.Select(colID).
		From(tableName).
		Where(
			queryBuilder.Equal(colName, metadata.GetName()),
			queryBuilder.Equal(colUserID, metadata.GetUserID()),
		)

	sqlQuery, args := queryBuilder.Build()
	rows, err := d.DB.Query(sqlQuery, args...)
	if err != nil {
		return 0, err
	}

	defer rows.Close() //nolint:errcheck
	if rows.Next() {
		var id int64
		if scanErr := rows.Scan(&id); scanErr != nil {
			return 0, scanErr
		}
		return id, nil
	}
	return 0, &databaseModel.Error{Key: metadata.GetName(), Code: databaseModel.ErrorCodeNotFound}
}

func (d *DAO) GetFolderID(metadata modelAPI.Metadata) (int64, error) {
	tableName := d.generateCompleteTableName(getTableName(modelV1.KindFolder))

	queryBuilder := sqlbuilder.PostgreSQL.NewSelectBuilder()
	queryBuilder.Select(colID).
		From(tableName).
		Where(
			queryBuilder.Equal(colName, metadata.GetName()),
			queryBuilder.Equal(colProjectID, metadata.GetProjectID()),
		)

	sqlQuery, args := queryBuilder.Build()
	fmt.Println("-----------GetFolderID-----------")
	fmt.Printf("sqlQuery: %s\n", sqlQuery)
	fmt.Printf("args: %v\n", args)
	rows, err := d.DB.Query(sqlQuery, args...)
	if err != nil {
		return 0, err
	}

	defer rows.Close() //nolint:errcheck
	if rows.Next() {
		var id int64
		if scanErr := rows.Scan(&id); scanErr != nil {
			return 0, scanErr
		}
		return id, nil
	}
	return 0, &databaseModel.Error{Key: metadata.GetName(), Code: databaseModel.ErrorCodeNotFound}
}

func (d *DAO) RawQuery(query databaseModel.Query) ([]json.RawMessage, error) {
	q, args, buildQueryErr := d.buildQuery(query)
	if buildQueryErr != nil {
		return nil, fmt.Errorf("unable to build the query: %s", buildQueryErr)
	}
	rows, runQueryErr := d.DB.Query(q, args...)
	if runQueryErr != nil {
		return nil, runQueryErr
	}
	defer rows.Close() //nolint:errcheck

	result := []json.RawMessage{}

	for rows.Next() {
		var rowJSONDoc string
		if scanErr := rows.Scan(&rowJSONDoc); scanErr != nil {
			return nil, scanErr
		}
		result = append(result, []byte(rowJSONDoc))
	}
	return result, nil
}

func (d *DAO) RawMetadataQuery(_ databaseModel.Query, _ modelV1.Kind) ([]json.RawMessage, error) {
	return nil, fmt.Errorf("raw metadata query not implemented")
}

func (d *DAO) Query(query databaseModel.Query, slice any) error {
	typeParameter := reflect.TypeOf(slice)
	result := reflect.ValueOf(slice)
	// to avoid any miss usage when using this method, slice should be a pointer to a slice.
	// first check if slice is a pointer
	if typeParameter.Kind() != reflect.Ptr {
		return fmt.Errorf("slice in parameter is not a pointer to a slice but a %q", typeParameter.Kind())
	}

	// It's a pointer, so move to the actual element behind the pointer.
	// Having a pointer avoid getting the error:
	//           reflect.Value.Set using unaddressable value
	// It's because the slice is usually not initialized and doesn't have any memory allocated.
	// So it's simpler to require a pointer at the beginning.
	sliceElem := result.Elem()
	typeParameter = typeParameter.Elem()

	if typeParameter.Kind() != reflect.Slice {
		return fmt.Errorf("slice in parameter is not actually a slice but a %q", typeParameter.Kind())
	}
	q, args, buildQueryErr := d.buildQuery(query)
	if buildQueryErr != nil {
		return fmt.Errorf("unable to build the query: %s", buildQueryErr)
	}
	rows, runQueryErr := d.DB.Query(q, args...)
	if runQueryErr != nil {
		return runQueryErr
	}
	defer rows.Close() //nolint:errcheck
	for rows.Next() {
		var rowJSONDoc string
		if scanErr := rows.Scan(&rowJSONDoc); scanErr != nil {
			return scanErr
		}
		// first create a pointer with the accurate type
		var value reflect.Value
		if typeParameter.Elem().Kind() != reflect.Ptr {
			value = reflect.New(typeParameter.Elem())
		} else {
			// in case it's a pointer, then we should create a pointer of the struct and not a pointer of a pointer
			value = reflect.New(typeParameter.Elem().Elem())
		}
		// then get back the actual struct behind the value.
		obj := value.Interface()
		if unmarshalErr := json.Unmarshal([]byte(rowJSONDoc), obj); unmarshalErr != nil {
			return unmarshalErr
		}
		if typeParameter.Elem().Kind() != reflect.Ptr {
			// In case the type of the slice element is not a pointer,
			// we should return the value of the pointer created in the previous step.
			sliceElem.Set(reflect.Append(sliceElem, value.Elem()))
		} else {
			sliceElem.Set(reflect.Append(sliceElem, value))
		}
	}
	if sliceElem.Len() == 0 {
		// in case the result is empty, let's initialize the slice just to avoid returning a nil slice
		sliceElem = reflect.MakeSlice(typeParameter, 0, 0)
	}
	// at the end reset the element of the slice to ensure we didn't disconnect the link between the pointer to the slice and the actual slice
	result.Elem().Set(sliceElem)
	return nil
}

func (d *DAO) Delete(kind modelV1.Kind, metadata modelAPI.Metadata) error {
	id, isExist, err := d.exists(kind, metadata)
	if err != nil {
		return err
	}
	if !isExist {
		return &databaseModel.Error{Key: strconv.FormatInt(id, 10), Code: databaseModel.ErrorCodeNotFound}
	}

	//id, tableName, idErr := d.getIDAndTableName(kind, metadata)
	//if idErr != nil {
	//	return idErr
	//}

	//tableName, err := getTableName(kind)
	//if err != nil {
	//	return err
	//}
	tableName := d.generateCompleteTableName(getTableName(kind))

	deleteBuilder := sqlbuilder.NewDeleteBuilder().DeleteFrom(tableName)
	deleteBuilder.Where(deleteBuilder.Equal(colID, id))
	sqlQuery, args := deleteBuilder.Build()

	deleteQuery, err := d.DB.Query(sqlQuery, args...)
	if err != nil {
		return err
	}
	return deleteQuery.Close()
}

func (d *DAO) DeleteByQuery(query databaseModel.Query) error {
	q, args, buildQueryErr := d.buildDeleteQuery(query)
	if buildQueryErr != nil {
		return fmt.Errorf("unable to build the query: %s", buildQueryErr)
	}
	rows, runQueryErr := d.DB.Query(q, args...)
	if runQueryErr != nil {
		return runQueryErr
	}
	return rows.Close()
}

func (d *DAO) HealthCheck() bool {
	if err := d.DB.Ping(); err != nil {
		logrus.WithError(err).Error("unable to ping the database")
		return false
	}
	return true
}

func (d *DAO) getIDAndTableName(kind modelV1.Kind, metadata modelAPI.Metadata) (string, string, error) {
	//tableName, tableErr := getTableName(kind)
	//if tableErr != nil {
	//	return "", "", tableErr
	//}
	tableName := d.generateCompleteTableName(getTableName(kind))
	id, generateIDErr := generateID(metadata)
	if generateIDErr != nil {
		return "", "", generateIDErr
	}
	return id, tableName, nil
}

// generateCompleteTableName concat the tableName and the DBName. This should be used everytime a FROM condition is used.
func (d *DAO) generateCompleteTableName(tableName string) string {
	return fmt.Sprintf("%s.%s", d.SchemaName, tableName)
	//return fmt.Sprintf("%s", tableName)
}

func (d *DAO) exists(kind modelV1.Kind, metadata modelAPI.Metadata) (int64, bool, error) {
	id, query, queryErr := d.get(kind, metadata)
	if queryErr != nil {
		return 0, false, queryErr
	}
	defer query.Close() //nolint:errcheck
	return id, query.Next(), nil
}

func (d *DAO) get(kind modelV1.Kind, metadata modelAPI.Metadata) (int64, *sql.Rows, error) {
	tableName := d.generateCompleteTableName(getTableName(kind))

	queryBuilder := sqlbuilder.PostgreSQL.NewSelectBuilder().
		Select(colID, colDoc).
		From(tableName)

	if tableName == d.generateCompleteTableName(tableUser) {
		if metadata.GetName() != "" {
			queryBuilder.Where(queryBuilder.Equal(colName, metadata.GetName()))
		} else if metadata.GetUserID() != 0 {
			queryBuilder.Where(queryBuilder.Equal(colID, metadata.GetUserID()))
		}
	} else if tableName == d.generateCompleteTableName(tableProject) {
		if metadata.GetName() != "" && metadata.GetUserID() != 0 {
			queryBuilder.Where(
				queryBuilder.And(
					queryBuilder.Equal("user_id", metadata.GetUserID()),
					queryBuilder.Equal(colName, metadata.GetName()),
				),
			)
		} else {
			return 0, nil, fmt.Errorf("either (user_id and name) or id is required for table %s", tableName)
		}
	} else if tableName == d.generateCompleteTableName(tableFolder) || tableName == d.generateCompleteTableName(tableDatasource) || tableName == d.generateCompleteTableName(tableSecret) ||
		tableName == d.generateCompleteTableName(tableVariable) {
		if metadata.GetName() != "" {
			queryBuilder.Where(
				queryBuilder.And(
					queryBuilder.Equal(colProjectID, metadata.GetProjectID()),
					queryBuilder.Equal(colName, metadata.GetName()),
				),
			)
		} else {
			return 0, nil, fmt.Errorf("either (user_id and name) or id is required for table %s", tableName)
		}
	} else if tableName == d.generateCompleteTableName(tableDashboard) {
		if metadata.GetName() != "" {
			queryBuilder.Where(
				queryBuilder.And(
					queryBuilder.Equal("folder_id", metadata.GetFolderID()),
					queryBuilder.Equal(colName, metadata.GetName()),
				),
			)
		} else {
			return 0, nil, fmt.Errorf("either (user_id and name) or id is required for table %s", tableName)
		}
	}

	sqlQuery, args := queryBuilder.Build()
	fmt.Printf("sqlQuery: %+v\n", sqlQuery)
	fmt.Printf("args: %+v\n", args)
	rows, err := d.DB.Query(sqlQuery, args...)
	if err != nil {
		return 0, nil, err
	}

	var id int64
	if rows.Next() {
		var doc string
		if err := rows.Scan(&id, &doc); err != nil {
			return 0, nil, err
		}
		// rewind so caller can still use rows
		rows.Close()
		rows, err = d.DB.Query(sqlQuery, args...)
		if err != nil {
			return 0, nil, err
		}
	}

	return id, rows, nil
}
