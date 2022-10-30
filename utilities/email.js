var EMAIL = {} 
//******************************************************************************************************************************************************
EMAIL.Initializing = ()=>{
    return new Promise((resolve,reject)=>{
        global.Logger.console('log','... EMAIL is Initializing'); 
        try { 
            EMAIL.transporter = nodemailer.createTransport({
                service:  global.DataBase['email'].settings['host'],
                secure:   false,
                auth: {
                    user: global.DataBase['email'].settings['user'] ,
                    pass: global.DataBase['email'].settings['password'] 
                }
            });
            resolve(true);
        }
        catch (error) { reject(error);  }
    })
}
//******************************************************************************************************************************************************
EMAIL.sendEmail = (email,message,subject)=>{
    try {
        if(message && email){
            let mailOptions = {
                from: global.DataBase['email'].settings['user'] ,
                to: email,
                subject: (subject) || 'roxanne',
                text: message
            }; 
            EMAIL.transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    global.Logger.log('error',error,'error',false,false,null);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    }catch(error){global.Logger.log('error',error,'error',false,false,null);}
}
//******************************************************************************************************************************************************
module.exports = EMAIL;