const bCrypt = require('bcrypt');

const isValidPassword = async (user, password) => {
    return await bCrypt.compare(password, user.password);
}

const createHash = async (password) => {
    return await bCrypt.hash(password, await bCrypt.genSalt(10));
}

module.exports = {
    isValidPassword,
    createHash
}