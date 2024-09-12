const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sequelize 인스턴스 가져오기

// Wish 모델 정의
const Wish = sequelize.define(
  'Wish',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      values: ['job', 'health', 'human', 'money', 'goal', 'grade', 'etc'], // Enum 값 설정
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
    is_confirm: {
      type: DataTypes.ENUM,
      values: ['confirm', 'pending', 'reject'], // Enum 값 설정
      allowNull: false,
      defaultValue: 'pending',
    },
  },
  {
    // tableName: 'wishes', // 테이블 이름 지정
    timestamps: false, // 타임스탬프 비활성화 (createdAt, updatedAt)
  }
);

module.exports = { Wish };
