const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentControllers');

router.post('/', commentController.createComment); // 댓글 등록
router.get('/', commentController.getComments); // 댓글 조회
router.delete('/', commentController.deleteComment); // 댓글 삭제

module.exports = router;
