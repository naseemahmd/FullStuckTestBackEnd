import  Joi from 'joi'

// Create Post Validation
export const createPostValidate = async (args) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(5).required(),
    summeryParagraph: Joi.string().min(10),
    fullArtical: Joi.string(),
    dateOfPost: Joi.date()
  })

  const validation = schema.validate(args)

  return validation
}
