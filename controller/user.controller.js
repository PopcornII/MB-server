const db = require('../config/db');
const bcrypt = require('bcrypt');

const createUser = async (username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.promise().query(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, role]
    );

    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Internal Server Error');
  }
};

const getAllUsers = async () => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM users');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Internal Server Error');
  }
};

const getUserById = async (userId) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM users WHERE user_id = ?', [userId]);
    return rows[0];
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw new Error('Internal Server Error');
  }
};

const updateUser = async (userId, username, email, password, role) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.promise().query(
      'UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE user_id = ?',
      [username, email, hashedPassword, role, userId]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Internal Server Error');
  }
};

const deleteUser = async (userId) => {
  try {
    const [result] = await db.promise().query('DELETE FROM users WHERE user_id = ?', [userId]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Internal Server Error');
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
