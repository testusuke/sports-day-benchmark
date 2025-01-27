MD := $(subst $(BSLASH),$(FSLASH),$(shell dirname "$(realpath $(lastword $(MAKEFILE_LIST)))"))
export GOBIN := $(MD)/bin
export PATH := $(GOBIN):$(PATH)

RDB_HOST ?= mysql
RDB_PORT ?= 3306
RDB_USER ?= root
RDB_PASS ?= root
RDB_NAME ?= sportsday
BACKEND_DIR ?= "api"
DATABASE_HOST ?= "mysql://$(RDB_USER):$(RDB_PASS)@$(RDB_HOST):$(RDB_PORT)"

.PHONY: help
help: ## ヘルプを出力
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: gen-help-md
gen-help-md: ## ヘルプをMarkdown形式で出力
	@printf "| コマンド | 説明 |\n"
	@printf "|---------|-------------|\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "| make %-20s | %s |\n", $$1, $$2}'

go-install-tools: ## go toolsをインストール
	@echo Install go tools
	@mkdir -p $(GOBIN)
	@cat tools.go | grep _ | awk -F'"' '{print $$2}' | xargs -t -n 1 go install

MIGRATION_COMMENT ?= $(shell bash -c 'read -p "Comments: " pwd; echo $$pwd')
migrate-new: ## マイグレーションファイル作成
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql new $(MIGRATION_COMMENT)

migrate-status: ## マイグレーションステータス確認
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql status

migrate-up: ## マイグレーション実行
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql up

migrate-down: ## マイグレーションロールバック
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql down

migrate-drop: ## データベース削除
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql drop

migrate-seed: ## データベース初期データ投入
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) dbmate -d $(BACKEND_DIR)/db_schema/seed -s $(BACKEND_DIR)/db_schema/schema.sql up

## マイグレーションリセット
migrate-reset: migrate-drop migrate-up migrate-seed

.PHONY: backend/format
backend/format: ## コードのフォーマット
	@goimports -local sports-day -w ./$(BACKEND_DIR)

.PHONY: gen
gen: gen-dbmodel gen-api backend/format ## 生成系のコマンドを実行

.PHONY: gen-dbmodel
gen-dbmodel: clean-dbmodel ## DBモデルを生成
	@xo schema $(DATABASE_HOST)/$(RDB_NAME) --out $(BACKEND_DIR)/db_model -e *.created_at -e *.updated_at --src $(BACKEND_DIR)/db_model/templates/go

.PHONY: clean-dbmodel
clean-dbmodel: ## DBモデルを削除
	@rm -rf $(BACKEND_DIR)/db_model/*.xo.go

.PHONY: gen-api ## APIのコード生成
gen-api:
	gqlgen

.PHONY: backend/run
backend/run: ## APIサーバーを起動
	@go run -mod=mod ./$(BACKEND_DIR)/cmd/api
