let mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            minLength: 8
        },
    }
);

const User = mongoose.model('users', userSchema);
module.exports = User;

async function createUser(user) {
    return await new User(user).save();
}

async function getSingleUser(user) {
    return await User.findOne({email: user.email});
}

module.exports = createUser;
module.exports = getSingleUser;