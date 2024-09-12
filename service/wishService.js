const { Wish } = require('../models/wish');

//소원 등록
async function createWish(wishData) {
  try {
    return await Wish.create(wishData);
  } catch (error) {
    console.error('Error creating wish:', error);
    throw error;
  }
}

//소원 목록 조회
async function findAllWishes(confirm) {
  return await Wish.findAll({
    where: { is_confirm: confirm, is_deleted: false },
    order: [['created_at', 'DESC']], //생성된 날짜 순으로 정렬
  });
}

//소원 단일 조회
async function findWishId(id) {
  const wish = await Wish.findOne({
    where: { id: id, is_confirm: 'confirm', is_deleted: false },
  });
  return wish;
}

//소원 삭제
async function deleteWish(id) {
  const wish = await Wish.update(
    //soft delete로 구현
    { is_deleted: true }, //false -> true
    {
      where: { id: id },
    }
  );
}

//소원 승인/거절
async function updateWishConfirm(id, confirm) {
  const wish = await Wish.update(
    { is_confirm: confirm }, //보류됨 상태를 승인/거절로
    {
      where: { id: id, is_confirm: 'pending' },
    }
  );
}

module.exports = {
  createWish,
  findAllWishes,
  findWishId,
  deleteWish,
  updateWishConfirm,
};
