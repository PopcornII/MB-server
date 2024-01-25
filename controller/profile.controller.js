
const db = require('../config/db');
// Get all profiles
const getAllProfiles = async (req, res) => {
  try {
    const [allProfile] = await db.promise().query(`
    SELECT users.email, users.username, profiles.user_id, profiles.full_name, profiles.bio, profiles.avatar_url 
    FROM profiles 
    LEFT JOIN users 
    ON profiles.user_id = users.user_id `);
    
    res.json({
      status: true, 
      message: "Successfully Display User.",
      list: allProfile,
    });
  } catch (error) {
    console.error('Error fetching all profiles:', error);
    throw new Error('Internal Server Error');
  }
};

// Get a profile by user ID
const getProfileByUserId = async (req, res) => {
    const {userId} = req.params;
    try {
      const [results] = await db.promise().query(`
      SELECT *, users.username, users.email 
      FROM profiles 
      LEFT JOIN users 
      ON profiles.user_id = users.user_id
      WHERE users.user_id = ? `, [userId]);
      
      if (results.length > 0) {
        const profile = results[0];
        res.json({
          status: true, 
          message: "Successfully Display User.",
          user_id: profile.user_id,
          username:profile.username,
          full_name: profile.full_name,
          email:profile.email,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
        });
      } else {
        res.status(404).json({ status: false, error: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
// Update a profile by user ID
const updateProfile = async (req, res) => {
  const { user_id, full_name, bio, email, username} = req.body; // user body request to update
  
  try {
    
    const [getUserUpdate] = await db.promise().query(`
    SELECT profiles.full_name, profiles.bio, users.username, users.email 
    FROM profiles 
    LEFT JOIN users 
    ON profiles.user_id = users.user_id
    WHERE users.user_id = ? `, [user_id]);
    if(getUserUpdate){

      const [results] = await db.promise().query(
        `UPDATE profiles
        LEFT JOIN users ON profiles.user_id = users.user_id
        SET profiles.full_name = ?, profiles.bio = ?, users.email = ?, users.username =?
        WHERE users.user_id = ?`,
        [full_name, bio, email,username,user_id]); 

        if (results.affectedRows > 0) {
          res.json({
            
            status:true ,message: results.affectedRows ? 'Profile updated successfully' : "Something went wrong!",
            list: results
          });
        } else {
          res.status(404).json({ status: false, error: 'Profile not found' });
        }
    }
    
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        error: true,
        message: 'Internal Server Error',
      });
  }

}
const uploadProfileImage = async(req, res) =>{
  try{

  }catch (err){

  }
}

// Delete a profile
const deleteProfile = async (req, res) => {
  try {
    const { userId } = req.body; // use body to request delete due to join table constrain
    const [profileResults] = await db.promise().query('DELETE FROM profiles WHERE user_id = ?',[userId]);
    const [userResults] = await db.promise().query('DELETE FROM users WHERE user_id = ?',[userId]);
    if (profileResults.affectedRows > 0 && userResults.affectedRows > 0) {
      res.json({ success: true, message: 'User and profile deleted successfully' });
    } else if(!profileResults.affectedRows > 0 && userResults.affectedRows > 0){
      res.json({success: true, message: "User Deleted Successfully!"});
    }
    else {
      res.json({ success: false, message: 'User or profile not found' });
    }
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllProfiles,
  getProfileByUserId,
  updateProfile,
  deleteProfile,
};
