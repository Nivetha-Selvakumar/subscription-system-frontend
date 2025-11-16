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
                                        value={data.ticketStatus || ""}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Chat View */}
                        <div className="w-1/2 flex flex-col">

                            {/* Chat Messages */}
                            <div
                                ref={messagesContainerRef}
                                className="flex-1 overflow-y-auto p-6 space-y-4"
                                style={{ maxHeight: "calc(80vh - 200px)" }}
                            >
                                {ticketResponse.length === 0 && (
                                    <p className="text-gray-500 text-center">No responses yet.</p>
                                )}

                                {ticketResponse.map((msg: any, idx: number) => (
                                    <div
                                        key={msg.id ?? idx}
                                        className={`flex ${msg.senderRole === "USER" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-3 rounded-2xl shadow
                                            ${msg.senderRole === "USER"
                                                    ? "bg-blue-600 text-white rounded-br-none"
                                                    : "bg-white text-gray-900 border rounded-bl-none"
                                                }`}
                                        >
                                            <p>{msg.responseText}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {new Date(msg.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* No Reply Box */}
                        </div>
                    </div>

                </div>
            </div>

        </Sidebar>
    );
};

export default UserViewTicket;
