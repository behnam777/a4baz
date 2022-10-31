var user = {} 
//***********************************************
user.signup = (data)=>{
    return new Promise((resolve,reject)=>{
        try {
            if(data && data.phonenumber && data.phonenumber.length == 10 || data.phonenumber.length == 11){
                for(let index = 0; index < Object.keys(global.DataBase.users).length; index++) {
                    if(data.phonenumber == global.DataBase.users[Object.keys(global.DataBase.users)[index]]['phonenumber']){
                        resolve({message:'The user has registered with this phone number',state:false})
                        return true;
                    }
                }
                let user = { phonenumber : data.phonenumber , activationSMSCode : '1111' , id : global.security.idMaker()}
                global.DataBase['users'][user.id] = user;
                global.DataBase.save();
                resolve({message:'registration successful',state:true})
                return true;
            }  
            else{
                resolve({message:'phone number is short',state:false})
            } 
        } catch (error) {
            global.Logger.log('error',error,'error');
            reject({message:'internal server error',state:false})
        }
     })
}
//***********************************************
module.exports = user;