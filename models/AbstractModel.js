let uuid = require('node-uuid');
const Promise = require('bluebird')
const logule = require('logule')

module.exports = class AbstractModel {
  /**
   * Abstract CouchBase model
   * @param connector
   */
  constructor (connector) {
    this.connector = connector
  }

  /**
   * Fetch a document from CouchBase with ID of model
   * @param id
   * @param suffix
   * @return {Promise.<Map>}
   */
  findById (id, suffix = null) {
    return this.connector.get(id)
  }

  /**
   * Get collection of documents
   * @param ids
   * @param suffix
   * @return Collection of document
   */
  async findByMultipleId (ids, suffix = null) {
    let results = {}
    await Promise.map(ids, async (id) => {
      results[id] = await this.connector.get(id)
    });

    return results
  }

  /**
   * Create or update a object in CouchBase
   * @param id
   * @param data
   * @param options
   * @return {Promise}
   */
  save (id, data, options = {expiry: 0}) {
    return this.connector.save(id, data, options)
  }

  /**
   * Build couchbase key by adding prefix and sufix
   * @param id
   * @param suffix
   * @returns {*}
   * @private
   */
  _buildCbKey (id, suffix = null) {
    let key = id + ''
    if (key.substring(0, this.idPrefix.length) !== this.idPrefix) {
      key = this.idPrefix + key
    }

    if (suffix !== null) {
      key += suffix
    }

    return key
  }

  /**
   * Health check
   * @return {Promise}
   */
  async health () {
    const uid = uuid.v4()
    try {
      await this.save(uid, {id: uid, value: '42'}, {'expiry': 20})
      const result = await this.findById(uid)
      return ((result || {}).value || null) === '42'
    } catch (err) {
      logule.error(`Health error: ${err.message}`)
      return false
    }
  }
}
