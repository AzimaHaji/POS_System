import * as Yup from "yup";

const ChangeStaffProfileSchema = Yup.object().shape({
    txtEmail: Yup.string()
        .email("Invalid email format")
        .required("Required"),

    txtContactNo: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid Contact Number (Must be 10 digits)")
        .required("Required"),
});

export default ChangeStaffProfileSchema;
