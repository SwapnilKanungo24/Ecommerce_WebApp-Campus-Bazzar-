const mongoose = require('mongoose');

async function connectDB(url) {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports = {
    connectDB
};