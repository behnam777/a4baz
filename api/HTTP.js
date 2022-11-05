var HTTP = new Object();
//******************************************************************************************
HTTP.Initializing = ()=>{
    return new Promise((resolve,reject)=>{
        try {
            global.Logger.console('log','... Express is Initializing'); 
            //******************************************************************************************************
            HTTP.app  = global.express();  
            HTTP.port = global.DataBase.http.port;
            HTTP.root = '.';
            global.HTTP.Server = global.http.createServer(HTTP.app)
            global.HTTP.Server.listen(HTTP.port);
            //******************************************************************************************************
            HTTP.app.use(global.cors());
            HTTP.app.use(express.json())
            HTTP.app.use(global.bodyParser.json()); 
            HTTP.app.use(global.bodyParser.json({limit: '50mb'}));
            HTTP.app.use(global.bodyParser.urlencoded({limit: '50mb', extended: true})); 
            //****************************************************************************************************** 
            HTTP.app.use(global.DataBase.swagger['swaggerApi'],global.Swagger.serve,global.Swagger.ui)
            //******************************************************************************************************
            const router    = HTTP.routerMaker();
            //********************************************* 2 - routes (APIs that need to authorization) ***********************************************
            HTTP.app.use('/api/',(req,res,next)=>{  
                if(req.headers.authorization && req.headers.authorization != undefined && req.headers.authorization != 'undefined' && req.headers.authorization != 'null'){ 
                    global.sign(req.headers.authorization,null,null,null)
                    .then((verify)=>{  
                        if(verify.state){ 
                            res.locals.role  = verify.role;
                            res.set('authorization', req.headers.authorization);
                            res.set('Access-Control-Expose-Headers', 'authorization');
                            global.duix.set('token',req.headers.authorization);
                            global.duix.set('activeUser',verify.data); 
                            next(); 
                        }
                        else{
                            res.set('authorization', undefined);
                            res.set('Access-Control-Expose-Headers', 'authorization');
                            res.send({state:false, message:'invalid token',needLogin:true}).status(200)
                        }
                    }).catch((error)=>{
                        res.set('authorization', req.body,req.headers.authorization);
                        res.set('Access-Control-Expose-Headers', 'authorization');  
                        res.send({state:false,message:'verify has error '}).status(200) 
                    }) 
                }else{res.send({state:false, message:'token not found'}).status(200)}
            });  
            //*************************************************  bundle routes  ************************************************************************
            HTTP.app.use(router);
            //*************************************************  3 - login is exception ,  (has self authorization methods and can has not Token) ******
             /** 
             * @swagger
             * /login:
             *  post:   
             *      summary : users login
             *      description: users will login by (phonenumber and code) or (jwt token)
             *      tags:
             *        - authorization
             *      requestBody:
             *          requierd : true
             *          content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          phonenumber:
             *                             type: string
             *                          code:
             *                              type: string
             *                      example:   # Sample object
             *                              phonenumber: 9122899840
             *                              code: 3461
             *      parameters:
             *         - in: header
             *           name: authorization
             *           schema:
             *               type: string 
             *           required: false
             *      responses:
             *          200: 
             *            headers:
             *               authorization: 
             *                  type: string
             *               description: authorization token.
             *            content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          state:
             *                             type: boolean
             *                          message:
             *                              type: string 
             */
            HTTP.app.post('/login',(req, res) => {    
                global.user.login(req.body,req.headers.authorization)
                .then((result)=>{
                    if(result){ 
                        res.set('authorization', result.token);
                        res.set('Access-Control-Expose-Headers', 'authorization'); 
                        res.send(result.res).status(200); 
                    }
                }).catch((error)=>{res.send({state:false, message:error}).status(500) })    
            })
            /** 
             * @swagger
             * /signup:
             *  post:   
             *      summary : user registration by phone number
             *      description: at the first the user register by phonenumber and get activation code through sms
             *      tags:
             *        - authorization
             *      requestBody:
             *          requierd : true
             *          content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          phonenumber:
             *                             type: string 
             *                      example:   # Sample object
             *                              phonenumber: 9122899840  
             *      responses:
             *          200:  
             *            content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          state:
             *                             type: boolean
             *                          message:
             *                              type: string
             *             
             */
            HTTP.app.post('/signup',(req, res) => {   
                global.user.signup(req.body)
                .then((result)=>{
                    if(result){  
                        res.set('Access-Control-Expose-Headers', 'authorization'); 
                        res.send(result).status(200); 
                    }
                }).catch((error)=>{console.log(error);;res.send({state:false, message:error}).status(500) })    
            })
            /** 
             * @swagger
             * /activationcode:
             *  post:   
             *      summary : request activation code again
             *      description: if the user did nort get the activation code he can request again
             *      tags:
             *        - authorization
             *      requestBody:
             *          requierd : true
             *          content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          phonenumber:
             *                             type: string 
             *                      example:   # Sample object
             *                              phonenumber: 9122899840  
             *      responses:
             *          200:  
             *            content:
             *              application/json:
             *                  schema:
             *                      type: object
             *                      properties:
             *                          state:
             *                             type: boolean
             *                          message:
             *                              type: string
             *             
             */
            HTTP.app.post('/activationcode',(req, res) => {   
                global.user.sendSMSagain(req.body)
                .then((result)=>{
                    if(result){  
                        res.set('Access-Control-Expose-Headers', 'authorization'); 
                        res.send(result).status(200); 
                    }
                }).catch((error)=>{console.log(error);res.send({state:false, message:error}).status(500) })    
            })
            HTTP.app.use(function (req, res, next) {
                res.status(404).send({state:false, message:"Sorry can't find page!"})
            }) 
            //******************************************************************************************************
            HTTP.app.use(router); 
            //******************************************************************************************************
            resolve(true);
            //******************************************************************************************************
        } catch (error) {       reject(error);  }
    })
} 
//******************************************************************************************
HTTP.routerMaker = ()=>{
    try {
        const glob   = global.glob ;
        const Router = global.express.Router;
        return(
            glob
            .sync('**/*.js', { cwd: `${__dirname}/routes/` })
            .map(filename => require(`./routes/${filename}`))
            .filter(router => Object.getPrototypeOf(router) == Router)
            .reduce((rootRouter, router) => rootRouter.use(router), Router({ mergeParams: true }))
        )
    } catch (error) {global.Logger.log('error',error,'error',false,false,null); }
} 
//******************************************************************************************************************************************************************************
module.exports = HTTP;