const express = require('express');
const router = express.Router();
const multer = require('multer'); //파일처리를 위한 multer 미들웨어 
const path = require('path');
const { Profile } = require('../models');

//파일 업로드를 위한 multer설정

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // 파일이 저장될 경로 설정
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + ext); // 파일 이름 설정 (여기서는 시간 기반으로 설정)
    }
  });
  
const upload = multer({ storage: storage });

router.route('/profiles')
    .get(async (req,res) => { 
        try {
            const profiles = await Profile.findAll(); 
            res.json(profiles); 
        } catch (error) { //오류
            res.status(500).json({ error: 'Failed to fetch profiles'}); 
        }
    })


    .post(upload.single('profile_picture'), async (req, res) => {
        try {
          const { nickname, intro, profile_picture } = req.body;
          const profile = await Profile.create({ 
            nickname, 
            intro, 
            profile_picture: req.file ? req.file.path : null 
          });
          res.status(201).json(profile);
        } catch (error) {
          console.error("Failed to create profile:", error);
          res.status(500).json({ error: 'Failed to create profile' });
        }
      });
    
// 특정 profile_id에 대한 GET 요청 
router.get('/:profile_id', async (req, res) => {
    try {
        const profile = await Profile.findByPk(req.params.profile_id);
        if (profile) {
            res.json(profile);
        } else {
            res.status(404).json({ error: '프로필을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error("Failed to fetch profile:", error);
        res.status(500).json({ error: '프로필을 가져오는 데 실패했습니다.' });
    }
});


module.exports = router;