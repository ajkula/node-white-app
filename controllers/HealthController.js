let AbstractController = require('./Abstract')

module.exports = class HealthController extends AbstractController {

  constructor(container) {
    super(container)

    this.targetingModel = this.get('targetingModel')
    this.msContext = this.get('msContext')

    // Load routes
    this.router.get('/health', this.checkHealth.bind(this))
  }

  /**
   * Check health
   * @param req
   * @param res
   */
  async checkHealth(req, res) {
    res.json({status:'UP'})
  }
}
