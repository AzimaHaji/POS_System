import * as Yup from "yup";

export const paymentInvoiceValidationSchema = Yup.object().shape({
    amount: Yup.number().typeError(" * Amount must be a number").min(1, " *Amount must be at least ₹1").required(" *Required"),
    paymentMode: Yup.string().required(" *Required"),
    refNo: Yup.string().required(" *Required"),
    receiptDate: Yup.date().required(" *Required"),
});


export const orderValidationSchema = Yup.object().shape({
    amount: Yup.number().typeError(" * Amount must be a number").min(1, " *Amount must be at least ₹1").required(" *Required"),
    paymentMode: Yup.string().required(" *Required"),
    refNo: Yup.string().required(" *Required"),
    OrderDate: Yup.date().required(" *Required"),
});