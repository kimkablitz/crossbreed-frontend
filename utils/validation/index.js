
const regexkey = {
    username: '',
    password: '',
    petname: /[^ 0-9a-z]+/i
};

export default {
    
    username: () => {

    },
    password: () => {

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