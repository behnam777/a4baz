var Swagger = {}  
//***********************************************
Swagger.Initializing = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            global.Logger.console('log','... Swagger is Initializing'); 
            const swaggerOptions = {
                definition:{
                    openapi:'3.0.0',
                    info:{
                        title:  process.env.SwaggerTitle,
                        version:process.env.SwaggerVersion
                    },
                    servers:[
                        {
                            url:process.env.SwaggerUrl 
                        }
                    ]
                },
                apis:['../api/HTTP.js']
            }
            const swaggerSpec = global.swaggerJSDoc(swaggerOptions) 
            Swagger.serve = global.swaggerUi.serve
            Swagger.ui = global.swaggerUi.setup(swaggerSpec)
            resolve(true)
        }
        catch(error){reject(error)}
    })
}
//***********************************************
module.exports = Swagger;