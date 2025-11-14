import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";

import { USER_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminViewUserActionType";
import { USER_FEEDBACK_LIST_REQUEST } from "../../../redux/actionTypes/UserModule/UserFeedback/userFeedbackListActionTypes";

import UserFeedback from "./UserFeedback";
import AdminFeedback from "../../adminModule/adminFeedback/AdminFeedback";

const UserFeedbackView = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    const { userView, userViewLoading } = useSelector(
        (state: any) => state.userViewReducer || {}
    );

    const { userFeedbackList, userFeedbackListLoading } = useSelector(
        (state: any) => state.userFeedbackListReducer || {}
    );

    const hasFetchedUser = useRef(false);
    const hasFetchedFeedback = useRef(false);

    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [totalCount, setTotalCount] = useState(0);

    // ---------------------------------------------
    // STEP 1: FETCH USER PROFILE FIRST
    // ---------------------------------------------
    useEffect(() => {
        if (!hasFetchedUser.current) {
            const userId = localStorage.getItem("user_id");
            hasFetchedUser.current = true;

            dispatch({
                type: USER_VIEW_REQUEST,
                payload: { userId },
            });
        }
    }, [dispatch]);

    // ---------------------------------------------
    // STEP 2: WHEN USER PROFILE COMES
    // ---------------------------------------------
    useEffect(() => {
        if (userView?.userDetails) {
            const role = userView.userDetails.role?.toLowerCase();

            if (role === "admin") {
                setIsAdmin(true);
                setLoading(false);
            } else {
                setIsAdmin(false);

                // Fetch feedback list only if NOT admin
                if (!hasFetchedFeedback.current) {
                    hasFetchedFeedback.current = true;

                    dispatch({
                        type: USER_FEEDBACK_LIST_REQUEST,
                        payload: {
                            search: "",
                            offset: 0,
                            limit: 10,
                            filterBy: null,
                        },
                    });
                }
            }
        }
    }, [userView, dispatch]);

    // ---------------------------------------------
    // STEP 3: HANDLE FEEDBACK LIST RESPONSE
    // ---------------------------------------------
    useEffect(() => {
        if (!userFeedbackListLoading && userFeedbackList?.data) {
            const total = userFeedbackList.data.totalCount || 0;
            setTotalCount(total);
            setLoading(false);
        }
    }, [userFeedbackList, userFeedbackListLoading]);

    // ---------------------------------------------
    // LOADING STATE
    // ---------------------------------------------
    if (loading || userViewLoading) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </Sidebar>
        );
    }

    // ---------------------------------------------
    // CASE 1: ADMIN → Show Admin Feedback Page
    // ---------------------------------------------
    if (isAdmin === true) {
        return <AdminFeedback />;
    }

    // ---------------------------------------------
    // CASE 2: USER HAS ALREADY SUBMITTED FEEDBACK
    // ---------------------------------------------
    if (isAdmin === false && totalCount === 1) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center w-full h-[calc(100vh-100px)] bg-gray-50">
                    <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full text-center border border-gray-100">

                        {/* Success Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="green"
                                    className="w-10 h-10"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-green-600 mb-3">
                            Feedback Already Submitted!
                        </h2>

                        <p className="text-gray-500 text-md mb-6">
                            Thank you for sharing your valuable feedback.
                            We appreciate your time!
                        </p>

                        <button
                            onClick={() => window.location.href = "/user/dashboard"}
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg 
                hover:bg-green-700 transition-all shadow-md"
                        >
                            Go to Dashboard
                        </button>

                    </div>
                </div>
            </Sidebar>
        );
    }

    // ---------------------------------------------
    // CASE 3: USER HAS NOT SUBMITTED FEEDBACK
    // ---------------------------------------------
    if (isAdmin === false && totalCount === 0) {
        return <UserFeedback />;
    }

    return null;
};

export default UserFeedbackView;
