var log                         =   {};   
    log.Setting                 =   { txt1: "   ",  txt2: "   ",  txt3: "   ",  txt4: "   ",  txt5: "   ",  txt6: "   ",  field1: "type", field2: "filename",  field3: "date", field4: "message",  field5: "millisecond",phoneNumber: "",backupTimeLogs:3,dailyLogsList:[],cloudStorage:false}; 
//*******************************************************************************************
log.console     =    (type,message,needSaveAsLog)=>{
    try {
        switch (type) {
            case 'error':           console.log('\x1b[31m',message,'\x1b[0m'); break;//Red
            case 'log':             console.log('\x1b[32m',message,'\x1b[0m'); break;//Green
            case 'warning':         console.log('\x1b[33m',message,'\x1b[0m'); break;//Yellow
            case 'important':       console.log('\x1b[33m',"\x1b[44m",message,'\x1b[0m',"\x1b[40m"); break;//Blue 
            case 'notImportant':    console.log('\x1b[36m',message,'\x1b[0m'); break;//Gray  
            default:                console.log(type);                         break;//white
        }
        if(needSaveAsLog === true){log.log('consoleLogs',message,type) }
    } catch (error) { return false; }
}
//*******************************************************************************************
log.loggerSettings     =    (data)=>{
    return new Promise((resolve,reject)=>{ 
        try {   
            for(let i = 0 ; i  <  Object.keys(data).length ; i++){
                let property = Object.keys(data)[i]; 
                if((log.Setting).hasOwnProperty(property)){
                    log.Setting[property] = data[property];
                }
            }  
            resolve({state:true,message:'Settings were successfully applied'});
            
        } catch (error) {resolve({state:false,message:'internal error'});}
    })
}
//*******************************************************************************************
log.log = (filename,receivedMessage,type='log',needJson,sentToAdmin,sendToFamily,needSMS)=>{
    try {   
            //return true;
            //******* 1 - Check 'receivedMessage' Format  *** 
            if(typeof receivedMessage === 'object'){ 
                try {
                    receivedMessage = JSON.stringify(receivedMessage, Object.getOwnPropertyNames(receivedMessage)) 
                } catch (error) {return false;}
            } 
            //******* 2 - make information for logging    *** 
                let logMessage                                   =     {}
                    logMessage.filename                          =     filename;
                    logMessage.date                              =     (global.timeAndDate).getTime();
                    logMessage.millisecond                       =     (global.timeAndDate).getMilliSecondTime();     
                    logMessage.type                              =     (type);
                    logMessage.message                           =     (receivedMessage);
                    logMessage.notSelected                       =     ' ';
            //******* 3 - Make Folder For Save Logs *** 
               
                let dateForFolderName = (global.timeAndDate).timeAsName();
                let dailyDirectiory   = 'log/Logs/' + dateForFolderName;
                let logTypeDirectiory = 'log/Logs/' + dateForFolderName + '/' + type; 
                let saveMessage =   global.util.inspect(logMessage);
            //******* 4 - Now we form the desired format on Message  ***   
                    saveMessage = ( (log.Setting).txt1 + logMessage[(log.Setting).field1] + (log.Setting).txt2  + logMessage[(log.Setting).field2]  + (log.Setting).txt3  + logMessage[(log.Setting).field3]  + 
                                    (log.Setting).txt4 + logMessage[(log.Setting).field4] + (log.Setting).txt5  + logMessage[(log.Setting).field5]  + (log.Setting).txt6  + '\n')
            //******* 5 - Make Directory for save logs ***  
                if(!global.fs.existsSync(dailyDirectiory)){ 
                    try {   global.fs.mkdirSync(dailyDirectiory);    } catch (error) {return false;}
                    setTimeout(() => {
                        if((log.Setting.dailyLogsList.length)>(parseInt(log.Setting.backupTimeLogs) - 1)){
                            let mustDelete = ''
                            try {mustDelete = (log.Setting.dailyLogsList).shift();} catch (error) { return false;} 
                            try {if(mustDelete && global.fs.existsSync(mustDelete)){   global.deleteFolder.delete(mustDelete);      } } catch (error) {return false;}
                        }
                        if((log.Setting.dailyLogsList.length) < (parseInt(log.Setting.backupTimeLogs))){
                            log.Setting.dailyLogsList.push(dailyDirectiory);
                            /*global.fileSystem.update();*/
                        }
                        if(!global.fs.existsSync(logTypeDirectiory)){  setTimeout(() => {    try {global.fs.mkdirSync(logTypeDirectiory);} catch (error) {return false;} },10)  }
                    },10)    
                }else{if(!global.fs.existsSync(logTypeDirectiory)){  setTimeout(() => {      try {global.fs.mkdirSync(logTypeDirectiory);} catch (error) {return false;} },10)  }}
            //******* 6 - now , we have directories and formated logs , so Save Log Files *** 
                try {
                    global.fs.appendFile(logTypeDirectiory +'/'+ filename+'.log',saveMessage, ()=>{ 
                        global.fs.appendFile(dailyDirectiory +'/'+'general'+'.log',saveMessage,()=>{});
                    })
                } catch (error) {return false;}
                
            //******* 7 - If call LOG function and need Json format by set 'needJson' parametr 'True' *** 
                if(needJson){
                    try {global.fs.appendFile(logTypeDirectiory +'/'+ filename , ',' + (JSON.stringify(logMessage)),()=> {  });} catch (error) {return false;}
                    
                } 
            //******* 8 - update generaljs   ***
                    try {global.fs.appendFile(dailyDirectiory +'/'+'general',    ',' + (JSON.stringify(logMessage)),()=>{});} catch (error) {return false;}
                    
            return true;
    }
    catch (error) {  return false; }
} 
//*******************************************************************************************
log.Monitor = (callback)=>{
    return new Promise((resolve,reject)=>{
        try {
            
            log.LogsFolders = [];
            let logText = '';
            global.fs.readdirSync('log/Logs').filter(function (folder) {
                if(global.fs.statSync('log/Logs'+'/'+folder).isDirectory()){
                    try {
                        logText = (global.fs.readFileSync('/srv/log/Logs'+'/'+folder+'/'+'general',"utf8")); 
                        //logText =  logText 
                        logText = logText.substring(1);
                        logText = '[' + logText + ']'
                        log.LogsFolders.push([folder,logText]);
                    } 
                    catch (error) {   }
                } 
            });  
            setTimeout(() => {
                if(callback && typeof(callback) === 'function'){callback(log.LogsFolders)}
                else{resolve(log.LogsFolders)}
            }, 2000);

        } catch (error) { global.Logger.log(' error',error,'error',false,false,null); }
    })
        
}
//*******************************************************************************************
log.Initializing = ()=>{
    return new Promise((resolve,reject)=>{ 
       console.log('\x1b[32m','... Logger is Initializing','\x1b[0m');
        try {
            if((global.settings.logger)){
                log.Setting = (global.settings.logger); 
            } 
            if(!global.fs.existsSync('log/Logs/')){
                global.fs.mkdirSync('log/Logs/');
            }
            resolve(true);
        } 
        catch (error) { reject(error) }
    })
}
//*******************************************************************************************
module.exports = log;