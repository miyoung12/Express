const wishService = require('../service/wishService');

// 소원 등록
async function createWish(req, res) {
  const { title, content, category } = req.body;
  try {
    const wish = await wishService.createWish({ title, content, category });
    res.status(201).json({ message: 'Wish created successfully', title: wish.title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//소원 목록 조회
async function getAllWishes(req, res) {
  //승인, 미승인 별로 조회(쿼리 파라미터)
  const is_confirm = req.query['is_confirm'];
  console.log(is_confirm);
  try {
    const wishes = await wishService.findAllWishes(is_confirm);
    res.status(200).json({ wishes: wishes });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//소원 단일 조회
async function getWish(req, res) {
  const id = req.query['id'];
  try {
    const wish = await wishService.findWishId(id);
    res.status(200).json({ wish: wish });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//소원 삭제
async function deleteWish(req, res) {
  const id = req.query['id'];
  try {
    const wish = await wishService.deleteWish(id);
    res.status(200).json({ message: '삭제되었습니다.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

//소원 승인/거절
async function updateWish(req, res) {
  const id = req.query['id'];
  const confirm = req.query['is_confirm'];
  try {
    const wish = await wishService.updateWishConfirm(id, confirm);
    res.status(200).json({ message: '승인/거절되었습니다.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

module.exports = {
  createWish,
  getAllWishes,
  getWish,
  deleteWish,
  updateWish,
};
