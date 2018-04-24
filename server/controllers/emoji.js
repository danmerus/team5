const db = require('../libs/dbHelper');

module.exports.getRecentEmoji = async (req, res) => {
    try {
        const emoji = await db.get(`emoji_${req.user.username}`);
        res.json(emoji);
    } catch (e) {
        res.json([]);
    }
};

module.exports.updateRecentEmoji = async (req, res) => {
    const recentEmoji = req.body.recentEmoji;
    await db.put(`emoji_${req.user.username}`, JSON.stringify(recentEmoji));
    res.sendStatus(200);
};
