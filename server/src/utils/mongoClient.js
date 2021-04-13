var MongoClient = require('mongodb').MongoClient;

const client = getClientObject();

const getCollectionObject = (uri) => {
    return MongoClient.connect(uri).then((err, client) => {
        return client.db("AdminData").collection("collection0");
    });
}

const getSomeData = () => {
    globalClient.db("AdminData").collection("collection0")
}