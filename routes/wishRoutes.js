const express = require('express');
const router = express.Router();
const wishController = require('../controllers/wishControllers');

router.post('/', wishController.createWish); // 소원 등록
router.get('/all', wishController.getAllWishes); // 소원 목록 조회
router.get('/', wishController.getWish); // 소원 단일 조회
router.delete('/', wishController.deleteWish); // 소원 삭제
router.patch('/', wishController.updateWish); // 소원 승인/거절

module.exports = router;
