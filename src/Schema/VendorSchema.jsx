import * as Yup from "yup";

const VendorSchema = Yup.object().shape({
    txtBusiness_Name: Yup.string().required("Required"),
    txtContact_Person: Yup.string().required("Required"),
    txtAddress: Yup.string().required("Required"),
    txtContactNo: Yup.string()
        .required("Required")
        .matches(/^[0-9]{10}$/, "Must be 10 digits"),
    txtAlter_ContactNo: Yup.string().nullable(),
    txtGST_In: Yup.string().nullable(),
});

export default VendorSchema
