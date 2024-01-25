
const profileController = require("../controller/profile.controller");
//const { verifyToken } = require("../middleware/auth");

const profileRoute = (app) =>{
    app.get('/api/profile/:userId',profileController.getProfileByUserId); 
    app.put('/api/update-profile/:userId', profileController.updateProfile); 
    app.get('/api/profile-getall', profileController.getAllProfiles); 
    app.delete('/api/remove-userprofile/:userId', profileController.deleteProfile);

}
module.exports = profileRoute;