const db = require('../config/db');

// Create a new order item
const createOrderItem = async ({ OrderID, ItemID, Quantity, Subtotal, user_id }) => {
  try {
    const [result] = await db.promise().query('INSERT INTO orderitems (OrderID, ItemID, Quantity, Subtotal, user_id) VALUES (?, ?, ?, ?, ?)', [OrderID, ItemID, Quantity, Subtotal, user_id]);

    const newOrderItemId = result.insertId;
    const newOrderItem = { OrderItemID: newOrderItemId, OrderID, ItemID, Quantity, Subtotal, user_id };

    return newOrderItem;
  } catch (error) {
    console.error('Error creating order item:', error);
    throw new Error('Internal Server Error');
  }
};

// Get all order items for a specific order
const getOrderItemsByOrderId = async (orderId) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM orderitems WHERE OrderID = ?', [orderId]);
    return rows;
  } catch (error) {
    console.error('Error fetching order items:', error);
    throw new Error('Internal Server Error');
  }
};

// Get a specific order item by ID
const getOrderItemById = async (orderItemId) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM orderitems WHERE OrderItemID = ?', [orderItemId]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('Order item not found');
    }
  } catch (error) {
    console.error('Error fetching order item:', error);
    throw new Error('Internal Server Error');
  }
};

// Update an existing order item by ID
const updateOrderItemById = async (orderItemId, { OrderID, ItemID, Quantity, Subtotal, user_id }) => {
  try {
    const result = await db.promise().query('UPDATE orderitems SET OrderID = ?, ItemID = ?, Quantity = ?, Subtotal = ?, user_id = ? WHERE OrderItemID = ?', [OrderID, ItemID, Quantity, Subtotal, user_id, orderItemId]);

    if (result.affectedRows > 0) {
      return { message: 'Order item updated successfully' };
    } else {
      throw new Error('Order item not found');
    }
  } catch (error) {
    console.error('Error updating order item:', error);
    throw new Error('Internal Server Error');
  }
};

// Delete an order item by ID
const deleteOrderItemById = async (orderItemId) => {
  try {
    const result = await db.promise().query('DELETE FROM orderitems WHERE OrderItemID = ?', [orderItemId]);

    if (result.affectedRows > 0) {
      return { message: 'Order item deleted successfully' };
    } else {
      throw new Error('Order item not found');
    }
  } catch (error) {
    console.error('Error deleting order item:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  createOrderItem,
  getOrderItemsByOrderId,
  getOrderItemById,
  updateOrderItemById,
  deleteOrderItemById,
};
