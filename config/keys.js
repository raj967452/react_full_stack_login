/*if( process.env.NODE_ENV === 'production'){
    module.exports = require(__dirname+'/keys_prod');
} else{
    module.exports = require(__dirname+'/keys_dev');
}*/

module.exports = {
    mongoURI: "mongodb+srv://devKhem:0n37Iy0NLuPDR0bD@dev-cluster-5v9yj.mongodb.net/amtica",
    mongoConfig: {
        useNewUrlParser: true,
        ssl: true,
        retryWrites: true
    },
    secretOrKey: "secret"
};