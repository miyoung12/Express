const express = require('express');
const sequelize = require('./db'); // Sequelize 인스턴스 가져오기
const Wish = require('./models/wish'); // Wish 모델 가져오기
const Comment = require('./models/comment'); // Comment 모델 가져오기
const wishRoutes = require('./routes/wishRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();
app.use(express.json());

// 모든 모델을 한 번에 동기화
sequelize
  .sync({ force: true }) // force: true는 기존 테이블을 삭제하고 다시 생성 (개발 시에만 사용)
  .then(() => {
    console.log('All tables created successfully');
    // 서버 시작
    const port = 3000;
    app.listen(3000, () => {
      console.log(`Server running on port${port}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

// 라우트 설정
app.use('/wish', wishRoutes);
app.use('/comment', commentRoutes);
