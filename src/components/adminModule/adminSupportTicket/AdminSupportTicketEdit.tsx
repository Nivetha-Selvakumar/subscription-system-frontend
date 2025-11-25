import React, { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";

import { SUPPORT_TICKET_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";
import { SUPPORT_TICKET_EDIT_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketEditActionTypes";
import { SUPPORT_TICKET_RESPONSE_CREATE_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketResponseCreateActionTypes";

import showToast from "../../../common-components/ui/toastNotification";
import { ToastContainer } from "react-toastify";

const AdminSupportTicketEdit = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { supportTicketView } = useSelector((s: any) => s.supportTicketViewReducer);
    const { supportTicketEdit } = useSelector((s: any) => s.supportTicketEditReducer);
    const { supportTicketResponseCreate } = useSelector((s: any) => s.supportTicketResponseCreateReducer);

    const [subject, setSubject] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [ticketStatus, setTicketStatus] = useState("");
    const [status, setStatus] = useState("");
    const [responseText, setResponseText] = useState("");

    const chatRef = useRef<HTMLDivElement | null>(null);

    const fetchTicket = useCallback(() => {
        dispatch({
            type: SUPPORT_TICKET_VIEW_REQUEST,
            payload: { targetTicketId: id },
        });
    }, [dispatch, id]);

    useEffect(() => { fetchTicket(); }, [fetchTicket]);

    // Set form values from API
    useEffect(() => {
        const data = supportTicketView?.data;
        if (data) {
            setSubject(data.subject || "");
            setIssueDescription(data.issueDescription || "");
            setTicketStatus(data.ticketStatus || "");
            setStatus(data.status || "");
        }
    }, [supportTicketView]);

    // Handle EDIT success
    useEffect(() => {
        if (supportTicketEdit?.code === 200) {
            showToast("Ticket Updated!", "success", "Admin-Ticket");
            fetchTicket();
        }
    }, [supportTicketEdit, fetchTicket]);

    // Handle reply success
    useEffect(() => {
        if (supportTicketResponseCreate?.code === 200 || supportTicketResponseCreate?.code === 201) {
            showToast("Reply Sent!", "success", "Admin-Ticket");
            setResponseText("");
            fetchTicket();
            setTimeout(() => chatRef.current?.scrollTo(0, chatRef.current.scrollHeight), 200);
        }
    }, [supportTicketResponseCreate, fetchTicket]);

    const data = supportTicketView?.data || {};
    const responses = data.ticketResponse || [];

    const updateTicket = () => {
        dispatch({
            type: SUPPORT_TICKET_EDIT_REQUEST,
            payload: {
                targetTicketId: id,
                body: { subject, issueDescription, ticketStatus, status }
            }
        });
    };

    const sendReply = () => {
        if (!responseText.trim()) return;
        dispatch({
            type: SUPPORT_TICKET_RESPONSE_CREATE_REQUEST,
            payload: {
                targetTicketId: id,
                body: { responseText }
            }
        });
    };

    return (
        <Sidebar>
            <ToastContainer containerId="Admin-Ticket" />

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
                <div className="max-w-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* HEADER */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">Edit Support Ticket</h1>
                        <button className="px-4 py-2 rounded-lg border"
                            onClick={() => navigate(`/admin/supportTicket/view/${id}`)}>
                            Back
                        </button>
                    </div>

                    <div className="flex flex-1">

                        {/* LEFT FORM */}
                        <div className="w-1/2 p-6 border-r space-y-6 overflow-y-auto"
                            style={{ maxHeight: "calc(80vh - 100px)" }}>

                            <div>
                                <label className="text-sm font-semibold">Subject</label>
                                <input className="w-full mt-2 px-4 py-3 border rounded-lg"
                                    disabled
                                    value={subject} onChange={(e) => setSubject(e.target.value)} />
                            </div>

                            <div>
                                <label className="text-sm font-semibold">Issue Description</label>
                                <textarea rows={4} className="w-full mt-2 px-4 py-3 border rounded-lg"
                                    value={issueDescription}
                                    disabled
                                    onChange={(e) => setIssueDescription(e.target.value)} />
                            </div>

                            <div>
                                <label className="text-sm font-semibold">Ticket Status</label>
                                <select className="w-full mt-2 px-4 py-3 border rounded-lg"
                                    value={ticketStatus}
                                    onChange={(e) => setTicketStatus(e.target.value)}>
                                    <option value="OPEN">Open</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm font-semibold">Status</label>
                                <select className="w-full mt-2 px-4 py-3 border rounded-lg"
                                    value={status}
                                    disabled
                                    onChange={(e) => setStatus(e.target.value)}>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="INACTIVE">INACTIVE</option>
                                </select>
                            </div>

                            <button
                                className="px-6 py-3 bg-[#034078] text-white font-semibold rounded-lg shadow hover:bg-[#02345f]"
                                onClick={updateTicket}
                            >
                                Update Ticket
                            </button>

                        </div>

                        {/* RIGHT CHAT */}
                        <div className="w-1/2 flex flex-col">

                            {/* CHAT AREA */}
                            <div
                                ref={chatRef}
                                className="flex-1 overflow-y-auto p-6 space-y-4"
                                style={{ maxHeight: "calc(80vh - 200px)" }}
                            >
                                {Object.entries(
                                    responses.reduce((acc: any, msg: any) => {
                                        const dateKey = new Date(msg.respondedAt).toDateString();
                                        if (!acc[dateKey]) acc[dateKey] = [];
                                        acc[dateKey].push(msg);
                                        return acc;
                                    }, {})
                                ).map(([dateKey, messages]: any) => (
                                    <div key={dateKey}>

                                        {/* DATE SEPARATOR */}
                                        <div className="flex justify-center my-3">
                                            <span className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs shadow">
                                                {new Date(dateKey).toLocaleDateString("en-IN", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        {/* MESSAGES */}
                                        {messages.map((msg: any, idx: number) => {
                                            const loggedInId = localStorage.getItem("user_id");
                                            const isMine = msg.responder?.id === loggedInId;

                                            return (
                                                <div
                                                    key={msg.id ?? idx}
                                                    className={`flex ${isMine ? "justify-end" : "justify-start"} my-2`}
                                                >
                                                    <div
                                                        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow 
                ${isMine
                                                                ? "bg-blue-600 text-white rounded-br-none"
                                                                : "bg-gray-100 text-gray-900 rounded-bl-none"
                                                            }
              `}
                                                    >
                                                        <p className="text-xs font-semibold opacity-80 mb-1">
                                                            {isMine
                                                                ? `You (${msg.responder?.firstName} ${msg.responder?.lastName})`
                                                                : `${msg.responder?.firstName} ${msg.responder?.lastName}`}
                                                        </p>

                                                        <p className="text-sm whitespace-pre-line">{msg.responseText}</p>

                                                        <p className="text-[10px] text-right opacity-70 mt-2">
                                                            {new Date(msg.respondedAt).toLocaleTimeString("en-IN", {
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

                            {/* Reply Box */}
                            <div className="p-4 border-t flex gap-3">
                                <textarea rows={2}
                                    className="flex-1 p-2 border rounded-lg bg-gray-50"
                                    placeholder="Type your reply..."
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                />
                                <button
                                    onClick={sendReply}
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

export default AdminSupportTicketEdit;
