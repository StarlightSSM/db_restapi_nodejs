const express = require('express');
const multer = require('multer');
const { User, Profile } = require('../models'); // Adjust according to your ORM and models

const router = express.Router();

// 사용자와 프로필 정보를 가져오는 API
router.get('/myPage/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
      if (!user_id) {
          return res.status(400).json({ error: '사용자 ID가 필요합니다.' });
      }

      const user = await User.findByPk(user_id, {
          attributes: ['nickname', 'profile_picture']
      });

      const profile = await Profile.findOne({
          where: { user_id },
          attributes: ['intro', 'achievement_count']
      });

      if (!user || !profile) {
          return res.status(404).json({ error: '사용자 또는 프로필을 찾을 수 없습니다.' });
      }

      res.status(200).json({
          nickname: user.nickname,
          profile_picture: user.profile_picture,
          intro: profile.intro,
          achievement_count: profile.achievement_count
      });
  } catch (error) {
      console.error('Error fetching user and profile data:', error);
      res.status(500).json({ error: '데이터 조회 중 오류가 발생했습니다.' });
  }
});

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Append the file extension
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