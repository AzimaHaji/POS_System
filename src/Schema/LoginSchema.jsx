import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    txtEmail: Yup.string()
        .email('Invalid Email')
        .required('Required'),
    txtPasswrd: Yup.string()
        .min(6, 'Must be at least 6 Characters')
        .required('Required'),
});

export default LoginSchema;
