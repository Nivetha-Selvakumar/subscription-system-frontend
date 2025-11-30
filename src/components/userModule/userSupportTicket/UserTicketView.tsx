import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sideBar";

import {
    SUPPORT_TICKET_VIEW_REQUEST
} from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";

const UserViewTicket = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { supportTicketView, supportTicketViewLoading } = useSelector(
        (state: any) => state.supportTicketViewReducer || {}
    );

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    // Fetch Ticket
    const fetchTicket = useCallback(() => {
        dispatch({
            type: SUPPORT_TICKET_VIEW_REQUEST,
            payload: { targetTicketId: id },
        });
    }, [dispatch, id]);

    useEffect(() => {
        document.title = "Subscription | User Ticket View";
    }, []);


    useEffect(() => {
        fetchTicket();
    }, [fetchTicket]);

    // Auto-scroll
    const scrollToBottom = () => {
        if (!messagesContainerRef.current) return;
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
    };

    useEffect(() => {
        scrollToBottom();
    }, [supportTicketView]);

    if (supportTicketViewLoading) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </Sidebar>
        );
    }

    const data = supportTicketView?.data || {};
    const ticketResponse = data.ticketResponse || [];

    const formatStatus = (text = "") => {
        return text
            .toLowerCase()
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <Sidebar>

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">
                            View Support Ticket
                        </h1>

                        <div className="flex gap-3">
                            {/* Back Button */}
                            <button
                                onClick={() => navigate(`/user/supportTicket`)}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                            >
                                Back
                            </button>

                            {/* Edit Button */}
                            <button
                                onClick={() => navigate(`/user/supportTicket/edit/${id}`)}
                                className="px-4 py-2 rounded-lg border bg-[#034078] text-white hover:bg-[#02345f]"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    {/* MAIN SPLIT SECTIONS */}
                    <div className="flex flex-1">

                        {/* LEFT SIDE - Ticket Info */}
                        <div className="w-1/2 border-r p-6 overflow-y-auto">
                            <div className="space-y-6">

                                {/* Subject */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                                    <input
                                        className="w-full mt-2 px-4 py-3 rounded-lg border bg-gray-100"
                                        value={data.subject || ""}
                                        disabled
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Issue Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full mt-2 px-4 py-3 rounded-lg border bg-gray-100"
                                        value={data.issueDescription || ""}
                                        disabled
                                    ></textarea>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Status</label>
                                    <input
                                        className="w-full mt-2 px-4 py-3 rounded-lg border bg-gray-100"
                                        value={formatStatus(data.ticketStatus) || ""}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Chat View */}
                        <div className="w-1/2 flex flex-col">

                            <div
                                ref={messagesContainerRef}
                                className="flex-1 overflow-y-auto p-6 space-y-4"
                                style={{ maxHeight: "calc(80vh - 200px)" }}
                            >
                                {ticketResponse.length === 0 && (
                                    <p className="text-gray-500 text-center">No responses yet.</p>
                                )}

                                {/* Group messages by date */}
                                {Object.entries(
                                    ticketResponse.reduce((acc: any, msg: any) => {
                                        const dateKey = new Date(msg.createdAt).toDateString();
                                        if (!acc[dateKey]) acc[dateKey] = [];
                                        acc[dateKey].push(msg);
                                        return acc;
                                    }, {})
                                ).map(([dateKey, messages]: any) => (
                                    <div key={dateKey}>

                                        {/* DATE SEPARATOR */}
                                        <div className="flex justify-center my-3">
                                            <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-xs shadow">
                                                {new Date(dateKey).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {/* MESSAGES */}
                                        {messages.map((msg: any, idx: number) => {
                                            const loggedInUserId = localStorage.getItem("user_id");
                                            const isUser = msg.responder?.id === loggedInUserId;

                                            return (
                                                <div
                                                    key={msg.id ?? idx}
                                                    className={`flex my-2 ${isUser ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div
                                                        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow text-sm leading-snug
                                    ${isUser
                                                                ? "bg-blue-600 text-white rounded-br-none"
                                                                : "bg-gray-100 text-gray-900 rounded-bl-none"
                                                            }
                                `}
                                                    >
                                                        {/* SENDER NAME */}
                                                        <p className="text-xs font-semibold opacity-80 mb-1">
                                                            {isUser
                                                                ? `You (${msg.responder?.firstName} ${msg.responder?.lastName})`
                                                                : `${msg.responder?.firstName} ${msg.responder?.lastName}`
                                                            }
                                                        </p>

                                                        {/* MESSAGE */}
                                                        <p className="whitespace-pre-line">{msg.responseText}</p>

                                                        {/* TIME */}
                                                        <p className="text-[10px] opacity-70 text-right mt-2">
                                                            {new Date(msg.createdAt).toLocaleTimeString("en-IN", {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                                hour12: true,
                                                            })}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </Sidebar>
    );
};

export default UserViewTicket;
