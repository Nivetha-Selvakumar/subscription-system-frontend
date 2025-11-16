import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sideBar";

import {
    SUPPORT_TICKET_VIEW_REQUEST
} from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";

import {
    SUPPORT_TICKET_EDIT_REQUEST
} from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketEditActionTypes";

import {
    SUPPORT_TICKET_RESPONSE_CREATE_REQUEST
} from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionType";

import showToast from "../../../common-components/ui/toastNotification";
import { ToastContainer } from "react-toastify";

const UserEditTicket = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { supportTicketView, supportTicketViewLoading } = useSelector(
        (state: any) => state.supportTicketViewReducer || {}
    );

    const { supportTicketResponseCreate } = useSelector(
        (state: any) => state.supportTicketResponseCreateReducer || {}
    );
    const { supportTicketEdit } = useSelector(
        (state: any) => state.supportTicketEditReducer || {}
    );

    const [subject, setSubject] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [responseText, setResponseText] = useState("");
    const [status, setStatus] = useState("");

    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    // Fetch Ticket
    const fetchTicket = useCallback(() => {
        dispatch({
            type: SUPPORT_TICKET_VIEW_REQUEST,
            payload: { targetTicketId: id },
        });
    }, [dispatch, id]);

    useEffect(() => {
        fetchTicket();
    }, [id, fetchTicket]);

    // Set Data
    useEffect(() => {
        const data = supportTicketView?.data;
        if (data) {
            setSubject(data.subject || "");
            setIssueDescription(data.issueDescription || "");
            setTicketStatus(data.ticketStatus || "");
            setStatus(data.status || "");
        }
    }, [supportTicketView]);

    // Auto Scroll
    const scrollToBottom = () => {
        if (!messagesContainerRef.current) return;
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
    };

    // Scroll on first load + new replies
    useEffect(() => {
        scrollToBottom();
    }, [supportTicketView]);

    // On Reply Added
    useEffect(() => {
        if (supportTicketResponseCreate?.code === 200 || supportTicketResponseCreate?.code === 201) {
            showToast("Reply added successfully!", "success", "User-Ticket-Update");
            dispatch({ type: "SUPPORT_TICKET_RESPONSE_CREATE_CLEAR" });
            fetchTicket();
            setResponseText("");
            setTimeout(scrollToBottom, 200);
        }
    }, [supportTicketResponseCreate, dispatch, fetchTicket]);

    // On Reply Added
    useEffect(() => {
        if (supportTicketEdit?.code === 200 || supportTicketEdit?.code === 201) {
            showToast("Ticket updated!", "success", "User-Ticket-Update");
            dispatch({ type: "SUPPORT_TICKET_EDIT_CLEAR" });
            fetchTicket();
            setResponseText("");
            setTimeout(scrollToBottom, 200);
        }
    }, [supportTicketEdit, dispatch, fetchTicket]);


    if (supportTicketViewLoading) {
        return (
            <Sidebar>
                <ToastContainer containerId={"User-Ticket-Update"} />
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </Sidebar>
        );
    }

    const data = supportTicketView?.data || {};
    const ticketResponse = data.ticketResponse || [];

    // UPDATE TICKET
    const handleUpdate = () => {
        dispatch({
            type: SUPPORT_TICKET_EDIT_REQUEST,
            payload: {
                targetTicketId: id,
                body: {
                    subject,
                    issueDescription,
                    ticketStatus,
                    status,
                }
            },
        });
    };

    // SEND REPLY
    const handleSendResponse = () => {
        if (!responseText.trim()) return;

        dispatch({
            type: SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
            payload: {
                targetTicketId: id,
                body: { responseText },
            },
        });
    };

    return (
        <Sidebar>
            <ToastContainer containerId={"User-Ticket-Update"} />

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">Edit Support Ticket</h1>

                        <button
                            onClick={() => navigate(`/user/supportTicket/view/${id}`)}
                            className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                        >
                            Back
                        </button>
                    </div>

                    {/* MAIN SPLIT SECTIONS */}
                    <div className="flex flex-1">

                        {/* LEFT SIDE - Ticket Form */}
                        <div className="w-1/2 border-r p-6 overflow-y-auto"
                            style={{ maxHeight: "calc(80vh - 100px)" }}>

                            <div className="space-y-6">

                                {/* Subject */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Subject</label>
                                    <input
                                        className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Issue Description</label>
                                    <textarea
                                        rows={4}
                                        className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                                        value={issueDescription}
                                        onChange={(e) => setIssueDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                {/* Ticket Status */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Ticket Status</label>
                                    <select
                                        className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                                        value={ticketStatus}
                                        onChange={(e) => setTicketStatus(e.target.value)}
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In-Progress">In Progress</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Expired">Expired</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="text-sm font-semibold text-gray-700">Status</label>
                                    <select
                                        className="w-full mt-2 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}

                                    >
                                        <option value="INACTIVE">INACTIVE</option>
                                        <option value="ACTIVE">ACTIVE</option>

                                    </select>
                                </div>

                                <button
                                    onClick={handleUpdate}
                                    className="px-6 py-3 bg-[#034078] text-white font-semibold rounded-lg shadow hover:bg-[#02345f]"
                                >
                                    Update Ticket
                                </button>

                            </div>
                        </div>

                        {/* RIGHT SIDE - Chat */}
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

                                <div ref={messageEndRef}></div>
                            </div>

                            {/* Reply Box */}
                            <div className="p-4 border-t flex gap-3 bg-white">
                                <textarea
                                    rows={2}
                                    className="flex-1 p-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your reply..."
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                ></textarea>

                                <button
                                    onClick={handleSendResponse}
                                    className="px-5 py-2 bg-[#034078] text-white rounded-lg"
                                >
                                    Send
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </Sidebar>
    );
};

export default UserEditTicket;
