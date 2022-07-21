const { normalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });

const messageSchema = new schema.Entity('message',{
    author: authorSchema
},{ idAttribute: '_id' })

const messagesSchema = new schema.Entity('messages',{
    messages: [messageSchema]
})

const normalizeMessages = messages => normalize({id: 'messages', messages}, messagesSchema);

module.exports = { normalizeMessages };