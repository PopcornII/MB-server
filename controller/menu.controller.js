
const db = require('../config/db');

// Create a new menu item
const createMenuItem = async (req, res) => {
  try {
    const { ItemName, Description, Price} = req.body;
    const [rows] = await db.promise().query('INSERT INTO menu (ItemName, Description, Price) VALUES (?, ?, ?)', [ ItemName, Description, Price]);
    res.status(201).json({ 
        success: true,
        message: 'Menu item created successfully',
        lsit: rows
      });
    
    
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Get all menu items
const getAllMenuItems = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM menu');

    res.json(rows);
  } catch (err) {
    console.error('Error getting menu items:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific menu item by ID
const getMenuItemById = async (req, res) => {
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
        ImageURL :  menuItem.ImageURL,
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

// Update a menu item by ID
const updateMenuItem = async (req, res) => {
  const { ItemID, ItemName, Description, Price } = req.body;
  try {
    const [results] = await db.promise().query(
      `UPDATE menu SET ItemName = ?, Description = ?, Price = ? WHERE ItemID = ?`, 
      [ItemName, Description, Price, ItemID]);
    if (results.affectedRows > 0) {
      res.json({ 
        success: true, 
        message: 'Menu item updated successfully',
        list :results
      });
    } else {
      
      res.status(404).json({ success: false, message: 'Menu item not found' });
    }
  } catch (err) {
    console.error('Error updating menu item:', err);
    res.status(500).json({ error: 'Internal Server Error' });
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
