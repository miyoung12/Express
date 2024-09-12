const commentService = require('../service/commentService');

// 댓글 등록
async function createComment(req, res) {
  const { content, wish_id } = req.body;
  console.log('Received wish_id:', wish_id);
  try {
    const comment = await commentService.createComment({ content, wish_id });
    res.status(201).json({ message: 'Comment created successfully', comment: comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//댓글 조회
async function getComments(req, res) {
  //   const wishId = req.query['wish_id'];
  //   const parsedWishId = parseInt(wishId);
  const wishId = parseInt(req.query['wish_id']);
  try {
    console.log('wishId:', wishId);
    const comments = await commentService.findAllComment(wishId);
    res.status(200).json({ comments: comments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//댓글 삭제
async function deleteComment(req, res) {
  const id = req.query['id'];
  try {
    console.log('id:', id);
    const comments = await commentService.deleteComment(id);
    res.status(200).json({ message: '삭제되었습니다.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createComment,
  getComments,
  deleteComment,
};
