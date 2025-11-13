import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import showToast from "../../../common-components/ui/toastNotification";
import {
  USER_FEEDBACK_CREATE_REQUEST,
  USER_FEEDBACK_CREATE_CLEAR,
} from "../../../redux/actionTypes/UserModule/UserFeedback/userFeedbackCreateActionTypes";

const ratingOptions = [
  { label: "0", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5", value: 5 },
];

const validationSchema = Yup.object().shape({
  ratings: Yup.number()
    .min(0)
    .max(5)
    .required("Rating is required"),
  comments: Yup.string()
    .max(255, "Max 255 characters")
    .required("Comments are required"),
});

const UserFeedback: React.FC = () => {
  const dispatch = useDispatch();

  const { feedbackCreate, feedbackCreateLoading } = useSelector(
    (state: any) => state.userFeedbackCreateReducer || {}
  );

  const initialValues = {
    ratings: "",
    comments: "",
  };

  const handleSubmit = (values: any) => {
    dispatch({
      type: USER_FEEDBACK_CREATE_REQUEST,
      payload: {
        ratings: values.ratings,
        comments: values.comments,
      },
    });
  };

  // Handle Success
  useEffect(() => {
    if (feedbackCreate?.code === 200 || feedbackCreate?.code === 201) {
      showToast("Feedback submitted successfully!", "success", "Feedback-Create");

      setTimeout(() => {
        dispatch({ type: USER_FEEDBACK_CREATE_CLEAR });
      }, 1000);
    }
  }, [feedbackCreate, dispatch]);

  return (
    <Sidebar>
      <ToastContainer containerId="Feedback-Create" />

      <div className="flex justify-center w-full min-h-screen bg-gradient-to-r from-green-300 to-teal-400 p-6">
        <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Feedback Form
          </h2>

          <Formik
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
              <Form className="space-y-6">

                {/* RATING */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Rating (0 - 5)
                  </label>
                  <select
                    name="ratings"
                    value={values.ratings}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="">Select Rating</option>
                    {ratingOptions.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {errors.ratings && touched.ratings && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ratings}
                    </p>
                  )}
                </div>

                {/* COMMENTS */}
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="comments"
                    value={values.comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="Enter your feedback"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none resize-none"
                  />
                  {errors.comments && touched.comments && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.comments}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={feedbackCreateLoading}
                  className={`w-full py-3 rounded-full text-lg font-semibold text-white transition 
                                    ${feedbackCreateLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700"
                    }`}
                >
                  {feedbackCreateLoading ? "Submitting..." : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Sidebar>
  );
};

export default UserFeedback;
