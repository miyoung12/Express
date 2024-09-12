const express = require('express');
const port = 3000;
const { Wish } = require('./models/wish');
const wishRoutes = require('./routes/wishRoutes');

const app = express();
app.use(express.json());

Wish.sync({ force: true })
  .then(() => {
    console.log('Wish table created');
  })
  .catch((err) => console.error(err));

// 라우트 설정
app.use('/wish', wishRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
