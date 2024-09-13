const commentService = require('../service/commentService');

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     description: Add a comment for a specific wish.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "This is a comment."
 *               wish_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments for a specific wish
 *     description: Retrieve all comments related to a specific wish by its ID.
 *     parameters:
 *       - in: query
 *         name: wish_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the wish to retrieve comments for.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of comments to return.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination.
 *     responses:
 *       200:
 *         description: A list of comments
 *       404:
 *         description: Comments not found
 */
async function getComments(req, res) {
  const wishId = parseInt(req.query['wish_id']);
  let limit = req.query['limit'];
  let page = req.query['page'];
  if (!limit) {
    limit = 10;
  }
  if (!page) {
    page = 1;
  }
  try {
    console.log('wishId:', wishId);
    const comments = await commentService.findAllComment(wishId, limit, page);
    res.status(200).json({ comments: comments });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

/**
 * @swagger
 * /comment:
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a specific comment by its ID.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the comment to delete.
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */
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
