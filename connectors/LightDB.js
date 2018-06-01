const async = require('async')
const logule = require('logule').init(module)

module.exports = class DB {
  
  constructor() {
    this.idCount = 0
    this.db = new Map()
    this.index = require('./indexDB.json') || {};
    Object.entries(require('./store-mock.json')).forEach(([k, v]) => {
      this.db.set(k, v)
      this.idCount++
    });
    this.db.forEach(this.mapElements)
    const Q = async.queue(this.chain, 1)
    Q.drain = () => { logule.info('DB READY') }
  }

  chain(task, callback) {
    // ensure no requests concurrencie
    logule.warn(task)
    return callback()
  }

  get(id) {
    return this.db.get(id) || null
  }
  upsert(data, id = null) {
    if (id && data) {
      this.db.set(id, data)
    } else {
      if ((data).id) {
      this.db.set(data.id, data)
      } else {
        // créer l'ID et l'attr à data
        
      }
    }
  }

  freeId() {
    // boucle de 0 à Math.max(id)
      // verifie la présence de item dans l'interval id/object de this.db
        // retourne le 1er num absent
  }

  indexCreate(tag) {
    if (((this.index)[tag] || {}).ids || []) {
      this.db.forEach(item => {
        if (item.find(object => { return Object.values(object).indexOf(tag) })) { // callback return les correspondances :Boolean
            this.index[tab].ids.push('toutes les ids corr.')
        }
      })
    }
  }

  mapElements(val, key, map) {
    logule.info(`m[${key}] = ${value}`);
  }
}