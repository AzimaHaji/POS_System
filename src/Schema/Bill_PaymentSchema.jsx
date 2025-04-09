import * as Yup from "yup";

const  Bill_PaymentSchema = Yup.object().shape({
    txtAmount: Yup.number()
        .positive("Amount Must be Greater than Zero")
        .required("Required"),

    txtPayment_Mode: Yup.string()
        .required("Required"),

    txtPayment_Date: Yup.date()
        .required("Required"),
});


export default Bill_PaymentSchema;