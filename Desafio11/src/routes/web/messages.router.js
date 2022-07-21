const { Router } = require('express');

const messagesRouter = Router();

messagesRouter.get('/', (req, res) => {
    res.render('pages/messages');
})

module.exports = messagesRouter;