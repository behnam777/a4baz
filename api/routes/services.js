const router = global.express.Router();
//*************************************************************************************************/
router.post('/api/addServiceCategory',(req, res) => { 
    if(req.body.categoryName){ 
        if( res.locals.role && (res.locals.role == 'A3')){
            let cats = global.fileSystem.groupBy(global.DataBase.categories,'categoryName') 
            if((cats)[(req.body.categoryName).trim()]){
                res.send({state:false,message:'This category has been created'})
            }
            else{
                global.DataBase.categories.push({
                    id:global.security.idMaker(true),
                    categoryName : req.body.categoryName,
                    active : true
                })
                res.send({state:true,message:'new category added suceessfully'})
            }
        }
        else{res.send({state:false, message:'you do not have permission'}).status(200)}
    }
    else{res.send({state:false, message:'data is defective'}).status(200)}  
})
//*************************************************************************************************/
router.post('/api/deleteServiceCategory',(req, res) => { 
    if(req.body.categoryID){ 
        if( res.locals.role && (res.locals.role == 'A3')){
            let cats = global.fileSystem.groupBy(global.DataBase.categories,'categoryID') 
            let cat = (cats)[(req.body.categoryID).trim()]
            if(cat){
                global.DataBase.categories = (global.DataBase.categories).splice((cats.indexOf(cat)), 1); 
                res.send({state:true,message:'This category  deleted successfully'})
            }
            else{ 
                res.send({state:false,message:'category not found'})
            }
        }
        else{res.send({state:false, message:'you do not have permission'}).status(200)}
    }
    else{res.send({state:false, message:'data is defective'}).status(200)}  
})
//*************************************************************************************************/
module.exports = router;
