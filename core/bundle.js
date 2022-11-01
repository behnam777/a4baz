//*******************************************************************************************
console.log('\x1b[32m','\n','> _ began bundling BACKEND modules','\x1b[0m');
//*******************************************************************************************
global.moment                       =  require('moment-timezone');  
global.util                         =  require('util'); 
global.os                           =  require('os');
global.Path                         =  require('path');
global.fs                           =  require('fs');
global.express                      =  require('express'); 
global.duix                         =  require('duix');  
global.glob                         =  require('glob');  
global.bodyParser                   =  require('body-parser');
global.cors                         =  require('cors');  
global.cookieSession                =  require('cookie-session'); 
global.jwt                          =  require('jsonwebtoken');  
global.http                         =  require('http');  
global.querystring                  =  require('querystring');                 
global.child_process                =  require('child_process');
global.rateLimit                    =  require('express-rate-limit'); 
global.MongoClient                  =  require('mongodb').MongoClient; 
//*******************************************************************************************
global.deleteFolder                 =  require('../utilities/deleteFolder.js');
global.timeAndDate                  =  require('../utilities/time.js');
global.convertors                   =  require('../utilities/convertors.js'); 
global.email                        =  require('../utilities/email.js');   
//******************************************************************************************* 
global.security                     =  require('../security/security.js');
//******************************************************************************************* 
global.HTTP                         =  require('../api/HTTP.js'); 
global.Logger                       =  require('../log/logger.js');     
global.fileSystem                     =  require('../database/database.js');  
//*******************************************************************************************
global.user                         =  require('../entities/user.js');
//*******************************************************************************************      
global.sign                         =  global.security.sign; 
//*******************************************************************************************
setTimeout(() => {require('./Initialization.js');}, 100); 