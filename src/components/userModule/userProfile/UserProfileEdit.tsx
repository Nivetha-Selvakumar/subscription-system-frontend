import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../layout/sideBar";
import DynamicInput from "../../../common-components/ui/dynamicInput";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import DynamicDatePicker from "../../../common-components/ui/dynamicDatePicker";
import showToast from "../../../common-components/ui/toastNotification";
import { USER_EDIT_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminEditUserActionType";
import { USER_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminViewUserActionType";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().nullable(),
  address: Yup.string().nullable(),
  dob: Yup.string().nullable(),
  sex: Yup.string().nullable(),
});

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return "";
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, "0");
  const dd = String(parsed.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const UserProfileEdit: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const { userView, userViewLoading } = useSelector(
    (state: any) => state.userViewReducer || {}
  );

  const { userEdit, userEditLoading } = useSelector(
    (state: any) => state.userEditReducer || {}
  );


  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dob: "",
    sex: "",
  });

  useEffect(() => {
    if (userId) {
      dispatch({ type: USER_VIEW_REQUEST, payload: { userId } });
    }
  }, [dispatch, userId]);

  useEffect(() => {
    document.title = "Subscription | User Profile Edit";
  }, []);

  useEffect(() => {
    if (userView?.userDetails) {
      const u = userView.userDetails;
      setInitialValues({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        email: u.email || "",
        phoneNumber: u.phoneNumber || "",
        address: u.address || "",
        dob: formatDate(u.dob),
        sex: u.sex?.toLowerCase() || "",
      });
    }
  }, [userView]);

  const handleSubmit = (values: any) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      address: values.address,
      dob: values.dob,
      sex: values.sex.toUpperCase(),
    };

    dispatch({
      type: USER_EDIT_REQUEST,
      payload: {
        userId,
        targetUserId: userId,
        payload,
      },
    });
  };

  // ✅ Toast & redirect after success
  useEffect(() => {
    if (userEdit?.code === 200) {
      showToast("User updated successfully", "success", "EditUser-Container");
      dispatch({ type: 'USER_EDIT_CLEAR' });
      setTimeout(() => {
        navigate("/user/profile");
      }, 2000);
    }
  }, [userEdit, dispatch, navigate]);

  return (
    <Sidebar>
      <ToastContainer containerId="EditProfile-Container" />
      <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
        <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
          <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
            Edit My Profile
          </h1>

          <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicInput
                      type="text"
                      label="First Name"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.firstName}
                      touched={touched.firstName}
                    />

                    <DynamicInput
                      type="text"
                      label="Last Name"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.lastName}
                      touched={touched.lastName}
                    />

                    <DynamicInput
                      type="email"
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.email}
                      touched={touched.email}
                      disabled
                    />

                    <DynamicInput
                      type="text"
                      label="Phone Number"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                      maxLength={10}
                    />

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={values.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={3}
                        className={`w-full px-3 py-2 text-sm border rounded-md outline-none ${errors.address && touched.address
                          ? "border-red-500"
                          : "border-gray-300"
                          }`}
                      />
                    </div>

                    <DynamicDatePicker
                      label="Date of Birth"
                      name="dob"
                      value={values.dob}
                      onChange={(e) => setFieldValue("dob", e.target.value)}
                      onBlur={handleBlur}
                      error={errors.dob}
                      touched={touched.dob}
                    />

                    <DynamicDropdown
                      label="Gender"
                      name="sex"
                      value={values.sex}
                      onChange={(e: any) =>
                        setFieldValue("sex", e.target.value)
                      }
                      onBlur={handleBlur}
                      error={errors.sex}
                      touched={touched.sex}
                      options={genderOptions}
                    />
                  </div>

                  <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4 mt-auto">
                    <button
                      type="submit"
                      disabled={userEditLoading}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md ${userViewLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                      {userEditLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserProfileEdit;
