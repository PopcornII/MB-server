
const db = require('../config/db');

// Create a new menu item with image upload
const createMenuItem = async (req, res) => {
  try {
    console.log('req.file:', req.file);
    const { ItemName, Description, Price } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, error: 'No image uploaded' });
    }
    // Check if file.buffer is a Buffer
    if (!(file.buffer instanceof Buffer)) {
      console.log("req.file.buffer", req.file.buffer);
      return res.status(500).json({ success: false, error: 'Invalid file buffer' });
    }
    const [menuInsertResult] = await db
      .promise()
      .query('INSERT INTO menu (ItemName, Description, Price, ImageData) VALUES (?, ?, ?,?)', [
        ItemName,
        Description,
        Price,
        req.file.buffer,
      ])
    const menuItemId = menuInsertResult.insertId;
    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      menuItem: {
        ItemID: menuItemId,
        ItemName,
        Description,
        Price,
    
      },
    });
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
   
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    // Fetch all menu items from the 'menu' table
    const [menuItems] = await db.promise().query('SELECT * FROM menu');

    // Convert image data to Base64
    const menuItemsWithBase64 = menuItems.map(item => {
      return {
        ...item,
        ImageData: item.ImageData.toString('base64')
      };
    });

    res.status(200).json({
      success: true,
      menuItems:menuItems[0],
      menuItems: menuItemsWithBase64,
    });
      
  } catch (err) {
    console.error('Error fetching all menu items:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
// Get a specific menu item by ID
/*const getMenuItemById = async (req, res) => {
  const  { ItemID }  = req.params;
  try {
  
    const [results] = await db.promise().query(`SELECT * FROM menu WHERE ItemID = ?`, [ItemID]);
    console.log('Query results:', results);
    if(results && results.length > 0){
      const menuItem = results[0];
      res.json({
        success: true, 
        message:"Successfully!",
        ItemID : menuItem.ItemID,
        ItemName: menuItem.ItemName,
        Decription: menuItem.Description,
        Price: menuItem.Price,
        ImageData :  menuItem.ImageData,
      });
    }
    else {
      res.status(404).json({ success: false, error: 'Menu item not found' });
    }
  } catch (err) {
    console.error('Error getting menu item by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
*/

const getMenuItemById = async (req, res) => {
  try {
    const { ItemID } = req.params;

    // Fetch a specific menu item by ID from the 'menu' table
    const [menuItem] = await db.promise().query('SELECT * FROM menu WHERE ItemID = ?', [ItemID]);

    if (menuItem.length === 0) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }

    res.status(200).json({
      success: true,
      menuItem: menuItem[0],
      ImageData: menuItem.imageData,
    });
  } catch (err) {
    console.error('Error fetching menu item by ID:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
// Update a menu item by ID
const updateMenuItem = async (req, res) => {
  try {
    const { ItemID } = req.params;
    const { ItemName, Description, Price } = req.body;

    // Fetch the current menu item data from the 'menu' table
    const [existingMenuItem] = await db.promise().query('SELECT * FROM menu WHERE ItemID = ?', [ItemID]);

    if (existingMenuItem.length === 0) {
      return res.status(404).json({ success: false, error: 'Menu item not found' });
    }

    // Use the existing image data if no new file is uploaded
    const imageData = req.file ? req.file.buffer : existingMenuItem[0].ImageData;

    // Update the 'menu' table with the new data
    await db.promise().query(
      'UPDATE menu SET ItemName = ?, Description = ?, Price = ?, ImageData = ? WHERE ItemID = ?',
      [ItemName, Description, Price, imageData, ItemID]
    );

    res.status(200).json({
      success: true,
      message: 'Menu item updated successfully',
    });
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
  const { ItemID } = req.params;
  console.log('ItemID', ItemID);

  try {
    const result = await db.promise().query(`DELETE FROM menu WHERE ItemID = ?`, [ItemID]);

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Menu item not found' });
    } else {
      res.json({ message: 'Menu item deleted successfully' });
    }
  } catch (err) {
    console.error('Error deleting menu item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  createMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
};
