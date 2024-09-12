const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sequelize 인스턴스 가져오기

// Comment 모델 정의
const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    // tableName: 'wishes', // 테이블 이름 지정
    timestamps: false, // 타임스탬프 비활성화 (createdAt, updatedAt)
  }
);

module.exports = { Comment };
