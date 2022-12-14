var User = {} 
//***********************************************
//TODO: no 200 for all
/**
 * Signup the user by phone number
 * @param {Object} data - the object that contains phonenumber
 * @return {Object} response - The response for the request
 */
User.signup = (data)=>{ // user sent his phonenumber and get activation code
    return new Promise((resolve,reject)=>{
        try { 
            if(data && data.phonenumber && data.phonenumber.length == 10 ){ 
                //global.DataBase.users[phonecode] ? '' : global.DataBase.users[phonecode] = {} // create phone code category.
                
                if(global.DataBase.users[data.phonenumber]){
                    global.user.sendSMSagain(data).then((result)=>{resolve(result); }) 
                } 
                else{
                    let user = {
                        phonenumber : data.phonenumber , 
                        phonecode :  (data.phonenumber).substring(0,3) ,
                        activationSMSCode : '1111' , // TODO : global.security.idMaker()
                        id : "A_"+String( global.security.idMaker()),
                        lastSMSSendTime:Date.now(),
                        registrationTime : global.timeAndDate.timeAsName(),
                        state : 'disable',
                        needsLogin : true,
                        roles : ["A3"]
                    }
                    global.DataBase['users'][user.phonenumber] = user;
                    global.fileSystem.save();
                    resolve({message:'registration successful',state:true});
                }
            }  
            else{resolve({message:'The phone number is not correct',state:false});} 

        } catch (error) {
            global.Logger.log('error',error,'error');
            reject({message:'internal server error',state:false});return false;
        }
     })
}
//***********************************************
/**
 * send activation code to user throgh sms
 * @param {Object} data - the object that contains phonenumber
 * @return {Object} response - The response for the request
 */
User.sendSMSagain = (data)=>{
    return new Promise((resolve,reject)=>{
        try {
            if(data && data.phonenumber && (data.phonenumber).length == 10 ){
                //let phonecode = (data.phonenumber).substring(0,3);
                if(global.DataBase.users[data.phonenumber]){
                    if( Date.now() - (global.DataBase.users[data.phonenumber]['lastSMSSendTime']) > 120000){
                        global.DataBase.users[data.phonenumber]['activationSMSCode'] = '1111' /*global.security.idMaker();*/
                        global.DataBase.users[data.phonenumber]['lastSMSSendTime'] =  Date.now();
                        //TODO:send sms
                        global.fileSystem.save();
                        resolve({message:'The activation code has been sent again',state:true})
                    }
                    else{ resolve({message:'Wait at least two minutes from the previous transmission',state:false})}
                }
                else{ resolve({message:'User not found. Please enter your phone number without zero',state:false})}
            }
            else{ resolve({message:' The phone number is not correct',state:false})}
        } catch (error) { 
            global.Logger.log('error',error,'error');
            reject({message:'internal server error',state:false});
        }
    })
}
//***********************************************
User.login = (data,Token)=>{ // user insert his activation code or login by token
    return new Promise((resolve,reject)=>{
        try {    
            if( Token && (Token != undefined)  && (Token != 'undefined')  && (Token != 'null') && (Token != null)){  
                global.sign(Token,null,null,'refresh')
                .then((ExtendedSign)=>{ 
                    if(ExtendedSign.state){   
                            resolve({res:{state:true,  message:'The signature updated'},token:ExtendedSign.sign});return true;
                    }
                    else{   resolve({res:{state:false, message:ExtendedSign.message+' login again'} }); return false;}
                }) 
                .catch((error) => { reject('login ,on make new token  :' + error);  }) 
            } 
            else if (data && data.phonenumber && (data.phonenumber).length == 10 ) { 
                //let phonecode = (data.phonenumber).substring(0,3); 
                let user = global.DataBase.users[data.phonenumber] 
                if(!user){
                    resolve ({res:{state:false, message:' User not found ' }});return false;
                }
                if(user && user.state == 'deleted'){ 
                    resolve ({res:{state:false, message:' user is deleted' }});return false;
                } 
                if(user && user['activationSMSCode'] === data.code){
                    global.sign(null,user['phonenumber'],null)
                    .then((result)=>{   
                        if(result.state){  
                            //global.DataBase.users[data.phonenumber]['activationSMSCode'] = ''
                            global.DataBase.users[data.phonenumber]['state'] = 'enable' 
                            resolve({ res:{state:true,   message: user} ,token:result.sign});
                        }
                        else{  resolve({ res:{state:false,  message:'making signature for login failed'}  }); }
                    })
                    .catch((error) => { reject('making new token has error :'+error);  }) 
                }else{   resolve({res:{state:false, message:' activation code is not true' }}); } 
            }
            else{resolve({res:{state:false, message:'The phone number is not correct '}});  }
        }catch (error) {global.Logger.log('error',error,'error');  reject('login  :'+error);  }
    })
}
//***********************************************
 
module.exports = User;