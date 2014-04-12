#Plus More

## Set Up

### Setting up MongoDb

Open two terminal windows. 
In the first window run:

    make mongod

In the second window run:

	mongo
	> var config = {_id: "meteor", members: [{_id: 0, host: "127.0.0.1:27017"}]}
	> rs.initiate(config)

### Running

Each app is in it's own subdirectory. ```cd``` into the app you want to run, and run ```make start```