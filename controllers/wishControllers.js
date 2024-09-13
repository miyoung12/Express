const wishService = require('../service/wishService');

/**
 * @swagger
 * /wish:
 *   post:
 *     summary: Create a new wish
 *     description: Register a new wish with title, content, and category.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My New Wish"
 *               content:
 *                 type: string
 *                 example: "I wish for a new car."
 *               category:
 *                 type: string
 *                 example: "Personal"
 *     responses:
 *       201:
 *         description: Wish created successfully
 *       500:
 *         description: Internal server error
 */
async function createWish(req, res) {
  const { title, content, category } = req.body;
  try {
    const wish = await wishService.createWish({ title, content, category });
    res.status(201).json({ message: 'Wish created successfully', title: wish.title });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * @swagger
 * /wish/all:
 *   get:
 *     summary: Retrieve all wish
 *     description: Get a list of all wish with optional filters for confirmation, title, content, and category.
 *     parameters:
 *       - in: query
 *         name: is_confirm
 *         schema:
 *           type: string
 *           enum: [confirm, pending, reject]
 *         description: Filter by confirmation status.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of wish to return.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by title.
 *       - in: query
 *         name: content
 *         schema:
 *           type: string
 *         description: Filter by content.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ['job', 'health', 'human', 'money', 'goal', 'grade', 'etc']
 *         description: Filter by category.
 *     responses:
 *       200:
 *         description: A list of wish
 *       404:
 *         description: wish not found
 */
async function getAllWishes(req, res) {
  const is_confirm = req.query['is_confirm'];
  let limit = req.query['limit'];
  let page = req.query['page'];
  const title = req.query['title'];
  const content = req.query['content'];
  const category = req.query['category'];

  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 1;
  }
  try {
    const wish = await wishService.findAllWishes(is_confirm, limit, page, title, content, category);
    res.status(200).json({ wish: wish });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * @swagger
 * /wish:
 *   get:
 *     summary: Get a wish by ID
 *     description: Retrieve a specific wish by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the wish.
 *     responses:
 *       200:
 *         description: The details of the wish
 *       404:
 *         description: Wish not found
 */
async function getWish(req, res) {
  const id = req.query['id'];
  try {
    const wish = await wishService.findWishId(id);
    res.status(200).json({ wish: wish });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * @swagger
 * /wish:
 *   delete:
 *     summary: Delete a wish by ID
 *     description: Delete a specific wish by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the wish to delete.
 *     responses:
 *       200:
 *         description: Wish deleted successfully
 *       404:
 *         description: Wish not found
 */
async function deleteWish(req, res) {
  const id = req.query['id'];
  try {
    const wish = await wishService.deleteWish(id);
    res.status(200).json({ message: '삭제되었습니다.' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * @swagger
 * /wish:
 *   patch:
 *     summary: Update wish confirmation status
 *     description: Approve or reject a wish by updating its confirmation status.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the wish.
 *       - in: query
 *         name: is_confirm
 *         schema:
 *           type: string
 *           enum: [confirm, pending, reject]
 *         required: true
 *         description: Confirmation status (true for approved, false for rejected).
 *     responses:
 *       200:
 *         description: Wish confirmation status updated successfully
 *       404:
 *         description: Wish not found
 */
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
