module.exports = function(db,app){
    //Route to manage adding a product
  
    app.get('/api/prodcount',function(req,res){
      
      
        if (!req.body) {
         return res.sendStatus(400)
        }
        
        const collection = db.collection('users');
        collection.find({}).count((err,usercount)=>{
              res.send({'usercount':usercount});
            
        });
    });
       
    
    }