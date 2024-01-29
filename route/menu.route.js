

const MenuController = require('../controller/menu.controller');
const { upload } = require('../controller/multer');


const menuRoute = (app) =>{
    app.get('/api/menu-getall', MenuController.getAllMenuItems);
    app.get('/api/menu-getOne/:ItemID',  MenuController.getMenuItemById); //parameter must be the same query from DB
    app.post('/api/menu-create',upload.single('file'),MenuController.createMenuItem);
    app.put('/api/menu-update/:ItemID',upload.single('file'), MenuController.updateMenuItem);
    app.delete('/api/menuItem-remove/:ItemID',MenuController.deleteMenuItem);
    app.post('/api/menuImage-upload')
}
module.exports = menuRoute;