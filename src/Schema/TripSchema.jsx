import * as Yup from "yup";

const TripSchema = Yup.object().shape({
    txtVehicle_Id: Yup.string().required("Required"),
    txtStaff_Id: Yup.string().required("Required") 
});

export default TripSchema;
