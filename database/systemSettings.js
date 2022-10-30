var settings = {}
//***********************************************
settings['logger'] = { txt1: "   ",  txt2: "   ",  txt3: "   ",  txt4: "   ",  txt5: "   ",  txt6: "   ",  field1: "type", field2: "filename",  field3: "date", field4: "message",  field5: "millisecond",phoneNumber: "",backupTimeLogs:3,dailyLogsList:[],cloudStorage:false}
settings['http'] = { port:80}
settings['database'] = {
    'a4baz2':{name:'a4baz2',username:'admin',password:'hhtmasteruu',host:'172.18.0.3',port:'27017', autoConnection:true}
}
//***********************************************
module.exports = settings;