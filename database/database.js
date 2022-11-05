var     GDB                      =       new Object(); 
//******************************************************************************************************************************************
var     System                                  =       {};
        System['users']                         =       {'9122899840':{id:'A_9122899840',name:'admin',state:'enable',activationSMSCode:'1111',phonenumber:'9122899840',roles:['A3']}}
        System['logger']                        =       { txt1: "   ",  txt2: "   ",  txt3: "   ",  txt4: "   ",  txt5: "   ",  txt6: "   ",  field1: "type", field2: "filename",  field3: "date", field4: "message",  field5: "millisecond",phoneNumber: "",backupTimeLogs:3,dailyLogsList:[],cloudStorage:false}; 
        System['http']                          =       { port:80,address:'http://193.151.135.169'}
        System['swagger']                       =       { version:'1.0',swaggerApi:'/apis-d',title:'A4Baz APIs documentation'}
        System['roles']                         =       { "A7":'user',"A3":'admin',"A2":"technicalSupport","A5":"serviceman","A5":"happyCall","A4":"marketing","A1":"finance","A6":"tsHappyCall"}
        System['categories']                      =       [
                {categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',active:true},
                {categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',active:true},
                {categoryID:'03',categoryName:'سرور و شبکه',active:true},
                {categoryID:'04',categoryName:'صوت و تصویر',active:true},
                {categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',active:true},
                {categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',active:true},
                {categoryID:'07',categoryName:'خدمات مخابراتی و زیر ساخت',active:true},
                {categoryID:'08',categoryName:'خدمات برق ساختمانی',active:true}
        ] 
        System['services']                      =       [
            
                {id:'01A',title:'نصب و راه اندازی', categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
                {id:'01B',title:'تعمیر و رفع ایراد',categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
                {id:'01C',title:'سرویس کامل',categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
                {id:'01D',title:'جنرال سرویس',categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
                {id:'01E',title:'دستگاه فکس',categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
                {id:'01F',title:'بررسی صحت سلامت دستگاه',categoryID:'01',categoryName:'پرینتر ,پلاتر ,اسکنر',experts:[],price:0,active:true},
        
                {id:'02A',title:'نصب ویندوز و نرم افزار',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02B',title:'نصب آنتی ویروس و ویروس یابی',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02C',title:'نصب و راه اندازی کامل دستگاه',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02D',title:'عدم اتصال به اینترنت',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02E',title:'نصب و راه اندازی مودم اینترنت',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02F',title:'آموزش کاربری دستگاه',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02G',title:'مشکلات سخت افزاری',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                {id:'02H',title:'سرویس کامل دستگاه',categoryID:'02',categoryName:'کامپیوتر،لپ تاپ،نرم افزار',experts:[],price:0,active:true}, 
                
                {id:'03A',title:'نصب و راه اندازی سرور',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03B',title:'جنرال سرویس',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03C',title:'نصب سیستم عامل',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03D',title:'RAID بندی',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},
                {id:'03E',title:'ارتقا سخت افزار سرور و استوریچ',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03F',title:'عیب یابی و تعمیر',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03G',title:'شبکه داخلی و وایرلس',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true}, 
                {id:'03H',title:'نصب و راه اندازی سوئیچ',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},  
                {id:'03I',title:'عیب یابی سرویس و تعمیر سرور',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},  
                {id:'03J',title:'نصب و عیب یابی استوریچ',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},  
                {id:'03K',title:'نصب اکتیو دایرکتوری',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},  
                {id:'03L',title:'سایر',categoryID:'03',categoryName:'سرور و شبکه',experts:[],price:0,active:true},  
                
                {id:'04A',title:'تلوزیون',categoryID:'04',categoryName:'صوت و تصویر',experts:[],price:0,active:true}, 
        
                {id:'05A',title:'موبایل و تلفن همراه',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05B',title:'هارد اکسترنال',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05C',title:'فلش مموری',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05D',title:'دوربین دیجیتال',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05E',title:'SD,MicroSD,CF',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05F',title:'پاک شدن،ضربه خوردگی،آب خوردگی',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05G',title:'فرمت شدن، عدم شناسایی',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
                {id:'05H',title:'Server,SAN,NAS',categoryID:'05',categoryName:'بازیابی اطلاعات و تعمیر هارددیسک',experts:[],price:0,active:true}, 
        
                {id:'06A',title:'نصب و راه اندازی',categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',experts:[],price:0,active:true}, 
                {id:'06B',title:'تعمیر و رفع ایراد',categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',experts:[],price:0,active:true}, 
                {id:'06C',title:'سرویس کامل',categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',experts:[],price:0,active:true}, 
                {id:'06D',title:'جنرال سرویس',categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',experts:[],price:0,active:true}, 
                {id:'06E',title:'خدمات شارژ و تعمیر انواع کاتریج',categoryID:'06',categoryName:'کپی و دستگاه های تکثیر',experts:[],price:0,active:true}, 
        
                {id:'07A',title:'بازدید و رفع ایرادات خطوط و nod شبکه',categoryID:'07',categoryName:'خدمات مخابراتی و زیر ساخت',experts:[],price:0,active:true}, 
                {id:'07B',title:'برنامه ریزی مرکز تلفن ',categoryID:'07',categoryName:'خدمات مخابراتی و زیر ساخت',experts:[],price:0,active:true}, 
                {id:'07C',title:'نصب داکت یا تراکینگ ',categoryID:'07',categoryName:'خدمات مخابراتی و زیر ساخت',experts:[],price:0,active:true}, 
                {id:'07D',title:'کابل گذاری',categoryID:'07',categoryName:'خدمات مخابراتی و زیر ساخت',experts:[],price:0,active:true}, 
        
                {id:'08A',title:'نصب روشنایی',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
                {id:'08B',title:'نصب داکت و یا تراکینگ',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
                {id:'08C',title:'رفع اتصالی',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
                {id:'08D',title:'نصب فیوز و تابلو',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
                {id:'08E',title:'سیم کشی رو و یا توکار',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
                {id:'08F',title:'نصب و رفع ایراد آیفون های تصویری و عادی',categoryID:'08',categoryName:'خدمات برق ساختمانی',experts:[],price:0,active:true}, 
        
                //{id:'26',title:'',categoryID:'D',categoryName:' ',experts:[],price:0,active:true}, 
        
        ] 
//******************************************************************************************************** UPDATE whit cheching true STRUCTURE and then save.
//******************************************************************************************************** UPDATE whit cheching true STRUCTURE and then save.
GDB.groupBy = (xs, key)=>{
        return  xs.reduce(async function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
};
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
