import * as Yup from "yup";

const StockSchema = Yup.object().shape({
    txtP_Id: Yup.string()
        .required("Required"),

    txtPurchase_Id: Yup.string()
        .required("Required"),

    txtMFG_Date: Yup.date()
        .required("Required")
        .max(new Date(), "Date Can't be in the Future"),

    txtExp_Date: Yup.date()
        .required("Required")
        .min(Yup.ref("txtMFG_Date"), "Expiry Date must be after Manufacturing Date"),

    txtNo_Of_Stock: Yup.number()
        .required("Required")
        .positive("Must be a Positive Number"),

    txtCost_Price: Yup.number()
        .required("Required")
        .positive("Must be a Positive Number"),

    txtInword_Date: Yup.date()
        .required("Required")
        .min(Yup.ref("txtMFG_Date"), "Inward Date Must be After Manufacturing Date")
        .max(new Date(), "Can't be in the Future"),
});

export default StockSchema;
