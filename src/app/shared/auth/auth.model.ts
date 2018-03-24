export class User {
    id: number;
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
        'required': 'Required.',
        'maxLength': '>30'
    },
    'lastName': {
        'required': 'Required.',
        'maxLength': '>30'
    },
    'surname': {
        'required': 'Required.',
        'maxLength': '>30'
    },
    'email': {
        'required': 'Required.',
        'email': 'valid email.'
    },
    'phoneNumber': {
        'required': 'Required.',
        'maxLength': '>13',
        'pattern': 'pattern match'
    },
    'address': {
        'required': 'Required.',
        'maxLength': '>300'
    },
    'birthday': {
        'required': 'Required.',
    },
    'username': {
        'required': 'Required.',
        'minLength': '<3',
        'maxLength': '>15'
    },
    'password': {
        'required': 'Required.',
        'minLength': '<3',
        'maxLength': '>15'
    },
    'confirmPassword': {
        'equalTo': 'Not matching.',
    },
};
