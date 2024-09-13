const express = require('express');
const sequelize = require('./db'); // Sequelize 인스턴스 가져오기
const Wish = require('./models/wish'); // Wish 모델 가져오기
const Comment = require('./models/comment'); // Comment 모델 가져오기
const wishRoutes = require('./routes/wishRoutes');
const commentRoutes = require('./routes/commentRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

const port = 3000;
// 모든 모델을 한 번에 동기화
sequelize
  .sync({ force: true }) // force: true는 기존 테이블을 삭제하고 다시 생성 (개발 시에만 사용)
  .then(() => {
    console.log('All tables created successfully');
    // 서버 시작
    app.listen(port, () => {
      console.log(`Server running on port${port}`);
    });
  })
  .catch((err) => {
    console.error('Error synchronizing the database:', err);
  });

// Swagger 설정
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // OpenAPI 버전
    info: {
      title: 'Wish API',
      version: '1.0.0',
      description: 'API documentation for the Wish list service',
      contact: {
        name: 'Developer',
        email: 'developer@example.com',
      },
      servers: [{ url: `http://localhost:${port}` }],
    },
  },
  apis: ['./controllers/*.js'], // API가 정의된 파일 경로
};

// SwaggerDocs 생성
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger UI 사용 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 라우트 설정
app.use('/wish', wishRoutes);
app.use('/comment', commentRoutes);
