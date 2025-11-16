import Sidebar from "../../layout/sideBar";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

interface PaymentDetails {
    id: string;
    planName: string;
    amount: number | string;
    paymentStatus: string;
    paymentDate: string;
    subscriptionStatus: string;
}

const formatDateDisplay = (dateStr: string | undefined): string => {
    if (!dateStr) return "—";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "—";
        return date.toLocaleString();
    } catch {
        return "—";
    }
};

const UserPaymentDetails: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    const payment: PaymentDetails | null = state || null;

    const handleBack = () => navigate("/user/payments");

    if (!payment) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">No payment details found</p>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar>
            <ToastContainer containerId="Payment-View-Container" />

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
                        Payment Details
                    </h1>

                    {/* Content */}
                    <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Plan Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Plan Name
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    {payment.planName || "—"}
                                </p>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Amount Paid
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    ₹ {payment.amount || "—"}
                                </p>
                            </div>

                            {/* Payment Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Status
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${payment.paymentStatus === "SUCCESS"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {payment.paymentStatus}
                                    </span>
                                </p>
                            </div>

                            {/* Subscription Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Subscription Status
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${payment.subscriptionStatus === "ACTIVE"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-orange-100 text-orange-800"
                                            }`}
                                    >
                                        {payment.subscriptionStatus || "—"}
                                    </span>
                                </p>
                            </div>

                            {/* Payment Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Date
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    {formatDateDisplay(payment.paymentDate)}
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4">
                        <button
                            type="button"
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

export default UserPaymentDetails;
