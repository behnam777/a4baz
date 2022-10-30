var convertor = {}
//*******************************************************************************************
convertor.stringToHex = (str)=>{   
            try { 
                var result = '';
                for (var i=0; i<str.length; i++) {
                    result += str.charCodeAt(i).toString(16);
                }
                return result;
            } catch (error) {    global.Logger.log('error',error,'error',false,false,null);  } 
} 
//*******************************************************************************************
convertor.stringToDecimal = (val)=> {  
        try {
            var hex = val.split('').reverse().join(''); 
            var dec = 0; 
            for (var i = 0; i < hex.length; i++) { 
                 var conv = '0123456789ABCDEF'.indexOf(hex[i]); 
                     dec += conv * Math.pow(16, i);
            } 
            return(dec);
        } catch (error) {    global.Logger.log('error',error,'error',false,false,null);  }  
} 
//*******************************************************************************************
convertor.HexToString = (hexx) => { 
        try {
            var hex = hexx.toString();
            var str = '';
            for (var i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2){
                str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
            }
            return(str); 
        } catch (error) {    global.Logger.log('error',error,'error',false,false,null);  } 
} 
//*******************************************************************************************
String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
}
//*******************************************************************************************
String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}
//*******************************************************************************************
module.exports = convertor;

 