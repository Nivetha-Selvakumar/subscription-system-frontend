import React, { useEffect } from "react";
import Sidebar from "../../layout/sideBar";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

/**
 * Expected actions:
 * - USER_TICKET_DETAILS_REQUEST (payload: { ticketId })
 * - USER_TICKET_UPDATE_REQUEST (payload: { ticketId, subject, description })
 *
 * Reducer:
 * - state.userTicketDetailsReducer.ticket (object)
 */

const EditSchema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
});

const UserEditTicket: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams<{ ticketId: string }>();

    const { ticket } = useSelector((state: any) => state.userTicketDetailsReducer || {});

    useEffect(() => {
        if (ticketId) dispatch({ type: "USER_TICKET_DETAILS_REQUEST", payload: { ticketId } });
    }, [dispatch, ticketId]);

    if (!ticket) {
        return (
            <Sidebar>
                <div className="p-8">Loading ticket...</div>
            </Sidebar>
        );
    }

    // Only allow editing when OPEN
    const isEditable = ticket.status === "OPEN";

    return (
        <Sidebar>
            <ToastContainer />
            <div className="p-8 max-w-2xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Edit Ticket</h2>

                    {!isEditable && (
                        <div className="mb-4 p-3 bg-yellow-50 rounded border">This ticket is not editable (status: {ticket.status}). You can only view it.</div>
                    )}

                    <Formik
                        enableReinitialize
                        initialValues={{ subject: ticket.subject || "", description: ticket.description || "" }}
                        validationSchema={EditSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            if (!isEditable) return;
                            dispatch({ type: "USER_TICKET_UPDATE_REQUEST", payload: { ticketId, ...values } });
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
                                        disabled={!isEditable}
                                    />
                                    {errors.description && touched.description && (
                                        <div className="text-red-500 text-sm">{String(errors.description)}</div>
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
                                        disabled={!isEditable}
                                    />
                                    {errors.description && touched.description && (
                                        <div className="text-red-500 text-sm">{String(errors.description)}</div>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={!isEditable}
                                        className={`px-4 py-2 rounded ${isEditable ? "bg-teal-600 text-white" : "bg-gray-300 text-gray-700"}`}
                                    >
                                        Save
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

export default UserEditTicket;
