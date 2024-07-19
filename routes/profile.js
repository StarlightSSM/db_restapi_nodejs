const express = require('express');
const multer = require('multer');
const path = require('path');
const { Profile, User } = require('../models'); // Adjust according to your ORM and models

const router = express.Router();

// Route to fetch profile by user email
router.get('/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      // Find user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const userId = user.id; // Adjust if your primary key is not 'id'
  
      // Find profile by user_id
      const profile = await Profile.findOne({ where: { userId } });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      res.json(profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage: storage });

router.put('/update/:user_id', upload.single('profile_picture'), async (req, res) => {
    const userId = req.params.user_id;
    const { nickname, intro } = req.body;
    const profilePicture = req.file ? req.file.path : null;
  
    try {
      // Check if the user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the profile exists
      const profile = await Profile.findOne({ where: { userId } });
      if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
      }
  
      // Update profile fields
      profile.nickname = nickname;
      profile.intro = intro;
      if (profilePicture) {
        profile.profile_picture = profilePicture;
      }
      await profile.save();
  
      res.json(profile);
    } catch (error) {
      console.error('Failed to update profile:', error);
      res.status(500).json({ error: 'Failed to update profile' });
    }
});

module.exports = router;