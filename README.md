# =================Sprint 1============ start 15-Jan-24 end 21-Jan-24
    1. login flow
    2. sign up flow done
    3. add new menu 
       1. user db
   # ===============================
        CREATE TABLE profiles (
        profile_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT UNIQUE,
        full_name VARCHAR(255),
        bio TEXT,
        avatar_url VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        );

        -------------------------


       2. Menu DB
   # =====================Menu DB =======================================
         --- Table for Menu Items
            CREATE TABLE Menu (
                ItemID INT PRIMARY KEY,
                ItemName VARCHAR(255) NOT NULL,
                Description TEXT,
                Price DECIMAL(10, 2) NOT NULL,
                ImageURL VARCHAR(255)
            );

            -- Table for Orders
            CREATE TABLE Orders (
                OrderID INT PRIMARY KEY,
                CustomerName VARCHAR(255) NOT NULL,
                OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                TotalAmount DECIMAL(10, 2) NOT NULL
            );

            -- Table for Order Items
            CREATE TABLE OrderItems (
                OrderItemID INT PRIMARY KEY,
                OrderID INT,
                ItemID INT,
                Quantity INT,
                Subtotal DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
                FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
            );
# =========================================================================

# ============ revise code structure ====================
    1. controller
       1. login (sign up ->'done', user login -> 'done' with role client & admin `done` ) completed
       2. Menu (create, getall, getlist,delete) upload image
#  =========================================================
CREATE TABLE profile (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    full_name VARCHAR(255) NOT NULL,
    bio TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

# =======  handle user profile ==========
 -  Menu (create, getall, getlist,update, delete) upload image
 -  User (create, getall, getlist,update, delete)
 1. handle getallprofile =>  completed.
 2. handle getprofilebyID => completed.
 3. Fixed "Internal Server Error" of SignUp  => completed => handle update DB profiles after SingUp => completed
 4. handle delete profile => completed, bug => fixed completed
 5. handle (upload, delele) profileImage => not yet do
 6. handle create user => implement in Sign-Up
 7. handle update user profile => doing + fixed => completed

# ==== Sprint 2 ===== start 22-Jan-24 end 28-Jan-24
 - handle Menu create => error while insertId into DB => fixed
 - handle Menu update => not yet => complete
 - handle menu getall => complete => complete
 - handle menu getOne => error => complete
 - handle meny delete => error => complete
# ===
note * orderitems_ibfk_2 -> itemID PK men

# ==== continue to mobile app development and compete homework tmr and laravel project

# == upload image

