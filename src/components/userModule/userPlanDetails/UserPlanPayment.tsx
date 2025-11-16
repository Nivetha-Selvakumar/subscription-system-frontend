import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { PLAN_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes";

import { SUBSCRIPTION_CREATE_REQUEST } from "../../../redux/actionTypes/UserModule/UserSubscription/userSubscriptionCreateActionTypes";

// 👉 Using Iconify for MingCute Icons
import { Icon } from "@iconify/react";
import showToast from "../../../common-components/ui/toastNotification";
import { ToastContainer } from "react-toastify";

const UserPlanPaymentPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hasFetched = useRef(false);

    const { planView, planViewLoading } = useSelector(
        (s: any) => s.planViewReducer || {}
    );

    const { subscriptionCreate } = useSelector(
        (s: any) => s.subscriptionCreateReducer || {}
    );

    const apiPlan = planView?.data;

    // ------------------------------
    //  FETCH PLAN DETAILS
    // ------------------------------
    useEffect(() => {
        if (id && !hasFetched.current) {
            hasFetched.current = true;
            dispatch({ type: PLAN_VIEW_REQUEST, payload: { planId: id } });
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (subscriptionCreate?.code === 200 || subscriptionCreate?.code === 201) {

            showToast("Subscription Paid Successfully", "success", "Subscription-Create");
            dispatch({ type: "SUBSCRIPTION_CREATE_CLEAR" });
            setTimeout(() => {
                navigate("/user/dashboard");
            }, 2000);
        }
    }, [subscriptionCreate, dispatch, navigate]);

    // ------------------------------
    //  HANDLE PAYMENT
    // ------------------------------
    const handlePayment = (status: string) => {

        if (status === "SUCCESS") {
            // 🔥 Hit Subscription Create API
            dispatch({
                type: SUBSCRIPTION_CREATE_REQUEST,
                payload: {
                    planId: id,
                    payload: {
                        amount: apiPlan?.planCost,
                        paymentStatus: "SUCCESS",
                        currentSubStatus: "ACTIVE"
                    }
                }
            });
        } else {
            // ❌ Payment Failed → go back
            navigate("/user/dashboard");
        }
    };

    const handleBack = () => {
        navigate("/user/plans");
    };


    // ------------------------------
    //  LOADING UI
    // ------------------------------
    if (!apiPlan && planViewLoading) {
        return (
            <Sidebar>
                <ToastContainer containerId={"Subscription-Create"} />
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading plan details...</p>
                </div>
            </Sidebar>
        );
    }

    return (
        <Sidebar>
            <ToastContainer containerId={"Subscription-Create"} />
            <div className="min-h-screen bg-[#f5fafb] flex justify-center items-center">
                <div className="bg-white shadow-xl rounded-2xl p-10 w-[35rem] relative">

                    {/* 🔙 Back Button */}
                    <button
                        onClick={handleBack}
                        className="absolute top-6 left-6 flex items-center gap-2 text-[#063b53] hover:text-[#02232f] font-semibold"
                    >
                        <Icon icon="mingcute:arrow-left-circle-line" width="26" />
                        Back to Plans
                    </button>

                    <h1 className="text-2xl font-bold text-center text-[#0b3d52] mt-6">
                        Payment for {apiPlan?.planName ?? "Loading..."}
                    </h1>

                    <p className="text-center text-gray-600 mt-2">
                        Amount:{" "}
                        <span className="font-semibold">
                            ₹{apiPlan?.planCost ?? apiPlan?.cost}
                        </span>
                    </p>

                    <div className="mt-10 flex flex-col gap-4">

                        {/* SUCCESS BUTTON */}
                        <button
                            onClick={() => handlePayment("SUCCESS")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                        >
                            Pay Now (Success)
                        </button>

                        {/* FAILED BUTTON */}
                        <button
                            onClick={() => handlePayment("FAILED")}
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl"
                        >
                            Pay Failed
                        </button>

                    </div>

                </div>
            </div>
        </Sidebar>
    );
};

export default UserPlanPaymentPage;
