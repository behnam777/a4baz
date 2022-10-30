var timeAndDate = new Object();
//*******************************************************************************************
timeAndDate.getMilliSecondTime = () => { 
        try {
            let m = global.moment().valueOf();
            return m;
        } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
};
//*******************************************************************************************
timeAndDate.TehranTime = () => { 
        try {//tehran ---> 3.5
            var d    = new Date();
            var utc  = d.getTime() + (d.getTimezoneOffset() * 60000);
            var nd   = new Date(utc + (3600000*(3.5))); 
            return  nd.toLocaleString();
        } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
};
//*******************************************************************************************
timeAndDate.timeAsName = () => { 
        try {   
            var year  = global.moment().year();
            var month = parseInt(global.moment().month()) + 1;
            var day   = global.moment().date();
            return  (year + '_' + month + '_' + day)
        } catch (error) {global.Logger.log('error',error,'error',false,false,null);} 
};
//*******************************************************************************************
timeAndDate.getTime = ()=>{   
        try { 
            let date    = new Date();  
            let year    = global.moment().year();
            let mounth  = parseInt(global.moment().month()) + 1;
            let day     = global.moment().date();
            let hour    = global.moment().hour();
            let minuts  = global.moment().minute();
            let second  = global.moment().second();
            let milliSecond = date.getMilliseconds();

            let nowDate = (year+'_'+mounth+'_'+day+' '+hour+'_'+minuts+'_'+second+'_'+milliSecond);
            return(nowDate);
        } catch (error) {   global.Logger.log('error',error,'error',false,false,null);   } 
} 
//*******************************************************************************************
timeAndDate.getSunriseAndSunset = (fild,d)=>{   //d : YYYY-MM-DD
    try { 

        let date = (( new Date()).toISOString().split('T')[0]); 
        if(d){date = d}

        let sun  = global.SunCalc.getTimes(new Date(date), parseInt(global.DataBase.gateway.settings['latitude']), parseInt(global.DataBase.gateway.settings['longitude']) );
        
        if(fild == 'sunsetHour'){
            let sunsetHour = sun.sunset.getHours();
            if(sunsetHour.length < 2){sunsetHour = '0'+sunsetHour;}
            return sunsetHour;
        }
        if(fild == 'sunsetMinut'){
            let sunsetMinut = sun.sunset.getMinutes();
            if(sunsetMinut.length < 2){sunsetMinut = '0'+sunsetMinut;}
            return sunsetMinut;
        }
        if(fild == 'sunriseHour'){
            let sunriseHour = sun.sunrise.getHours();
            if(sunriseHour.length < 2){sunriseHour = '0'+sunriseHour}
            return sunriseHour;
        }
        if(fild == 'sunriseMinut'){
            let sunriseMinut = sun.sunrise.getMinutes();
            if(sunriseMinut.length < 2){sunriseMinut = '0'+sunriseMinut}
            return sunriseMinut;
        }
        if(!fild){
            return sun;
        } 
        

    } catch (error) {   console.log(error);global.Logger.log('error',error,'error',false,false,null); return true;  } 
} 
//*******************************************************************************************
module.exports = timeAndDate;