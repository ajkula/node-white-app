const express = require('express')
const RawBodyParser = require('./parserTest')
const test = require('./controllers/testController')
const bodyParser = require('body-parser')
const fs = require('fs')

module.exports = class Server {

    /**
     * Init Ms-Reco project
     */
    constructor () {
      this.container = {user: "greg"}
      this.app = express()
      this.app.use(bodyParser.json())
      // this.app.use(RawBodyParser)
      this.loadDBs()
      this.loadControllers()
      
    }

  /**
   * Connect to databases
   */
  async loadDBs () {
    // const dynamoConnector = new DynamoConnector('dbName', false)
    // this.container.campaignModel = new CampaignModel(dynamoConnector)
    this.container.storeModel = new Map()
    Object.entries(require('./store-mock.json')).forEach(([k, v]) => {
			this.container.storeModel.set(k, v)
    });
  }

    /**
   * Load Http controllers
   */
  loadControllers () {
    console.log(__dirname + '/controllers/')
    const files = fs.readdirSync(__dirname + '/controllers/')
    files.forEach((file) => {
      if (/Controller\.js/.test(file)) {
        const classCtrl = require(__dirname + '/controllers/' + file)
        this.app.use(new classCtrl(this.container).router)
      }
    })
  }
}