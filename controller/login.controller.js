// login.controller.js

const db = require('../config/db');
const { signToken } = require('../middleware/auth');
const bcrypt = require('bcrypt');




const login = async (req, res, next) =>{
    // successful login log
    const { username, password} = req.body;

    console.log('Received login request:', req.body); 

    try {
        // Use promise-based query to get user from the database
        const results = await db.promise().query('SELECT * FROM users WHERE username = ?', [username]);
    

        if (results[0] && results[0].length > 0) {
            const user = results[0][0]; 
            const passwordMatch = await bcrypt.compare(password, user.password);    
            if (passwordMatch) {                
                const token = signToken(user);
                console.log('Toke: ', token);
                res.json({ token, userRole: user.role, userId : user.user_id, username: user.username});
    
            } else {
                console.log('Login failed: Password incorrect!');
                res.status(401).json({ error: 'Invalid credentials' });
            }
           

            
        } else {
            console.log('Login failed: User not found!');
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const logout = async (req, res) =>{
    // Clear the token from the client
    try{

    }catch(err){
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Logout successful' });
}
const signUp = async(req, res) => {
   
    const { username, email, password, confirmPassword } = req.body;
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    
    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const dbUsername = await db.promise().query(`SELECT username FROM users WHERE username = ?`)
        const [userResults] = await db.promise().query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
        const userId = userResults.insertId;
        await db.promise().query(`
        INSERT INTO profiles (user_id, full_name, bio, avatar_url) 
        VALUES (?, ?, ?, ?)`, [userId, , , ,]);
        const user = { user_id: userId, username, role: 'client' };
        const token = signToken(user);
        if(userResults.username === dbUsername > 0){
            console.log("Duplicated Username");
            res.json({ message: "username already exist"})

        }else{
            res.json({ message: 'Signup successful', token, user });

        }
          
      } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports ={
    login,
    logout,
    signUp,
}