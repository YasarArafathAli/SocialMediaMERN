const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { SECRET_KEY } = require("../../congif");
const { UserInputError } = require('apollo-server');
const {validateRegisterInput , validateLoginInput} = require("../../util/validators")

const generateToken = (user) => {
    return jwt.sign({
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    
                }, SECRET_KEY, { expiresIn: "1h" })
}


module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "User Not Found";
                throw new UserInputError("User not found", {errors})
            }


            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.status(200).json({ msg: "Login success" })
                } else {
                    errors.general = "Wrong Credentials";
                    throw new UserInputError("Wrong Credentials", { errors });
                }

            })
           

            const token = generateToken(user)

            return {
                    ...user._doc,
                    id: user._id,
                    token
                }
       },
        async register(_,
            { registerInput: { username, email, password, confirmPassword } }) {
          // TODO:  Valifdate user data
        // make sure user doesnt already exist
        //  hash the password
        //  create auth token
            
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if (!valid) {
                throw new UserInputError('Errors', {errors})
            }
            const user = await User.findOne({ username });


            if (user) {
                throw new UserInputError("Username is taken", {
                    erroes: {
                        username: "This Username is Taken"
                    }
                })
            }
                passowrd = await bcrypt.hash(password, 12);
                const newUser = new User({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                });
                const res = await newUser.save();

            const token = generateToken(res);
                
                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
            
            
        }
    }
}