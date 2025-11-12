import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../layout/sideBar";

// ✅ Redux Action Types
import { PLAN_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes";

interface PlanDetails {
    id: string;
    planName: string;
    planType: string;
    planCost: string | number;
    description?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

// // ✅ Utility function for date formatting
// const formatDateDisplay = (dateStr: string | undefined): string => {
//     if (!dateStr) return "—";
//     try {
//         const date = new Date(dateStr);
//         if (isNaN(date.getTime())) return "—";
//         return date.toLocaleDateString();
//     } catch {
//         return "—";
//     }
// };

const AdminViewPlan: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [plan, setPlan] = useState<PlanDetails | null>(null);
    const [loading, setLoading] = useState(true);

    const { planView, planViewLoading } = useSelector(
        (state: any) => state.planViewReducer || {}
    );

    const hasFetched = useRef(false);

    // ✅ Fetch Plan details initially
    useEffect(() => {
        if (id && !hasFetched.current) {
            hasFetched.current = true;
            dispatch({ type: PLAN_VIEW_REQUEST, payload: { planId: id } });
        }
    }, [id, dispatch]);

    // ✅ Set plan data when Redux state updates
    useEffect(() => {
        if (planView?.data) { // <---- changed from planDetails to data
            const p = planView.data;
            setPlan({
                id: p.id || "",
                planName: p.planName || "",
                planType: p.planType || "",
                planCost: p.planCost || "",
                description: p.description || "",
                status: p.status || "",
                createdAt: p.createdAt || "",
                updatedAt: p.updatedAt || "",
            });
            setLoading(false);
        } else if (planViewLoading === false) {
            setLoading(false);
        }
    }, [planView, planViewLoading]);


    const handleEdit = () => {
        navigate(`/admin/plans/edit/${id}`);
    };

    const handleBack = () => {
        navigate("/admin/plans");
    };

    // ✅ Loading State
    if (loading || planViewLoading) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading plan details...</p>
                </div>
            </Sidebar>
        );
    }

    // ✅ No data found
    if (!plan) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">Plan not found</p>
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                        >
                            Back to Plans
                        </button>
                    </div>
                </div>
            </Sidebar>
        );
    }

    // ✅ Plan Details UI
    return (
        <Sidebar>
            <ToastContainer containerId="ViewPlan-Container" />
            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
                        Plan Details
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
                                    {plan.planName || "—"}
                                </p>
                            </div>

                            {/* Plan Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Plan Type
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    {plan.planType
                                        ? plan.planType.charAt(0).toUpperCase() +
                                        plan.planType.slice(1).toLowerCase()
                                        : "—"}
                                </p>
                            </div>

                            {/* Plan Cost */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Plan Cost
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    {plan.planCost ? `₹ ${Number(plan.planCost).toLocaleString()}` : "—"}
                                </p>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${String(plan.status).toLowerCase() === "active"
                                            ? "bg-green-100 text-green-800"
                                            : String(plan.status).toLowerCase() === "inactive"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {plan.status
                                            ? plan.status.charAt(0).toUpperCase() +
                                            plan.status.slice(1).toLowerCase()
                                            : "—"}
                                    </span>
                                </p>
                            </div>

                            {/* Description */}
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <p className="text-gray-900 px-3 py-2 bg-gray-50 rounded-md border border-gray-200 whitespace-pre-wrap">
                                    {plan.description || "—"}
                                </p>
                            </div>

                            {/* Created At */}
                            {plan.createdAt && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Created At
                                    </label>
                                    <p className="text-gray-600 text-xs px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                        {new Date(plan.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {/* Updated At */}
                            {plan.updatedAt && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Updated At
                                    </label>
                                    <p className="text-gray-600 text-xs px-3 py-2 bg-gray-50 rounded-md border border-gray-200">
                                        {new Date(plan.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                        >
                            Edit Plan
                        </button>
                    </div>
                </div>
            </div>
        </Sidebar>
    );
};

export default AdminViewPlan;
