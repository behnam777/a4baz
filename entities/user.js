var user = {}
//***********************************************
user.new = (data)=>{
    
}
//***********************************************
user.signup = (data)=>{
    return new Promise((resolve,reject)=>{
        try {
            console.log(data);
            if(data && data.phonenumber && data.phonenumber.length == 10 || data.phonenumber.length == 11){
                connection.database.collection('users').findOne({phonenumber: data.phonenumber}, {_id: 0},(r,e)=>{
                    if(e){
                        global.Logger('error',error,'error');
                        resolve({message:'internal server error',state:false})
                    }
                    if(r){
                        console.log(r);
                        resolve({message:'ok',state:true})
                    }
                });
            }  
        } catch (error) {
            global.Logger('error',error,'error');
            reject({message:'internal server error',state:false})
        }
     })
   
}
//***********************************************
module.exports = user;