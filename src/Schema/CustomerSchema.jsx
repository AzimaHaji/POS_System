import * as Yup from "yup";

const CustomerSchema = Yup.object().shape({
    txtC_Name: Yup.string()
        .min(3, "Must be at least 3 Characters")
        .max(50, "Can't exceed 50 Characters")
        .required("Required"),

    txtEmail: Yup.string()
        .email("Invalid Email Format")
        .required("Required"),

    txtContactNo: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact No Must be exactly 10 Digits")
        .required("Required"),

    txtGST_No: Yup.string()
        .max(15,"GST No Must be exactly 15 Characters")
        .required("Required")
});

export default CustomerSchema;
