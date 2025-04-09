import * as Yup from "yup";

const ProductSchema = Yup.object().shape({
    txtName: Yup.string()
        .required("Required")
        .min(2, "Product name must be at least 2 characters long"),
    txtWeight: Yup.number()
        .required("Required")
        .positive("Weight must be a positive number"),
    txtUnit: Yup.string().required("Required"),
    txtPrice: Yup.number()
        .required("Required")
        .positive("Price must be a positive number"),
    txtNet: Yup.string()
        .required("Required"),
    txtFSSAI: Yup.string()
        .required("Required")
        .matches(/^\d{14}$/, "FSSAI must be a 14-digit number"),
    txtBarcode: Yup.string().required("Required"),
    txtBrand: Yup.string().required("Required"),
    txtHSN: Yup.string().required("Required"),
    txtGST: Yup.number()
        .required("Required")
        .min(0, "GST cannot be negative")
        .max(100, "GST cannot be more than 100%"),
});



// Export schemas as named exports
export default ProductSchema;

