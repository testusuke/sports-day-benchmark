# .envがなければ終了
ifeq ($(shell test -f .env && echo "true"),)
$(error .envを作成してください)
endif

# 環境変数
RDB_ADDRESS ?= $(shell cat .env | grep RDB_ADDRESS | cut -d '=' -f 2)
RDB_USER ?= $(shell cat .env | grep RDB_USER | cut -d '=' -f 2)
RDB_PASS ?= $(shell cat .env | grep RDB_PASS | cut -d '=' -f 2)
RDB_NAME ?= $(shell cat .env | grep RDB_NAME | cut -d '=' -f 2)
DATABASE_HOST ?= "mysql://$(RDB_USER):$(RDB_PASS)@$(RDB_ADDRESS)"

# 定数
BACKEND_DIR := "./api"

.PHONY: help
help: ## ヘルプを出力
	@grep -E '^[/a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: gen-help-md
gen-help-md: ## ヘルプをMarkdown形式で出力
	@printf "| コマンド | 説明 |\n"
	@printf "|---------|-------------|\n"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "| make %-20s | %s |\n", $$1, $$2}'

migrate-new: ## マイグレーションファイル作成 (使用例: make migrate-new COMMENT="add users table")
	@if [ -z "$(COMMENT)" ]; then \
		echo "Error: COMMENT is required. Usage: make migrate-new COMMENT=\"your comment\""; \
		exit 1; \
	fi
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql new "$(COMMENT)"

migrate-status: ## マイグレーションステータス確認
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql status

migrate-up: ## マイグレーション実行
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql up

migrate-down: ## マイグレーションロールバック
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql down

migrate-drop: ## データベース削除
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/migrations -s $(BACKEND_DIR)/db_schema/schema.sql drop

migrate-seed: ## データベース初期データ投入
	@DATABASE_URL=$(DATABASE_HOST)/$(RDB_NAME) go tool dbmate -d $(BACKEND_DIR)/db_schema/seed -s $(BACKEND_DIR)/db_schema/schema.sql up

## マイグレーションリセット
migrate-reset: migrate-drop migrate-up migrate-seed

.PHONY: backend/format
backend/format: ## コードのフォーマット
	@echo "format imports"
	@go tool goimports -local sports-day -w ./$(BACKEND_DIR)

.PHONY: gen
gen: gen-dbmodel gen-api backend/format ## 生成系のコマンドを実行

.PHONY: gen-dbmodel
gen-dbmodel: clean-dbmodel ## DBモデルを生成
	@echo "generate db model"
	@go tool xo schema $(DATABASE_HOST)/$(RDB_NAME) --out $(BACKEND_DIR)/db_model -e *.created_at -e *.updated_at --src $(BACKEND_DIR)/db_model/templates/go

.PHONY: clean-dbmodel
clean-dbmodel: ## DBモデルを削除
	@echo "clean db model"
	@rm -rf $(BACKEND_DIR)/db_model/*.xo.go

.PHONY: gen-api ## APIのコード生成
gen-api:
	@echo "generate api"
	@go tool gqlgen

.PHONY: backend/run
backend/run: ## APIサーバーを起動
	@go run -mod=mod ./$(BACKEND_DIR)/cmd/api
