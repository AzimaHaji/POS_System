import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import CustomerSchema from "../Schema/CustomerSchema";
import { postData } from "../APIConfig/ConfigAPI";

export default function CustPopup({
  show,
  setShow,
  loading,
  setLoading,
  getCustomer,
  initialValues,
  setInitialValues,
}) {
  const { values, errors, handleChange, handleBlur, handleSubmit, resetForm } =
    useFormik({
      initialValues: initialValues,
      validationSchema: CustomerSchema,
      enableReinitialize: true,
      onSubmit: async (values) => {
        setLoading(true);

        const ReqData = {
          Customer_Name: values.txtC_Name,
          Email: values.txtEmail,
          ContactNo: values.txtContactNo,
          GST_No: values.txtGST_No,
        };

        try {
          const Response = await postData("Customer/Add", ReqData);

          if (Response.Status === "OK") {
            toast.success("Saved Successfully", {
              onClose: () => {
                getCustomer(); // Refresh customer list
                cancelForm();
                setShow(false);
              },
            });
          } else {
            toast.error("Something Went Wrong");
            console.error(Response.data);
          }
        } catch (error) {
          console.error("Error", error);
          toast.error("Failed to save customer");
        } finally {
          setLoading(false);
        }
      },
    });

  const cancelForm = () => {
    setInitialValues({
      txtC_Name: "",
      txtEmail: "",
      txtContactNo: "",
      txtGST_No: "",
    });
    resetForm();
    setShow(false);
  };

  return (
    <>
      <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{
              background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))"
            }}>
              <strong className="modal-title">Add New Customer</strong>
              <button type="button" onClick={() => setShow(false)} className="btn-close" />
            </div>
            <div className="modal-body">
              <form className="row" onSubmit={handleSubmit}>
                <div className="col-md-6 mb-2">
                  <b>Customer Name</b>
                  <span className="text-danger"> * {errors.txtC_Name}</span>
                  <input type="text" name="txtC_Name" className="form-control" placeholder="Enter Customer Name" onChange={handleChange} onBlur={handleBlur} value={values.txtC_Name} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Email</b>
                  <span className="text-danger"> * {errors.txtEmail}</span>
                  <input type="email" name="txtEmail" className="form-control" placeholder="Enter Email" onChange={handleChange} onBlur={handleBlur} value={values.txtEmail} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Contact No</b>
                  <span className="text-danger"> * {errors.txtContactNo}</span>
                  <input type="text" name="txtContactNo" className="form-control" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.txtContactNo} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>GST No</b>
                  <span className="text-danger"> * {errors.txtGST_No}</span>
                  <input type="text" name="txtGST_No" className="form-control" placeholder="Enter GST No" onChange={handleChange} onBlur={handleBlur} value={values.txtGST_No} />
                </div>
                <div className="col-md-12">
                  <button type="submit" disabled={loading} className="btn btn-lg" style={{
                    background: "linear-gradient(135deg, #008080, rgb(89, 106, 120))"
                  }}>
                    {loading ? "Please Wait" : "Save"}
                  </button>
                  &nbsp;
                  <button type="button" onClick={cancelForm} className="btn btn-danger btn-lg">
                    Cancel
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop show"></div>}
    </>
  );
}
