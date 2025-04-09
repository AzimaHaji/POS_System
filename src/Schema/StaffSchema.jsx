import * as Yup from "yup";

const StaffSchema = Yup.object().shape({
    txtF_Name: Yup.string()
        .required("Required")
        .matches(/^[a-zA-Z ]+$/, "Only Letters are allowed"),
    txtGender: Yup.string()
        .required("Required"),
    txtDOB: Yup.date()
        .required("Required")
        .max(new Date(), "DOB can't be in the Future"),
    txtEmail: Yup.string()
        .email("Invalid Email")
        .required("Required"),
    txtContactNo: Yup.string()
        .required("Required")
        .matches(/^[0-9]{10}$/, "Must be 10 Digits"),
    txtAddress: Yup.string()
        .required("Required"),
    txtAdhar_No: Yup.string()
        .required("Required")
        .matches(/^[0-9]{12}$/, "Must be 12 Digits"),
    txtDriving_Licence: Yup.string()
        .required("Required"),
    txtDOJ: Yup.date()
        .required("Required")
        .max(new Date(), "DOJ can't be in the Future"),
    txtStatus: Yup.string()
        .required("Required"),
});
export default StaffSchema;