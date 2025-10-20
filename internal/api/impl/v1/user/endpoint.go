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

// Code generated. DO NOT EDIT

package user

import (
	"errors"
	"fmt"
	"net/http"

	databaseModel "github.com/perses/perses/internal/api/database/model"

	"github.com/labstack/echo/v4"
	"github.com/perses/perses/internal/api/authorization"
	"github.com/perses/perses/internal/api/interface"
	"github.com/perses/perses/internal/api/interface/v1/user"
	"github.com/perses/perses/internal/api/route"
	"github.com/perses/perses/internal/api/toolbox"
	"github.com/perses/perses/internal/api/utils"
	v1 "github.com/perses/perses/pkg/model/api/v1"
)

type endpoint struct {
	toolbox       toolbox.Toolbox[*v1.User, *user.Query]
	authz         authorization.Authorization
	readonly      bool
	disableSignUp bool
	caseSensitive bool
}

func NewEndpoint(service user.Service, authz authorization.Authorization, disableSignUp bool, readonly bool, caseSensitive bool, dao databaseModel.DAO) route.Endpoint {
	return &endpoint{
		toolbox:       toolbox.New[*v1.User, *v1.PublicUser, *user.Query](service, authz, v1.KindUser, caseSensitive, dao),
		authz:         authz,
		readonly:      readonly,
		disableSignUp: disableSignUp,
		caseSensitive: caseSensitive,
	}
}

func (e *endpoint) CollectRoutes(g *route.Group) {
	// Define the prefix with owner parameter
	//ownerPrefix := fmt.Sprintf("/%s/:%s", utils.PathOwner, utils.ParamOwner)

	g.GET("/user", e.GetUser, false)
	group := g.Group(fmt.Sprintf("/%s", utils.PathUser))

	if !e.readonly {
		if !e.disableSignUp {
			group.POST("", e.Create, true)
		}
		group.PUT(fmt.Sprintf("/:%s", utils.ParamName), e.Update, false)
		group.DELETE(fmt.Sprintf("/:%s", utils.ParamName), e.Delete, false)
	}
	group.GET("", e.List, false)
	group.GET(fmt.Sprintf("/:%s", utils.ParamName), e.Get, false)
	group.GET(fmt.Sprintf("/:%s/permissions", utils.ParamName), e.GetPermissions, false)

	group.GET(fmt.Sprintf("/:%s/orgs", utils.ParamName), e.GetOrgs, false)
}

func (e *endpoint) Create(ctx echo.Context) error {
	entity := &v1.User{}
	return e.toolbox.Create(ctx, entity)
}

func (e *endpoint) Update(ctx echo.Context) error {
	entity := &v1.User{}
	return e.toolbox.Update(ctx, entity)
}

func (e *endpoint) Delete(ctx echo.Context) error {
	return e.toolbox.Delete(ctx)
}

func (e *endpoint) Get(ctx echo.Context) error {
	return e.toolbox.Get(ctx)
}

func (e *endpoint) List(ctx echo.Context) error {
	q := &user.Query{}
	return e.toolbox.List(ctx, q)
}

func (e *endpoint) GetPermissions(ctx echo.Context) error {
	parameters := toolbox.ExtractParameters(ctx, e.caseSensitive)
	if !e.authz.IsEnabled() {
		return apiinterface.HandleUnauthorizedError("authentication is required to retrieve user permissions")
	}
	username, err := e.authz.GetUsername(ctx)
	if err != nil {
		return apiinterface.HandleUnauthorizedError("failed to retrieve username from context")
	}
	if username != parameters.Name {
		return apiinterface.HandleForbiddenError("you can only retrieve your permissions")
	}
	permissions, err := e.authz.GetPermissions(ctx)
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, permissions)
}

func (e *endpoint) GetOrgs(ctx echo.Context) error {
	q := &user.Query{
		AllOrgs: true,
	}
	return e.toolbox.List(ctx, q)
}

func (e *endpoint) GetUser(ctx echo.Context) error {
	persesUser, ok := ctx.Get("perses-user").(*v1.User)
	if !ok {
		return apiinterface.HandleError(errors.New("user not found"))
	}
	return ctx.JSON(http.StatusOK, persesUser)
}
