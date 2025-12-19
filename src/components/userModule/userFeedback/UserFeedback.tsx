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

const validationSchema = Yup.object().shape({
  ratings: Yup.number().min(0).max(5).required("Rating is required"),
  comments: Yup.string().max(255).required("Comments are required"),
});

const UserFeedback: React.FC = () => {
  const dispatch = useDispatch();
  const { feedbackCreate, feedbackCreateLoading } = useSelector(
    (state: any) => state.userFeedbackCreateReducer || {}
  );

  const initialValues = { ratings: "", comments: "" };

  const handleSubmit = (values: any) => {
    dispatch({
      type: USER_FEEDBACK_CREATE_REQUEST,
      payload: {
        ratings: values.ratings,
        comments: values.comments,
      },
    });
  };

  useEffect(() => {
    if (feedbackCreate?.code === 200 || feedbackCreate?.code === 201) {
      showToast("Feedback submitted successfully!", "success", "Feedback-Create");
      setTimeout(() => {
        dispatch({ type: USER_FEEDBACK_CREATE_CLEAR });
      }, 1000);
    }
  }, [feedbackCreate, dispatch]);

  useEffect(() => {
    document.title = "Subscription | User Feedback";
  }, []);

  return (
    <Sidebar>
      <ToastContainer containerId="Feedback-Create" />

      {/* MAIN BACKGROUND */}
      <div className="flex justify-center items-center min-h-[85vh] bg-gradient-to-r from-[#d9e9f7] to-[#9ac3e6] p-4">

        {/* FORM CARD */}
        <div className="bg-white w-full max-w-2xl md:max-w-3xl lg:max-w-4xl rounded-2xl shadow-2xl p-6 md:p-10">

          <h2 className="text-3xl font-bold text-center mb-8 text-[#034078]">
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

                {/* ⭐ STAR RATING */}
                <div>
                  <label className="block text-[#034078] font-medium mb-2">
                    Rating
                  </label>

                  <div className="flex space-x-2 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => setFieldValue("ratings", star)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= Number(values.ratings) ? "#FFD700" : "none"}
                        stroke="#FFD700"
                        strokeWidth="2"
                        className="w-[6rem] h-8 cursor-pointer hover:scale-110 transition-transform"
                      >
                        <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.4 8.167L12 18.896l-7.334 3.868 1.4-8.167L.132 9.211l8.2-1.193z" />
                      </svg>
                    ))}
                  </div>

                  {errors.ratings && touched.ratings && (
                    <p className="text-red-500 text-sm mt-1">{errors.ratings}</p>
                  )}
                </div>

                {/* COMMENTS */}
                <div>
                  <label className="block text-[#034078] font-medium mb-2">
                    Comments
                  </label>
                  <textarea
                    name="comments"
                    value={values.comments}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder="Enter your feedback"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#034078] outline-none resize-none"
                  />
                  {errors.comments && touched.comments && (
                    <p className="text-red-500 text-sm mt-1">{errors.comments}</p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={feedbackCreateLoading}
                  className={`w-full py-3 rounded-full text-lg font-semibold text-white transition
                    ${feedbackCreateLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#034078] hover:bg-[#02345F]"
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
