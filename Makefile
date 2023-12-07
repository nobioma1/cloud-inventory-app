# start services in docker compose
start:
	docker compose up

down:
	docker compose down

# run database migrations
db-migrate:
	@echo "Running migrations"
	@cd apps/api && npm run typeorm:run-migrations

# generate migration
db-generate-migration:
	@echo "Generating migrations"
	@cd apps/api && npm run typeorm:generate-migration

# revert migration
db-revert-migration:
	@echo "Reverting migrations"
	@cd apps/api && npm run typeorm:revert-migration

# initialize terraform
# - change dir to infra
#	- select ENV workspace and initialize terraform
tf-init: require-env
	@cd infra && \
		terraform workspace select $(ENV) && \
			terraform init

# helper function to require ENV to be either {development | production}
require-env:
ifeq ($(filter $(ENV),development production),)
	$(error ENV is not defined or invalid. Please set ENV=[development|production])
endif

# create terraform workspace for ENV
tf-create-workspace: require-env
	@echo "creating terraform $(ENV) workspace"
	@cd infra && \
		terraform workspace new $(ENV)

# > TF_COMMAND=plan ENV=development make tf
TF_COMMAND?=plan # plan | apply | destroy
# reuse to run terraform commands
tf: require-env
	@cd infra && \
		terraform workspace select $(ENV) && \
		terraform $(TF_COMMAND) \
		-var-file="./config.tfvars"




