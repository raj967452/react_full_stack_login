const isEmpty = require('is-empty');
const validator = require('validator');

function validateRegisterUser(data){
    let errors = {};
    data.fullName = !isEmpty(data.fullName) ? data.fullName : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Check full name of user
    if(validator.isEmpty(data.fullName))
        errors.fullName = 'Full Name is required field';
    
    // check email id of user
    if(validator.isEmpty(data.email)){
        errors.email = 'Email is required field'
    } else if(!validator.isEmail(data.email)){
        errors.email = 'Email id is invalid'
    }

    // check password   
    if(!validator.isLength(data.password, {min:6, max: 30}))
        errors.password = "Password must be at least 6 charactors";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterUser;