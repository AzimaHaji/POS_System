import * as Yup from "yup";

const ChangeProfileSchema = Yup.object().shape({
    txtF_Name: Yup.string()
        .required("Required"),

    txtU_Name: Yup.string()
        .required("Required"),

    txtEmail: Yup.string()
        .email("Invalid Email Format")
        .required("Required"),

    txtContactNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact No must be exactly 10 digits")
        .required("Required"),
});

export default ChangeProfileSchema;
