NODE_ENV?=development
NODE_OPTIONS?=''
APP_ENV=development
PORT?=3000
MONGO_URL?=mongodb://localhost:27017/plusmore
MONGO_OPLOG_URL?=mongodb://localhost:27017/local
CLUSTER_DISCOVERY_URL?=mongodb://localhost:27017/cluster
CLUSTER_SERVICE?=admin
TAG?=

start:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --settings ./config/$(APP_ENV)/settings.json

start-debug:
	NODE_OPTIONS='--debug' \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --settings ./config/$(APP_ENV)/settings.json

start-prod:
	NODE_OPTIONS=$(NODE_OPTIONS) \
	MONGO_URL=$(MONGO_URL) \
	MONGO_OPLOG_URL=$(MONGO_OPLOG_URL) \
	CLUSTER_DISCOVERY_URL=$(CLUSTER_DISCOVERY_URL) \
	CLUSTER_SERVICE=$(CLUSTER_SERVICE) \
	meteor -p $(PORT) --production --settings ./config/$(APP_ENV)/settings.json

ddp:
	ddp-analyzer-proxy

start-ddp:
	DDP_DEFAULT_CONNECTION_URL=http://localhost:3030 \
	meteor

tag:
	git tag -a $(TAG) -m 'tagging release'
	git push origin $(TAG)
