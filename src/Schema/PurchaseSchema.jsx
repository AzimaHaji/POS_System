import * as Yup from "yup";

const PurchaseSchema = Yup.object().shape({
    txtBill_No: Yup.string()
        .required("Required")
        .matches(/^\d+$/, "Must be a Number"),
    
    txtGrossAmt: Yup.number()
        .required("Required")
        .positive("Amount must be Positive"),

    txtTotalAmt: Yup.number()
        .required("Required")
        .positive("Amount must be Positive"),
    
    txtV_Id: Yup.string()
        .required("Required"),
    
    txtGST_Type: Yup.string()
        .required("Required")
        .oneOf(["CGST & SGST","IGST"], "Invalid GST Type"),
    
    txtBill_Date: Yup.date()
        .required("Required")
        .max(new Date(), "Bill Date cannot be in the Future"),
    
    txtTotal: Yup.number()
        .required("Required")
        .positive("Must be a Positive"),
});

export default PurchaseSchema;
