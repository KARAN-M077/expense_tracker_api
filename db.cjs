const {MongoClient} =  require('mongodb')

let db
function connectMongodb(startServer) {
    MongoClient.connect('mongodb+srv://karanm17ab:karanm2004@trainingproject.77ipet4.mongodb.net/ExpenseTracker?retryWrites=true&w=majority').then(function(client) {
        db = client.db()
        return startServer()
    }).catch(function(error) {
        return startServer(error)
    })
}
 function getdb()
 {
    return db
 }

module.exports = {connectMongodb , getdb}