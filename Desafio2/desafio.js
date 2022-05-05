const fs = require('fs')

class Contenedor {
    constructor(name) {
        this.fileName = name
        this.countID = 0
        this.content = []
    }

    async write() { 
        await fs.promises.writeFile(this.fileName, JSON.stringify(this.content))
    }

    save(object) {
        this.countID++ 
        object["id"] = this.countID
        this.content.push(object) 
        this.write() 
        return `El id del objeto añadido es ${this.countID}` 
    }

    async getAll() { 
        return this.content
    }

    getById(id) { 
        let result
        if (this.content !== []) {
            result = this.content.find(x => x.id === id)
            if (result === undefined) {
                result = null
            }
        } else {
            result = 'El archivo está vacío'
        }
        return result
    }

    deleteById(id) { 
        let result
        if (this.content !== []) {
            let newContent = this.content.filter(x => x.id !== id)
            this.content = newContent
            this.write() 
            result = 'OK'
        } else {
            result = `El archivo está vacío`
        }
        return result
    }

    async deleteAll() {
        this.content = this.content.splice(0, this.content.length)
        this.write()
    }
}

module.exports = Contenedor