const Abstract = require('./Abstract')
const logule = require('logule').init(module)
const saveStore = require('fs')
// .createWriteStream(global.filePath)

module.exports = class test extends Abstract {
    constructor(container) {
        super(container)
        this.container = container;
        this.router.get('/test/:id', this.getById.bind(this))
        this.router.get('/test', this.message.bind(this))
        this.router.post('/test', this.save.bind(this))
    }

    getById(req, res) {
        const id = req.params.id;
        logule.warn(JSON.stringify([...this.container.storeModel]))
        try {
            const response = Object.assign(this.container.storeModel.get(id), {message: 'ok'})
            logule.warn(response)
            res.json(response)

        } catch (e) {
            logule.error(e.message);
            logule.error(`ID: ${id} is undefined`);
            res.json({status: 404, message: `${id} undefined`})
        }
    }

    message(req, res) {
        res.json({"Usage:": "/test/:id"})
    }

    save(req, res) {
        const { body, headers } = req
        if (!body || !body.id)  {
            logule.error(`ID: ${id} is undefined`);
            res.json({status: 404, message: `${id} undefined`})
        }
        const id = body.id.toString()
        body.id = body.id.toString()
        this.container.storeModel.set(id, body)
        logule.info(`ID: ${id} Recorded!`);
        res.json({ object: this.container.storeModel.get(id), id: id })
        
    }
}
