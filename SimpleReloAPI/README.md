
# SimpleRelocAPI
To run the server : npx nodemon

## To connect to **Mongo DB**
**URI** : mongodb+srv://SimpleRelo:SimpleRelo@reser-i7pkq.mongodb.net/SimpleReloDB?retryWrites=true

**UID** : SimpleRepo

**PWD** : SimpleRepo



##  API Reference
>Locations   :   http://localhost:6006/locations

>Services    :   http://localhost:6006/services

>UserDetails :   http://localhost:6006/userDetails

Refer below for accessing the APIs (Common to locations, services and user details
##### GET
http://localhost:6006/locations/

##### DELETE
http://localhost:6006/locations/<IDS>


##### POST
http://localhost:6006/locations/
JSON Data Sample : 
	{ 
		"City": "Houston",
        "State": "Texas",
        "Country": "United States Of America"
	}
	
##### PUT
http://localhost:6006/locations/<ID>
JSON Data Sample : 
	{ 
		"City": "Houston",
        "State": "Texas",
        "Country": "United States Of America"
	}

