const { Strategy: LocalStrategy } = require('passport-local');

const { UsersDao } = require('../daos/index');
const { isValidPassword, createHash } = require('../utils/bcrypt');

const myUsers = new UsersDao();


const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email'
    },
    async (email, password, done ) => {
        try {
            console.log('Login:', {email, password});

            const [ user ] = await myUsers.readByEmail(email);

            console.log('Login', { user })

            if(!user) {
                console.log('User Not Found with Email', email);
                return done(null, false, { message: 'User Not Found with Email' });
            }

            if( !await isValidPassword(user, password) ) {
                console.log('Invalid Password');
                return done(null, false, { message: 'Invalid Password' });
            }

            return done(null, user);
        } catch (error) {
            done(error);
        }
})

const signupStrategy = new LocalStrategy({ 
        usernameField: 'email',
        passReqToCallback: true
    },
    async (req, email, password, done ) => {
        try {
            console.log('Signup:', {email, password});
            const [ user ] = await myUsers.readByEmail(email);

            if(user) {
                console.log('User already exists', user);
                return done(null, false, { message: 'User already exists' });
            }

            const newUser = {
                email,
                password: await createHash(password)
            }

            const userWithId = await myUsers.create(newUser);

            console.log({ userWithId })
            console.log('User Registration succesful');

            return done(null, userWithId);
        } catch (error) {
            done(error);
        }
});

const serializeUser = (user, done) => {
    done(null, user._id)
}

const deserializeUser = async (id, done) => {
    try {
        const user = await myUsers.readById(id);

        if (!user) {
            return done(new Error('User not found'));
        }

        done(null, user);
    } catch (error) {
        done(error);
    }
}

module.exports = {
    loginStrategy,
    signupStrategy,
    serializeUser,
    deserializeUser
}