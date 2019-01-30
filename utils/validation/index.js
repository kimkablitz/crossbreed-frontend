
const regexkey = {
    username: '',
    password: {
        capLetter: /[A-Z]/,
        lowLetter: /[a-z]/,
        special: /[ !*&#$%^@?]/
    },
    petname: /[^ 0-9a-z]+/i
};

export default {
    
    username: () => {

    },
    password: (input) => {
        const requirements = `Passwords must: 
    - be at least 8 characters long
    - have at least one uppercase and one lowercase letter
    - have a least one space or one of these special characters: 
    ! * & # $ % ^ @ ?`
        if(input.length < 8) {
            return {
                title: "Your password is too short. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.capLetter.test(input)) {
            return {
                title: "Your password needs an UPPERCASE letter. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.lowLetter.test(input)) {
            return {
                title: "Your password needs a lowercase letter. ", 
                message: requirements
            };
        }
        else if (!regexkey.password.special.test(input)) {
            return {
                title: "Your password needs a special character. ", 
                message: requirements
            };
        }
        else {
            return "Success"
        }
    },
    petname: (input) => {
        if(!input) {
            return "Your pet needs a name."
        }
        else if (input.length > 50) {
            return "Your pet's name cannot be longer than 50 characters."
        }
        else if (regexkey.petname.test(input)){
            return "You pet's name cannot include special characters."
        }
        else {
            return "Success"
        }
    }
} 