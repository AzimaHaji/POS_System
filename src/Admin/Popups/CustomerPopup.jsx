import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import CustomerSchema from '../../Schema/CustomerSchema';
import { useFormik } from 'formik';
import { postData, putData } from '../../APIConfig/ConfigAPI';

export default function CustomerPopup({ show, setShow, CustId, setCustId, loading, setLoading,getCustomer, initialValues, setInitialValues }) {

  const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue, resetForm } = useFormik({
    initialValues: initialValues,
    validationSchema: CustomerSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
        setLoading(true);

        const ReqData = {
            C_Id: CustId,
            Customer_Name: values.txtC_Name,
            Email: values.txtEmail,
            ContactNo: values.txtContactNo,
            GST_No: values.txtGST_No
        };

        console.log(ReqData);

        try {

            let Response;

            if (CustId == 0) {
                Response = await postData("Customer/Add", ReqData);
            }
            else {
                Response = await putData("Customer/Update", ReqData);
            }
            if (Response.Status == "OK") {
                const toastId = toast.success("Saved Successfully", {
                    onClose: () => {
                        getCustomer();
                        setCustId(0);
                        cancleForm();
                        setShow(false);

                    }
                });

            }
            else {
                toast.error("Something Went Wrong");
                console.log(Response.data);
            }
        }
        catch (error) {
            console.error("Error", error);
        }
        finally {
            setLoading(false);
        }
    }
});

const cancleForm = () => {
  setInitialValues({
    txtC_Name: "",
    txtEmail: "",
    txtContactNo: "",
    txtGST_No: ""
  });
  setCustId(0);
  resetForm();
  setShow(false);
};
  return (
    <>
      <div className={show ? "modal show" : "modal"} style={show ? { display: "block" } : null} id="myModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{
              background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
            }}>
              <strong className="modal-title">Customer Details</strong>
              <button type="button" onClick={() => setShow(false)} className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body">
              <form className="row" method="post" onSubmit={handleSubmit}>
                <div className="col-md-6 mb-2">
                  <b>Customer Name</b><span className='text-danger'> * {errors.txtC_Name}</span>
                  <input type="text" name="txtC_Name" className="form-control" placeholder="Enter Customer Name" onChange={handleChange} onBlur={handleBlur} value={values.txtC_Name} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Email</b><span className='text-danger'> * {errors.txtEmail}</span>
                  <input type="email" name="txtEmail" className="form-control" placeholder="Enter Email" onChange={handleChange} onBlur={handleBlur} value={values.txtEmail} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>Contact No</b><span className='text-danger'> * {errors.txtContactNo}</span>
                  <input type="text" name="txtContactNo" className="form-control" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.txtContactNo} />
                </div>
                <div className="col-md-6 mb-2">
                  <b>GST No</b><span className='text-danger'> * {errors.txtGST_No}</span>
                  <input type="text" name="txtGST_No" id="txtGST_No" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.txtGST_No} />
                </div>
                <div className="col-md-12">
                  <button type="submit" disabled={loading ? true : false} className="btn btn-lg" style={{
                    background: "linear-gradient(135deg, #008080,rgb(89, 106, 120))"
                  }}>{loading ? "Please Wait" : "Save"}</button>&nbsp;
                  <button type="reset" onClick={() => cancleForm()} className="btn btn-danger btn-lg">Cancel</button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {show ? <div className="modal-backdrop show"></div> : null}
    </>
  )
}
