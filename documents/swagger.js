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
                apis:['/a4baz/api/HTTP.js','/a4baz/api/routes/*.js']
            }
            const swaggerSpec = global.swaggerJSDoc(swaggerOptions) 
            Swagger.serve = global.swaggerUi.serve
            Swagger.ui = global.swaggerUi.setup(swaggerSpec,{
                customCss: '.swagger-ui .topbar { display: none }',
                customSiteTitle: "a4baz API", 
            })
            resolve(true)
        }
        catch(error){reject(error)}
    })
}
//***********************************************
/** 
 * @swagger
 * /api/books/addbook:
 *  put:
 *      summary : update mongodb
 *      description: update mongodb by put method
 *      parameters:
 *        - in : path
 *          name : id
 *          required: true
 *          description : book id
 *          schema :
 *              type: integer
 *      requestBody:
 *          requierd : true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref : '#components/schemas/Book'
 *      responses:
 *          200:
 *              description: update sucessfully
 *              content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                          $ref : '#components/schemas/Book'
 */
//***********************************************
module.exports = Swagger;