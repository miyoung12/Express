const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Sequelize 인스턴스 가져오기
const { Wish } = require('./wish');

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
    wish_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Wish,
        key: 'id',
      },
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

// Comment 모델을 Wish 모델과 연결 (다대일 관계)
Wish.hasMany(Comment, { foreignKey: 'wish_id', onDelete: 'CASCADE' });
Comment.belongsTo(Wish, { foreignKey: 'wish_id' });

module.exports = { Comment };
