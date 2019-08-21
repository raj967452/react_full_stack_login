const isEmpty = require('is-empty');
const Validator = require('validator');

function validateLoginUser(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
  
    // check email id of user
    if(Validator.isEmpty(data.email)){
        errors.email = 'Email is required field';
    } else if(!Validator.isEmail(data.email)){
        errors.email = 'Email id is invalid';
    }

    // check password   
    if(Validator.isEmpty(data.password))
        errors.password = "Password field is required";

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginUser;