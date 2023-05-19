const mongoose = require('mongoose');
require('dotenv').config();



module.exports = function() {
    const db = process.env.MONGO_URL
    mongoose.connect(db).then(() => {
        console.log('connected to MongoDB: ' + db)
    });   
}