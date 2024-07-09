const express = require('express');
const cors = require('cors');
const {sequelize, User, Profile, Challenge, ChallengeParticipants, ChallengeRecord } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/users', async(req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch users'});
    }
});

// app.get('/customers', async(req, res) => {
//     try {
//         const customers = await Profile.findAll();
//         res.json(customers);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch customers' });
//       }
// });

// app.get('/orders', async (req, res) => {
//     try {
//       const orders = await Order.findAll({
//         include: [Book, Customer]
//       });
//       res.json(orders);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    // await sequelize.sync({ force: true }); // 새로 초기화
    await sequelize.sync({ force: false }); // 데이터베이스 내용 유지
    console.log('Database synced');
  });