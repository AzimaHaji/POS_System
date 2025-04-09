import * as Yup from "yup";

const ChangePasswordSchema = Yup.object().shape({
    txtEmail: Yup.string()
        .email("Invalid Email Format")
        .required("Required"),

    txtOld: Yup.string()
        .min(6, "Must be at least 6 Characters")
        .required("Required"),

    txtNew: Yup.string()
        .min(6, "Must be at least 6 Characters")
        .required("Required"),

    txtConfirm: Yup.string()
        .oneOf([Yup.ref("txtNew"), null], "Passwords Must Match")
        .required("Required"),
});

export default ChangePasswordSchema;
