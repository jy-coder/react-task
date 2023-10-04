export const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email'
    }
  },
  signUp: {
    email: {
      order: 1
    },
    password: {
      order: 3
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 4
    },
    name: {
      label: 'Name',
      placeholder: 'Enter your name',
      isRequired: false,
      order: 2
    }
  }
};
