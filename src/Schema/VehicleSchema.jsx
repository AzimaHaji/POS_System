import * as Yup from 'yup';

const VehicleSchema = Yup.object().shape({
    txtDriver_Name: Yup.string().required("Required"),
    txtPUC_No: Yup.string().required("Required"),
    txtPUC_Expiry: Yup.date().required("Required"),
    txtVehicle_No: Yup.string().required("Required"),
    txtVehicle_Name: Yup.string().required("Required"),
    txtFuel_Type: Yup.string().required("Required"),
    txtDriving_Licences_No: Yup.string().required("Required")
});

export default VehicleSchema