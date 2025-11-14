/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Sidebar from "../../layout/sideBar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import showToast from "../../../common-components/ui/toastNotification";
import {
    SUPPORT_TICKET_CREATE_REQUEST,
    SUPPORT_TICKET_CREATE_CLEAR,
} from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketCreateActionTypes";

const CreateSchema = Yup.object().shape({
    subject: Yup.string()
        .max(255, "Max 255 characters allowed")
        .required("Subject is required"),

    issueDescription: Yup.string()
        .max(500, "Max 500 characters allowed")
        .required("Issue Description is required"),
});

const UserCreateTicket: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { supportTicketCreate, supportTicketCreateLoading } = useSelector(
        (state: any) => state.supportTicketCreateReducer || {}
    );

    // 🔥 Success Toast + Redirect
    useEffect(() => {
        if (
            supportTicketCreate?.code === 200 ||
            supportTicketCreate?.code === 201
        ) {
            showToast("Support Ticket Created Successfully!", "success", "User-Ticket");

            setTimeout(() => {
                dispatch({ type: SUPPORT_TICKET_CREATE_CLEAR });
                navigate("/user/supportTicket");
            }, 1000);
        }
    }, [supportTicketCreate]);

    return (
        <Sidebar>
            <ToastContainer containerId="User-Ticket" />

            {/* CLEAN PROFESSIONAL BACKGROUND */}
            <div className="flex justify-center items-center min-h-[85vh] bg-[#f3f4f6] p-6">

                <div className="bg-white w-full max-w-3xl rounded-xl shadow-lg p-8 border border-gray-200">

                    <h2 className="text-2xl font-semibold text-[#1f2937] mb-6 text-center">
                        Create Support Ticket
                    </h2>

                    <Formik
                        initialValues={{ subject: "", issueDescription: "" }}
                        validationSchema={CreateSchema}
                        onSubmit={(values) => {
                            dispatch({
                                type: SUPPORT_TICKET_CREATE_REQUEST,
                                payload: {
                                    subject: values.subject,
                                    issueDescription: values.issueDescription,
                                },
                            });
                        }}
                    >
                        {({ values, handleChange, touched, errors }) => (
                            <Form className="space-y-6">

                                {/* SUBJECT */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Subject
                                    </label>

                                    <input
                                        name="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        placeholder="Enter the subject"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 
                                        focus:ring-blue-500 outline-none"
                                    />

                                    {errors.subject && touched.subject && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* ISSUE DESCRIPTION */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Issue Description
                                    </label>

                                    <textarea
                                        name="issueDescription"
                                        value={values.issueDescription}
                                        onChange={handleChange}
                                        rows={5}
                                        placeholder="Describe the issue you are facing..."
                                        className="w-full px-4 py-3 border rounded-lg 
                                        focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    />

                                    {errors.issueDescription && touched.issueDescription && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.issueDescription}
                                        </p>
                                    )}
                                </div>

                                {/* ACTION BUTTONS */}
                                <div className="flex justify-end gap-4">

                                    <button
                                        type="button"
                                        onClick={() => navigate("/user/supportTicket")}
                                        className="px-5 py-2 border rounded-lg text-gray-700 
                                        hover:bg-gray-100 transition"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={supportTicketCreateLoading}
                                        className={`px-6 py-2 rounded-lg text-white font-medium transition
                                        ${supportTicketCreateLoading
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700"
                                            }`}
                                    >
                                        {supportTicketCreateLoading ? "Submitting..." : "Create Ticket"}
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </Sidebar>
    );
};

export default UserCreateTicket;
