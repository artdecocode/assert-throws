export default class Context {
  /**
   * @param {function} throws Throws function.
   * @param {object} config Config to throws.
   * @param {(err: Error)} assertion An assertion function on the error.
   */
  async assertThrows(throws, config, assertion) {
    const t = new Error('Should have thrown.')
    try {
      await throws(config)
      throw t
    } catch (err) {
      if (err === t) throw t
      assertion(err)
    }
  }
  get fn() {
    const fn = async () => {
      await new Promise((r, j) => {
        setTimeout(() => {
          j(this.error)
        })
      })
    }
    return fn
  }
  get message() {
    return 'Test error.'
  }
  get messageRegExp() {
    return /Test error\./
  }
  get error() {
    const e = new Error(this.message)
    e.code = this.code
    return e
  }
  get code() {
    return 'ENOTEST'
  }
  get codeRegExp() {
    return /ENOTEST/
  }
}