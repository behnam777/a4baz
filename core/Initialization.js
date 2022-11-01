global.fileSystem.Initializing() 
.then((result) => {
    if(result){     return global.Logger.Initializing();        }
    else{           return false;                               }
})  
.then((result) => {  
    if(result){     return global.security.Initializing();} 
    else{ global.Logger.log('FinalCatch',{erros:'wrong input'},'warrning') }
}) 
.then((result) => { 
    if(result){     return global.HTTP.Initializing();          }
    else{ global.Logger.log('FinalCatch',{erros:'wrong input'},'warrning') }
})  
.then((result) => {  
    if(result){  global.Logger.console('log','> _ A4BAZ server is ready 👍');   }
    else{ global.Logger.log('FinalCatch',{erros:'wrong input'},'warrning') }
})
.catch((error) => {
    global.Logger.console('error','Initializing final catch :  ' + error);  
    global.Logger.log('error',error,'error',false,false,null);    
});  