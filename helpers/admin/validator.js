const { body, validationResult } = require('express-validator')
const crypto = require('./crypto')

module.exports = {
  loginValidationRules(){
    
    return [
      // username must be an email
      body('username').isLength({ min: 2 }),
      // password must be at least 5 chars long
      body('password').isLength({ min: 5 }),
    ]
  },
  decryptRequest(req, res, next) {
    req.body = crypto.decrypt(req.body)
    return next()
  },
  validate(req, res, next) {
   // req.body = crypto.decrypt(req.body)
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json(crypto.encrypt({
      errors: extractedErrors,
      //status: 405,
      //msg: "Invalid Request"
    }))
  }
}

