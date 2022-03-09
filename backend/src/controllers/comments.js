const { query } = require("../config/conn");
const addComment = async (req, res, next) => {
  try {
    const { comment, isbn } = req.body;
    const userID = req.user.user_id;
    const sql = "INSERT INTO comment (user_id,comment,isbn) VALUES (?,?,?)";
    await query(sql, [userID, comment, isbn]);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
};

const getComments = async (req, res) => {
  try {
    const { isbn } = req.params;
    const sql = `SELECT comment.comment_id, comment.user_id, comment.comment, comment.created_date, 
              comment.likes, comment.amount_replies, user.username, comment.isbn 
              FROM comment INNER JOIN user 
              ON user.user_id = comment.user_id AND comment.isbn = ? ORDER BY created_date DESC;
`;
    const comments = await query(sql, [isbn]);
    res.json({ comments });
  } catch (error) {
    console.log(error);
  }
};

const addLike = async (req, res) => {
  try {
    const { commentID, isbn } = req.body;
    const userID = req.user.user_id;
    const sql = "INSERT INTO comments_likes (comment_id,user_id,isbn) VALUES (?,?,?)";
    await query(sql, [commentID, userID, isbn]);
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

const getCommentsLikes = async (req, res) => {
  try {
    const { commentID } = req.params;
    const userID = req.user.user_id;
    const sql = "SELECT COUNT(comment_id) FROM comments_likes WHERE comment_id = ?";
    const data = await query(sql, [commentID]);
    const likes = data[0]["COUNT(comment_id)"];
    res.json({ likes });
  } catch (error) {}
};

module.exports = { addComment, getComments, addLike, getCommentsLikes };
