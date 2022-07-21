const ContainerMongoDB = require('../../containers/ContainerMongoDB');

class UsersMongoDB extends ContainerMongoDB{

    constructor(){
        super('users',{
            email: { type: String, required: true },
            password: { type: String, required: true }
        });
    }

}

module.exports = UsersMongoDB;