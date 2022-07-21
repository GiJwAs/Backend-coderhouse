const { Router } = require('express');
const passport = require('passport');

const { isAuthWeb, isUserLogged } = require('../../utils/auth');

const authWebRouter = Router();


authWebRouter.get('/', isUserLogged, (req, res) => {
    res.redirect('/login');
});

authWebRouter.get('/login', isUserLogged, (req, res) => {
    res.render('pages/login');
});

authWebRouter.get('/signup', isUserLogged, (req, res) => {
    res.render('pages/signup');
});

authWebRouter.get('/faillogin', isUserLogged, (req, res) => {
    res.render('pages/fail', { error: { authenticate: 'login' } })
});

authWebRouter.get('/failsignup', isUserLogged, (req, res) => {
    res.render('pages/fail', { error: { authenticate: 'signup' } })
});

authWebRouter.post('/login', passport.authenticate('login', { successRedirect: '/home', failureRedirect: '/faillogin' }));

authWebRouter.post('/signup', passport.authenticate('signup', { successRedirect: '/home', failureRedirect: '/failsignup' }));

authWebRouter.get('/logout', isAuthWeb, (req, res) => {
    req.logout();
    
    req.session.destroy((err) => {
        if (err) return res.json({ error: err });

        res.redirect('/login');
    })
});

module.exports = authWebRouter;
