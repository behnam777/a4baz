var connection = {}
    connection.database = '';
    connection.url = '';
    connection.settings = '';
    connection.CollectionNames = [];
//***********************************************
connection.Initializing = ()=>{
    return new Promise((resolve,reject)=>{ 
       console.log('\x1b[32m','... database connection is Initializing','\x1b[0m');
        try { 

            for(let index = 0; index < Object.keys(global.settings.database).length; index++) {
                const databaseSetting = global.settings.database[Object.keys(global.settings.database)[index]];
                if(databaseSetting && databaseSetting['name'] && databaseSetting['autoConnection']){
                    connection[databaseSetting['name']];
                    connection.settings = databaseSetting;
                    connection.url = "mongodb://"+  
                    connection.settings.username+":"+connection.settings.password +"@"+ 
                    connection.settings.host +":"+connection.settings.port+"/"
                    global.MongoClient.connect(connection.url, { useNewUrlParser: true, useUnifiedTopology: true },(error, db)=>{
                        if (error){  reject(error) }
                        else{  
                            connection.database = db.db(connection.settings.name); 
                            connection.database.listCollections().toArray().then((result)=>{ 
                            connection.Collections = result;
                                for (let index2 = 0; index2 < (result).length; index2++) {
                                    const Collection = result[index2];
                                    connection.CollectionNames.push([Collection['name']])
                                }
                                //******************* now add your collection , if not existed ************************
                                if(!(connection.CollectionNames).includes('users')){   
                                    connection.database.createCollection("users", function(error, res) {if(error){reject(error)}}) 
                                }
                                if(!(connection.CollectionNames).includes('services')){   
                                    connection.database.createCollection("services", function(error, res) {if(error){reject(error)}}) 
                                }
                                //*************************************************************************************
                            })
                            resolve(true); }
                    });
                    break;
                    return true;
                }
            }
            
        } 
        catch (error) { reject(error) }
    })
}
//***********************************************
module.exports = connection;