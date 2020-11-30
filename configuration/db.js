const { MongoClient } = require('mongodb');

const _uri = 
'mongodb+srv://Saepudin:XBvWWiPj812S056v@movieapp.bad9t.mongodb.net/movieapp?retryWrites=true&w=majority'


const dbCon = (coll, cb) => {
    MongoClient.connect(_uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( async (client) => {
        const db = client.db('sample_mflix').collection(coll);
        await cb(db);
        client.close();
    })

};

module.exports = dbCon;