module.exports = function(db,app){

    app.get('/api/getlist',function(req,res){

        const collection = db.collection('users');
        collection.find({}).toArray((err,data)=>{
            res.send(data);
        })
    })
}