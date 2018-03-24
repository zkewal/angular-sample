export class User {
    firstName: string;
    lastName: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthday: Date;
    username: string;
    password: string;
    imageSrc: string;
}

export const ValidationMessages: { [key: string]: any } = {
    'firstName': {
        'required': 'First Name is required.',
        'maxlength': 'First Name cannot be greater than 30.'
    },
    'lastName': {
        'required': 'Last Name is required.',
        'maxlength': 'Last Name cannot be greater than 30.'
    },
    'surname': {
        'required': 'Surname is required.',
        'maxlength': 'Surname cannot be greater than 30.'
    },
    'email': {
        'required': 'Email address is Required.',
        'email': 'Please enter a valid Email address.'
    },
    'phoneNumber': {
        'required': 'Phone Number is Required.',
        'pattern': 'Please enter a valid Phone Number.'
    },
    'address': {
        'required': 'Address is Required.',
        'maxlength': 'Address cannot be greater than 300.'
    },
    'birthday': {
        'required': 'Birthday is Required.',
        'maxDate': 'Birthday cannot be in future.'
    },
    'username': {
        'required': 'Username is Required.',
        'minlength': 'Username cannot be less than 3.',
        'maxlength': 'Username cannot be greater than 15.'
    },
    'password': {
        'required': 'Password is Required.',
        'minlength': 'Password cannot be less than 3.',
        'maxlength': 'Password cannot be greater than 15.'
    },
    'confirmPassword': {
        'required': 'Confirm Password is Required.',
        'equalTo': 'Not matching with Password.',
    },
    'imageSrc': {
        'required': 'Required.'
    },
    'signinUsername': {
        'required': 'Username is Required.'
    },
    'signinPassword': {
        'required': 'Password is Required.'
    }
};
