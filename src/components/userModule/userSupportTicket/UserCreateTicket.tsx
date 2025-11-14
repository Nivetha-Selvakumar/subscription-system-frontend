import React from "react";
import Sidebar from "../../layout/sideBar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 * Expected action:
 * - USER_TICKET_CREATE_REQUEST (payload: { subject, description })
 * After submit we navigate back to list.
 */

const CreateSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
});

const UserCreateTicket: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Sidebar>
            <ToastContainer />
            <div className="p-8 max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Create Support Ticket</h2>

                    <Formik
                        initialValues={{ subject: "", description: "" }}
                        validationSchema={CreateSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            dispatch({ type: "USER_TICKET_CREATE_REQUEST", payload: values });
                            setSubmitting(false);
                            navigate("/user/tickets");
                        }}
                    >
                        {({ values, handleChange, touched, errors }) => (
                            <Form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium">Subject</label>
                                    <input
                                        name="subject"
                                        value={values.subject}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.subject && touched.subject && (
                                        <div className="text-red-500 text-sm">{errors.subject}</div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium">Description</label>
                                    <textarea
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full border rounded px-3 py-2"
                                    />
                                    {errors.description && touched.description && (
                                        <div className="text-red-500 text-sm">{errors.description}</div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        className="bg-teal-600 text-white px-4 py-2 rounded"
                                    >
                                        Submit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate("/user/tickets")}
                                        className="border px-4 py-2 rounded"
                                    >
                                        Cancel
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
