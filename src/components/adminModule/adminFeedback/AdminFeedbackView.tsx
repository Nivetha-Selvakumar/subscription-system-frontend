import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";
import { ToastContainer } from "react-toastify";

// Redux action type
import { USER_FEEDBACK_VIEW_REQUEST } from "../../../redux/actionTypes/UserModule/UserFeedback/userFeedbackViewActionTypes";

const AdminFeedbackView: React.FC = () => {
    useEffect(() => {
        document.title = "Subscription | Admin Feedback";
    }, []);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [feedback, setFeedback] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const { userFeedbackView, userFeedbackViewLoading } = useSelector(
        (state: any) => state.userFeedbackViewReducer || {}
    );

    const hasFetched = useRef(false);

    // Fetch single feedback details
    useEffect(() => {
        if (id && !hasFetched.current) {
            hasFetched.current = true;
            dispatch({ type: USER_FEEDBACK_VIEW_REQUEST, payload: { targetFeedbackId: id } });
        }
    }, [id, dispatch]);

    // Set data into UI state
    useEffect(() => {
        if (userFeedbackView?.data) {
            setFeedback(userFeedbackView.data);
            setLoading(false);
        } else if (!userFeedbackViewLoading) {
            setLoading(false);
        }
    }, [userFeedbackView, userFeedbackViewLoading]);

    const handleBack = () => navigate("/admin/feedback");

    // Loading screen
    if (loading || userFeedbackViewLoading) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading feedback details...</p>
                </div>
            </Sidebar>
        );
    }

    // If no data
    if (!feedback) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">Feedback not found</p>
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Back to Feedback List
                        </button>
                    </div>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar>
            <ToastContainer containerId="FeedbackView-Container" />

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
                        Feedback Details
                    </h1>

                    {/* Content */}
                    <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* User Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    User Name
                                </label>
                                <p className="px-3 py-2 bg-gray-50 border rounded-md text-gray-900">
                                    {feedback?.user?.firstName} {feedback?.user?.lastName}
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <p className="px-3 py-2 bg-gray-50 border rounded-md text-gray-900">
                                    {feedback?.user?.email || "—"}
                                </p>
                            </div>

                            {/* Ratings */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating
                                </label>
                                <p className="px-3 py-2 bg-gray-50 border rounded-md text-gray-900">
                                    ⭐ {feedback.ratings}/5
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <p className="px-3 py-2 bg-gray-50 border rounded-md">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${feedback.status?.toLowerCase() === "active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {feedback.status || "—"}
                                    </span>
                                </p>
                            </div>

                            {/* Comments */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comments
                                </label>
                                <p className="px-3 py-2 bg-gray-50 border rounded-md whitespace-pre-wrap text-gray-900">
                                    {feedback.comments || "—"}
                                </p>
                            </div>

                            {/* Created At */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Created At
                                </label>
                                <p className="px-3 py-2 text-xs bg-gray-50 border rounded-md">
                                    {new Date(feedback.createdAt).toLocaleString()}
                                </p>
                            </div>

                            {/* Updated At */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Updated At
                                </label>
                                <p className="px-3 py-2 text-xs bg-gray-50 border rounded-md">
                                    {new Date(feedback.updatedAt).toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Footer */}
                    <div className="sticky bottom-0 bg-white border-t flex justify-end gap-4 px-6 py-4">
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default AdminFeedbackView;
