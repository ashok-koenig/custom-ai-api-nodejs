const {validationResult} = require('express-validator')
const { STATUS_CODE } = require('../constants/status-code')

exports.validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        // Return only first Error
        const firstError = errors.array()[0]
        return res.status(STATUS_CODE.BAD_REQUEST).json({firstError: {field: firstError.path, message: firstError.msg}})
        // Return all errors
        // return res.status(STATUS_CODE.BAD_REQUEST).json({errors: errors.array().map(err =>(
        //     {
        //         field: err.path,
        //         message: err.msg
        //     }
        // ))})
    }
    next()
}