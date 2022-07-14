const fs = require("fs");
const { normalizeAndDenormalize } = require("../utils/normalizr");

class ApiChat {
  async writeChatToFile(message) {
    try {
      const messagesNormalized = normalizeAndDenormalize("normalize", message);

      await fs.promises.writeFile(
        "./data/chat.json",
        JSON.stringify(messagesNormalized)
      );
    } catch (err) {
      console.log("no se pudo escribir el archivo " + err);
    }
  }

  async readChatFromFile() {
    try {
      const message = await fs.promises.readFile("./data/chat.json");
      const messageList = JSON.parse(message);

      const messagesDenormalized = normalizeAndDenormalize("denormalize", messageList);
      
      return messagesDenormalized;
    } catch (err) {
      console.log("no se pudo leer el archivo " + err);
    }
  }
}

module.exports = ApiChat;
