const { formatApolloErrors } = require("apollo-server-errors");

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = 'Username Must not be empty';
    }
    if (email.trim() === "") {
        errors.email = 'Email Must not be empty';
    }
    else {
        const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!email.match(regEx)) {
            errors.email = "Email Mush have a valid email address"
        }
    }
    if (password === "") {
        errors.password = 'password Must not be empty';
    }
    else if (password !== confirmPassword) {
        errors.password = 'password Must be same';
    }

    return {
        errors,
        valid :Object.keys(errors).length < 1
    }
}


module.exports.validateLoginInput = (
    username,
    email,
    password,
    confirmPassword
) => {
     const errors = {};
    if (username.trim() === "") {
        errors.username = 'Username Must not be empty';
    }

    if (password === "") {
        errors.password = 'password Must not be empty';
    }
    

    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
}