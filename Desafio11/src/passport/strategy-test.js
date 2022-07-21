const { Strategy: LocalStrategy } = require('passport-local');
const { isValidPassword, createHash } = require('../utils/bcrypt');

const users = [];

const loginStrategy = new LocalStrategy({ usernameField: 'email' },
    async (email, password, done) => {
    console.log({email, password});
    const isUserExist = users.find((data) => data.email === email);

    if (!isUserExist) {
        console.log('User Not Found with email');
        return done(null, false, { message: 'User Not Found with Email' });
    }

    const user = users.find(
        (data) => data.email === email
    );

    if( !await isValidPassword(user, password) ) {
                    console.log('Invalid Password');
                    return done(null, false, { message: 'Invalid Password' });
                }

    if (!user) {
        console.log('Invalid Password');
        return done(null, false, { message: 'Invalid Password' });
    }

    return done(null, user);
})

const signupStrategy = new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
    console.log({email, password});
    const isUserExist = users.find((data) => data.email === email);

    if (isUserExist) {
        console.log('User already exists');
        return done(null, false, { message: 'User already exists' });
    }

    const newUser = {
        email, 
        password: await createHash(password),
        id: (users.length !== 0) ? users[users.length - 1].id + 1 : 0
    }

    users.push(newUser);

    console.log({ users });

    return done(null, newUser);
})

const serializeUser = (user, done) => {
    done(null, user.id);
}

const deserializeUser = (id, done) => {
    const user = users.find((data) => data.id === id);
    done(null, user);
}

module.exports = {
    loginStrategy,
    signupStrategy,
    serializeUser,
    deserializeUser
}