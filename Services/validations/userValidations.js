import Joi from 'joi'

// Create User Validation
export const createUserValidate = async (args) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    phone: Joi.string(),
    profilePic: Joi.string()
  }).with('password', 'confirmPassword')

  const validation = schema.validate(args)

  return validation
}
