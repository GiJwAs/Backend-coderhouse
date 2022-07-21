const ContainerMongoDB = require('../../containers/ContainerMongoDB');

class MessagesMongoDB extends ContainerMongoDB{

    constructor(){
        super('messages',{
            author: {
                email: { type: String, required: true },
                firstName: { type: String, required: true },
                lastName: { type: String, required: true },
                age: { type: Number, required: true },
                alias: { type: String, required: true },
                avatar: { type: String, required: true }
            },
            text: { type: String, required: true },
            date: { type: Date, default: Date.now }
        });
    }

}

module.exports = MessagesMongoDB;