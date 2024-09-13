const { Comment } = require('../models/comment');

//댓글 등록
async function createComment(commentData) {
  try {
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
