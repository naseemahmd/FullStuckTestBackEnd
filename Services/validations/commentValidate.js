import Joi from 'joi'

// Create Comment Validation
export const createCommnetValidate = async(args) => {
    const schema = Joi.object().keys({
        comment: Joi.string().min(5).required(),
        dateTime: Joi.date().min(2),
        userID: Joi.string().required(),
        postRef: Joi.string().required()
    })

    const validation = schema.validate(args)

    return validation


}