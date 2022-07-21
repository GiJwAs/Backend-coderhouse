const ContainerSQL = require('../../containers/ContainerSQL');

const sqlite3 = require('../../options/sqlite3');

const messages = new ContainerSQL(sqlite3, 'messages');

const getMessages = async () => {
    const data = await messages.selectAll();
    return data;
};

const saveMessages = async message => {
    await messages.insertTable(message);
};

module.exports = {
    getMessages,
    saveMessages
};

