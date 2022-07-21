const scrollToBottom = () => {
    document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}

const renderMessages = ({messages}) => {
    const htmls = messages.map( message => {
        return(`
            <p class="text-white p-0 m-0"> > 
                <span class="fw-bold text-primary">
                    ${message.author.email}
                </span> 
                [<span class="text-danger">
                    ${new Date(message.date).toLocaleString()}
                </span>]: 
                <em class="text-success">
                    ${message.text}
                </em>
                <img class="mx-1 rounded-circle" 
                    width="35"
                    height="35"
                    src="${message.author.avatar}" 
                    alt="avatar"
                >
            </p>
            `);
    });

    const html = htmls.join(" ");

    document.getElementById('messages').innerHTML = html;
    scrollToBottom();
}


const addMessage = event => {
    event.preventDefault();

    const message = {
        author: {
            email: document.getElementById('email').value,
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            age: document.getElementById('age').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value,
        },
        text: document.getElementById('text').value
    };

    socket.emit('new-message', message);
    scrollToBottom();

    document.getElementById('text').value = '';

}

const formMessage = document.getElementById('form-message');

formMessage.addEventListener('submit', addMessage);

const authorSchema = new normalizr.schema.Entity('author', {}, { idAttribute: 'email' });

const messageSchema = new normalizr.schema.Entity('message',{
    author: authorSchema
},{ idAttribute: '_id' })

const messagesSchema = new normalizr.schema.Entity('messages',{
    messages: [messageSchema]
})

const compressionMessages = (normalize, denormalize) => {
    const longNormalize = JSON.stringify(denormalize).length
    const longDenormalize = JSON.stringify(normalize).length
    const compression = (longNormalize * 100 / longDenormalize).toFixed(0);
    const compressionHTML = document.querySelector('.compression');
    compressionHTML.innerHTML = compression;
}

socket.on('messages', data => {
    const denormalizedData = normalizr.denormalize(data.result, messagesSchema, data.entities);
    compressionMessages(data, denormalizedData);
    renderMessages(denormalizedData);
});

