const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function (props) {
                return `${props.value} is not a valid email address!`;
            }
        },
        required: [true, 'E-mail address should be filled up!'],
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({ _id: user._id.toHexString(), access }, 'secret18').toString();

    user.tokens = user.tokens.concat({ access, token });
    return user.save()
        .then(() => {
            return token;
        });
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};