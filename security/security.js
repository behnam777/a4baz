var security = new Object();
security.salt = 'AYsecret898654564654TTTWSecret'
const {exec,spawn } = require('child_process'); 
//******************************************************************************************
security.Initializing = ()=>{
    return new Promise((resolve,reject)=>{
        try {  
            security.salt = global.security.idMaker();
            resolve(true)  
        }catch(error){ reject(error) }
    })
}
//******************************************************************************************
security.sign = (sign,data,coded,refresh)=>{
    return new Promise((resolve,reject)=>{
        try { 
            //*************************************************************************************************************************
            if(sign && !data && !coded){ //verify sign and verify user
                global.jwt.verify(sign, security.salt ,  function(err, verified) {   
                    if(err){resolve({state:false,message:'Authentication has an error verify:   '+err} )} 
                    else if(verified){ 
                        let userPaths = ((verified.data).split('_'));   
                        if( userPaths && global.DataBase.users[userPaths[0]] &&  global.DataBase.users[userPaths[0]][userPaths[1]]  ){
                            if(refresh == null){
                                resolve({state:true,data:verified.data,role:global.DataBase.users[userPaths[0]][userPaths[1]].roles[0]}); 
                            }
                            if(refresh != null){  
                                global.jwt.sign({data: verified.data}, security.salt ,{ expiresIn: '6d' },(err,sign)=>{  
                                    if(err){    
                                        resolve({state:false,message:'Authentication has an error sign '})  
                                    }
                                    else{     
                                        resolve({state:true ,data:verified.data,newSign:sign,role:global.DataBase.users[userPaths[0]][userPaths[1]].roles[0]}); 
                                    }
                                });  
                            }
                        }
                        else{  resolve({state:false,message:'user is invalid !'});  } 
                    }
                })
            }
            //*************************************************************************************************************************
            if(!sign  && data && !coded){//make sign
                global.jwt.sign({data: data}, security.salt ,{ expiresIn: '6d' },(err,sign)=>{  
                    if(err){resolve('Authentication has an error on make token :   '+err)}
                    else{   resolve({state:true,sign:sign});             }
                });
            }
            if(!data && !sign  &&  coded){//only decode sign and return data
                var decoded = global.jwt.decode(coded);
                setTimeout(() => {
                    resolve({state:true,decoded:decoded.data,data:decoded.data}); 
                }, 20);
            }
            if(!data && !sign  && !coded){//make sign
                resolve({state:false,message:'Signature, bad parameters'});
            }
            //else{   resolve({state:false,message:'Signature, bad parameters'});  }
        }
        catch(error){resolve('Authentication :   '+error)} 
    })
}
//******************************************************************************************
security.hashCode = (s) => {  
    try {
        let Hashed =  Math.abs(s.split("").reduce(function(a,b){a=((a<<s.length)-a)+b.charCodeAt(0);return a&a},0)).toString();
        return  Hashed;
    } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
}  
//******************************************************************************************
security.deHashCode = (s) => {  
    try {
        let deHashed1 = s.replace('R','=')
        let deHashed2 = new Buffer(deHashed1, 'base64').toString('ascii');
        return  deHashed2;           
    } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
}
//******************************************************************************************
security.idMaker = () => { 
        try {
                var S4 = function() {return (((1+Math.random())*0x10000)|0).toString(16).substring(1);};
                //let final = 'r'+S4()+S4()+S4()
                let final = String(Math.floor(Math.random() * 9000 + 1000)); // make 4 digit random number;
                return final; 
        } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
}; 
//******************************************************************************************
module.exports = security;