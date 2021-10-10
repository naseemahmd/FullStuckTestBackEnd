import User from '../Modules/User.js'
import { createUserValidate } from './validations/userValidations.js'
import { hash } from 'bcrypt'

//Get All User
export const getAllUsers = async() => {
    try {
        const users = await User.find()

        return { responce: users, error: null }
    } catch (error) {
        return { responce: null, error: error }
    }
}

//Create User
export const createUser = async(args) => {
    try {
        //Validations
        const { error } = await createUserValidate(args)

        if (!error) {

            //Email Check
            const userCheck = await User.find({ email: args.email })
            if (userCheck.length === 0) {
                //Password to hash
                const hashedPassword = await hash(args.password, 12)

                //User Model
                const user = new User({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    password: hashedPassword,
                    phone: args.phone,
                    profilePic: args.profilePic
                })
                const result = await user.save()

                return { responce: result, error: null }
            } else {
                return { responce: null, error: 'User Already Exist' }
            }
        } else {
            return { responce: null, error: error }
        }
    } catch (error) {
        return { responce: null, error: error }
    }
}