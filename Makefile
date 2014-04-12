debug:
	export NODE_OPTIONS="--debug"

start-admin:
	cd admin && make start

start-device:
	cd device && make start

mongod:
	mongod --replSet plusmore