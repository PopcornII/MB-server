
const MenuController = require('../controller/menu.controller');

const menuRoute = (app) =>{
    app.get('/api/menu-getall', MenuController.getAllMenuItems);
    app.get('/api/menu-getOne/:ItemID',  MenuController.getMenuItemById); //parameter must be the same query from DB
    app.post('/api/menu-create',  MenuController.createMenuItem);
    app.put('/api/menu-update/:ItemID',  MenuController.updateMenuItem);
    app.delete('/api/menuItem-remove/:ItemID',MenuController.deleteMenuItem);
}
module.exports = menuRoute;