1. CORS : Cross-Origin Resource

- create MenuItem Class
- uses-permission android:name="android.permission.INTERNET"  internet permission

Table
profile_id	
user_id	
full_name	
bio	
avatar_url Var(255)

# == join Delete Tabel Data Row == // not work due contrain data FK with parent table error
DELETE FROM users, profiles
USING users
LEFT JOIN profiles ON users.user_id = profiles.user_id
WHERE users.user_id = ?;

# ==
/* `insertId` is a property of the result object returned by the
        MySQL query. It represents the auto-generated ID of the last
        inserted row in the database. In the code snippet,
        `userResults.insertId` is used to retrieve the ID of the newly
        inserted user in the `users` table. This ID is then used to insert corresponding data into the `profiles` table. */


// Update a profile by user ID
/**
 * The function `updateProfile` updates the full name and bio of a user's profile in a database.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes details such as the request method, headers, URL, and any
 * data sent in the request body.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It is typically used to send JSON data, HTML, or other types of responses. In this case, the
 * `res` object is used to send a JSON response with a success message indicating that
 */

 // Get a profile by user ID
/**
 * The function `getProfileByUserId` retrieves a user's profile information based on their user ID.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made by the client. It includes properties such as `params`, `query`, `body`, `headers`,
 * etc.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It contains methods and properties that allow you to control the response, such as
 * `res.json()` to send a JSON response, `res.status()` to set the status code of the response, and
 */


 # == 
 `// Your authentication middleware`
`const authenticate = (req, res, next) => {
  // Check if the user is authenticated (e.g., by verifying a token)
  // If authenticated, you might attach user information to the request
  // For example, req.user = { userId: 123, username: 'example' };
  // If not authenticated, you might respond with a 401 Unauthorized status
  // For simplicity, this example assumes authentication is done beforehand
  next();
}; `

// Your authorization middleware
const authorize = (req, res, next) => {
  // Check if the authenticated user has the necessary permissions
  // For example, you might check if req.user.userId matches the userId in the params
  // If authorized, proceed to the next middleware or route handler
  // If not authorized, respond with a 403 Forbidden status
  // For simplicity, this example assumes the user is authorized
  next();
};

// Your updateProfile route with authentication and authorization middleware
app.put('/updateProfile/:userId', authenticate, authorize, updateProfile);
`
# =====
  - delelete method => to seperate query DELETE due avoid constrain PK and FK table
  - req.body for Update & Delete method
  - req.params for getall or getOne user data
# ==== connect to mobile app
- use default `0.0.0.0` to able access network from client :${PORT}
- use the same network or wifi


# =======SQL command
-- If your table already exists
CREATE TABLE your_table_name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- other columns...
);

-- If you want to change an existing table
PRAGMA foreign_keys=off;
BEGIN TRANSACTION;

-- Create a new table with the desired schema
CREATE TABLE new_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    -- other columns...
);

-- Copy data from the old table to the new table
INSERT INTO new_table SELECT * FROM your_table_name;

-- Drop the old table
DROP TABLE your_table_name;

-- Rename the new table to the original table name
ALTER TABLE new_table RENAME TO your_table_name;

COMMIT;
PRAGMA foreign_keys=on; 

# ===
`params` => Request Body with Parameters, method search , query by name, id , ...
