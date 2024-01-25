
const  loginController = require('../controller/login.controller');
const {verifyToken} = require('../middleware/auth');


const userRoute = (app) =>{
    app.post('/api/login',loginController.login);
    app.post('/api/logout',verifyToken, loginController.logout)
    app.post('/api/signup', loginController.signUp)
}
module.exports = userRoute;