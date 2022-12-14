var deleteFolder = {} 
//*******************************************************************************************
deleteFolder.delete  = function(path,callback) {
    try {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
            const curPath = global.Path.join(path, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolder.delete(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
            });
            fs.rmdirSync(path);
            if(callback && typeof callback === 'function'){
                callback(true);
            }
            return(true);
        }
        else{
            if(callback && typeof callback === 'function'){
                callback(false);
            }
            return(false);
        }
    } catch (error) { global.Logger.log('error',error,'error',false,false,null); }
}; 
//*******************************************************************************************
module.exports = deleteFolder;  