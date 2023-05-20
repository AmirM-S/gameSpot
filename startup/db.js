const mongoose = require('mongoose');
require('dotenv').config();



module.exports = function() {
 
    const localDB = process.env.LOCAL_MONGO_URL;
    const remoteDB = process.env.REMOTE_MONGO_URL;
    mongoose.connect(remoteDB).then(() => {
        console.log('connected to MongoDB: ' + remoteDB);
    }); 
}