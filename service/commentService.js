const { Comment } = require('../models/comment');
const { Wish } = require('../models/wish');

//댓글 등록
async function createComment(commentData) {
  try {
    // 1. 주어진 wish_id에 해당하는 wish가 있는지 확인
    const wish = await Wish.findOne({
      where: { id: commentData.wish_id, is_deleted: false, is_confirm: 'confirm' },
    });

    // 2. 해당 wish가 없거나 삭제된 경우 오류 반환
    if (!wish) {
      throw new Error('Wish not found or has been deleted.');
    }

    // 3. wish가 삭제되지 않았으면 댓글 생성
    return await Comment.create(commentData);
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
}

//댓글 조회
async function findAllComment(wishId, limit, page) {
  const offset = (page - 1) * limit;
  try {
    return await Comment.findAll({ where: { wish_id: wishId, is_deleted: false }, limit: limit, offset: offset });
  } catch (error) {
    console.error('Error creating comments:', error);
    throw error;
  }
}

//댓글 삭제
async function deleteComment(id) {
  const comment = await Comment.update(
    { is_deleted: true }, //false -> true
    {
      where: { id: id },
    }
  );
  return comment;
}

module.exports = {
  createComment,
  findAllComment,
  deleteComment,
};
