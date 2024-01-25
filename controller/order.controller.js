const db = require('../config/db');

// Create a new order
const createOrder = async ({ CustomerName, TotalAmount, user_id }) => {
  try {
    const [result] = await db.promise().query('INSERT INTO orders (CustomerName, TotalAmount, user_id) VALUES (?, ?, ?)', [CustomerName, TotalAmount, user_id]);

    const newOrderId = result.insertId;
    const newOrder = { OrderID: newOrderId, CustomerName, TotalAmount, user_id, OrderDate: new Date() };

    return newOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Internal Server Error');
  }
};

// Get all orders
const getAllOrders = async () => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM orders');
    return rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Internal Server Error');
  }
};

// Get a specific order by ID
const getOrderById = async (orderId) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM orders WHERE OrderID = ?', [orderId]);

    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Internal Server Error');
  }
};

// Update an existing order by ID
const updateOrderById = async (orderId, { CustomerName, TotalAmount, user_id }) => {
  try {
    const result = await db.promise().query('UPDATE orders SET CustomerName = ?, TotalAmount = ?, user_id = ? WHERE OrderID = ?', [CustomerName, TotalAmount, user_id, orderId]);

    if (result.affectedRows > 0) {
      return { message: 'Order updated successfully' };
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Internal Server Error');
  }
};

// Delete an order by ID
const deleteOrderById = async (orderId) => {
  try {
    const result = await db.promise().query('DELETE FROM orders WHERE OrderID = ?', [orderId]);

    if (result.affectedRows > 0) {
      return { message: 'Order deleted successfully' };
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
};
