var     GDB                      =       new Object(); 
//******************************************************************************************************************************************
var     System                                  =       {};
        System['users']                         =       new Object();
        System['logger']                        =       { txt1: "   ",  txt2: "   ",  txt3: "   ",  txt4: "   ",  txt5: "   ",  txt6: "   ",  field1: "type", field2: "filename",  field3: "date", field4: "message",  field5: "millisecond",phoneNumber: "",backupTimeLogs:3,dailyLogsList:[],cloudStorage:false}; 
        System['http']                          =       { port:80}
        System['roles']                         =       { "A3":'admin',"A2":"technicalSupport","A5":"serviceman","A5":"happyCall","A4":"marketing","A1":"finance","A6":"tsHappyCall"}
//******************************************************************************************************** UPDATE whit cheching true STRUCTURE and then save.
GDB.save = (directory,callback)=>{  
        try {
                if(!global.duix.get('systemWillRestartFlag')){
                        let db = GDB.System;
                        let path = '/a4baz/.DB'
                        if(directory && global.fs.existsSync(directory)){
                                path = directory + '/.DB'
                        }
                        if(global.DataBase){ db = global.DataBase}
    
                        try {db = JSON.stringify(db, null, 2)} 
                        catch (error) {
                                console.log(error);
                                return false;
                        }
                        let saveDBfile = ()=>{
                                global.fs.writeFile(path, db ,(err)=> { 
                                        if(err){ 
                                                console.log(err);
                                                return false;
                                        }
                                        else{
                                                if(callback && typeof(callback) === 'function'){callback()}
                                                return true;
                                        }     
                                })
                        }
                        if(db){ // if databse (on memory) is not empty , then lets go to check Structure :
                                let   testDatabseStructureHelper = ''
                                try { 
                                        testDatabseStructureHelper = JSON.parse(db);// For make sure database is Wrong Strucutre 
                                        if(testDatabseStructureHelper){  //now we make sure db is true and not empty
                                                testDatabseStructureHelper = '';
                                                saveDBfile();
                                        }
                                } 
                                catch (error) { // its wrong stucture
                                        db = db.substring(0, db.length - 1); // remove last charecter '}'
                                        try {
                                                testDatabseStructureHelper = JSON.parse(db);
                                                if(testDatabseStructureHelper){  //now we make sure db is correct
                                                        testDatabseStructureHelper = '';
                                                        saveDBfile();
                                                }
                                        } 
                                        catch (error) {// its on wrong stucture , now we can not do any thing - should call to supporter and save wrong data as wrong strucure.
                                                saveDBfile();
                                                console.log(error);
                                                return false;
                                        }
                                }
                        }
                        else{ // databse (on memory) is empty , and we do not save it
                                console.log(error);
                                return false;
                        }
                }
        } catch (error) { console.log(error);global.Logger.log('error',error,'error');}
} 
//****************************************************************************************************************************************
GDB.databaseAutoBackupMaker = ()=>{ 
        return new Promise((resolve,reject)=>{ 
                try {  
                        setTimeout(()=>{ 
                                GDB.update('/a4baz/Backup',()=>{
                                        /*if(global.DataBase['setup']['sendDataBaseBackupToCloud']){
                                                global.GATEWAY.sendDataBaseBackupToCloud();
                                        }*/
                                        GDB.databaseAutoBackupMaker();
                                }) 
                        }, 86400000);

                } catch (error) {global.Logger.log('error',error,'error');resolve(false)}   
        })
} 
//****************************************************************************************************************************************
GDB.databaseRestorBackup = ()=>{ 
        return new Promise((resolve,reject)=>{ 
                try {  
                        if(fs.existsSync('/a4baz/Backup/.DB')) { 
                                try{
                                        GDB.System =  JSON.parse( global.fs.readFileSync('/a4baz/Backup/.DB') )
                                        if(GDB.System){
                                                global.DataBase = GDB.System; 
                                                fs.copyFileSync('/a4baz/Backup/.DB', '/a4baz/.DB');
                                                resolve(GDB.System);
                                        }
                                        else{
                                                reject('unknow situation 3'); 
                                        }
                                } 
                                catch (error) {  
                                        global.fs.readFile('/a4baz/Backup/.DB', "utf8", (err,restoredData)=>{
                                                if(err){reject(" read backup database error : "+err);} 
                                                if(restoredData.length){
                                                        
                                                        try {
                                                                restoredData = restoredData.substring(0, restoredData.length - 1); // remove last charecter '}' 
                                                                GDB.System = JSON.parse(restoredData);
                                                                if(GDB.System){  //now we make sure db is correct 
                                                                        global.DataBase = GDB.System; 
                                                                        fs.copyFileSync('/a4baz/Backup/.DB', '/a4baz/.DB');
                                                                        resolve(GDB.System);
                                                                }
                                                                else{
                                                                        reject('unknow situation 1');  
                                                                }
                                                        } 
                                                        catch (error) {
                                                                reject("backup database is not empty but structure is wrong , call to supporter"); 
                                                        } 
                                                }
                                                else{
                                                        reject("back up database is empty too"); 
                                                }
                                        })
                                } 
                        }
                        else{
                                reject('databse is wrong structure and no BackUp file not founded')
                        }

                } catch (error) {global.Logger.log('error',error,'error');resolve(false)}   
        })
}
//****************************************************************************************************************************************
GDB.Initializing = ()=>{   
        return new Promise((resolve,reject)=>{ 
                try {
                        global.duix.set('systemWillRestartFlag',false)
                        global.Logger.console('log','... Database is Initializing');
                        GDB.System = System;
                        fs.exists('./.DB',(result,error)=>{ 
                                if(error){reject(" Database 0: "+error);} 
                                if(result){
                                        global.fs.readFile('./.DB', "utf8", (err,data)=>{
                                                if(err){reject(" Database read error: "+err);} 
                                                try {
                                                        GDB.System = JSON.parse(data); 
                                                        if(GDB.System){
                                                                global.DataBase = GDB.System;  
                                                                GDB.databaseAutoBackupMaker();
                                                                GDB.save();
                                                                resolve(true);
                                                        }
                                                }
                                                catch(error) { 
                                                        if(error){ 
                                                                if(data.length){//it is means data is but it is wrong structure.
                                                                         
                                                                        data = data.substring(0, data.length - 1); // remove last charecter '}'
                                                                        try {
                                                                                GDB.System = JSON.parse(data);
                                                                                if(GDB.System){  //now we make sure db is correct
                                                                                        global.DataBase = GDB.System; 
                                                                                        GDB.databaseAutoBackupMaker();
                                                                                        GDB.save();
                                                                                        resolve(true);
                                                                                }
                                                                                else{
                                                                                        reject('unknow situation 2 - wrong format');  
                                                                                }
                                                                        } 
                                                                        catch (error) {
                                                                                GDB.databaseRestorBackup()
                                                                                .then((result) => {   
                                                                                        if(result){
                                                                                                GDB.save();
                                                                                                GDB.databaseAutoBackupMaker();
                                                                                                resolve(true);
                                                                                        }
                                                                                })
                                                                                .catch((error) => { reject(" Database restore has error : " + error ); })
                                                                        }   
                                                                }
                                                                else{// data base is empty
                                                                        GDB.databaseRestorBackup()
                                                                        .then((result) => {    
                                                                                if(result){ 
                                                                                        GDB.System = result; 
                                                                                        global.DataBase = GDB.System; 
                                                                                        GDB.save();
                                                                                        GDB.databaseAutoBackupMaker();
                                                                                        resolve(true);
                                                                                }
                                                                        })
                                                                        .catch((error) => { reject(" Database restore has error : " + error ); })
                                                                }
                                                                
                                                        }
                                                        
                                                }
                                                
                                        })
                                }
                                else{   
                                        fs.exists('/a4baz/Backup/.DB',(result,error)=>{ 
                                                if(error){reject(" Database 3: "+error);} 
                                                if(result){
                                                        console.log('DB NOT FOUND - use backup');
                                                        GDB.databaseRestorBackup()
                                                        .then((result) => {    
                                                                if(result){ 
                                                                        GDB.System = result; 
                                                                        global.DataBase = GDB.System; 
                                                                        GDB.save();
                                                                        GDB.databaseAutoBackupMaker();
                                                                        resolve(true);
                                                                }
                                                                else{
                                                                        console.log('DB NOT FOUND - use backup - False - make new ');
                                                                        global.DataBase = GDB.System; 
                                                                        GDB.save();
                                                                        GDB.databaseAutoBackupMaker();
                                                                        resolve(true);
                                                                }
                                                        })
                                                        .catch((error) => { reject(" Database restore has error : " + error ); })
                                                }
                                                else{
                                                        console.log('DB NOT FOUND - create new');
                                                        global.DataBase = GDB.System; 
                                                        GDB.save();
                                                        GDB.databaseAutoBackupMaker();
                                                        resolve(true);
                                                }
                                        })
                                }  
                        })
                } catch (error) {global.Logger.log('error',error,'error'); reject(" Database : "+error)}
        })
}
//******************************************************************************************************************************************
module.exports = GDB;
