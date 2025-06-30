const {body} = require('express-validator')
const { ERROR_MESSAGE } = require('../constants/error-message')

exports.validateUser = [
    body('id').isNumeric().withMessage(ERROR_MESSAGE.INVALID_USERID),
    body('name').isString().withMessage(ERROR_MESSAGE.NAME_IS_NOT_STRING)
                .isLength({min: 3}).withMessage(ERROR_MESSAGE.NAME_IS_INVALID)
]