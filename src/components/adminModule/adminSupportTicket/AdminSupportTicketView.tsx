import React, { useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../layout/sideBar";

import { SUPPORT_TICKET_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminSupportTicket/adminSupportTicketViewActionTypes";

const AdminSupportTicketView = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const messagesRef = useRef<HTMLDivElement | null>(null);

    const { supportTicketView, supportTicketViewLoading } = useSelector(
        (s: any) => s.supportTicketViewReducer || {}
    );

    const fetchData = useCallback(() => {
        dispatch({
            type: SUPPORT_TICKET_VIEW_REQUEST,
            payload: { targetTicketId: id },
        });
    }, [dispatch, id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Scroll
    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop =
                messagesRef.current.scrollHeight;
        }
    }, [supportTicketView]);

    if (supportTicketViewLoading) {
        return (
            <Sidebar>
                <div className="flex justify-center items-center min-h-screen">
                    <p>Loading...</p>
                </div>
            </Sidebar>
        );
    }

    const data = supportTicketView?.data || {};
    const responses = data.ticketResponse || [];

    return (
        <Sidebar>

            <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">

                <div className="max-w-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">

                    {/* HEADER */}
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">View Support Ticket</h1>

                        <div className="flex gap-3">
                            <button
                                className="px-4 py-2 rounded-lg border"
                                onClick={() => navigate("/admin/adminSupportTicket")}
                            >
                                Back
                            </button>

                            <button
                                className="px-4 py-2 rounded-lg border bg-blue-600 text-white"
                                onClick={() => navigate(`/admin/supportTicket/edit/${id}`)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-1">

                        {/* LEFT PANEL */}
                        <div className="w-1/2 border-r p-6 space-y-6 overflow-y-auto">

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Subject</label>
                                <input disabled className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-lg"
                                    value={data.subject || ""} />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Issue Description</label>
                                <textarea
                                    disabled
                                    rows={4}
                                    className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-lg"
                                    value={data.issueDescription || ""}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-semibold text-gray-700">Status</label>
                                <input disabled className="w-full mt-2 px-4 py-3 bg-gray-100 border rounded-lg"
                                    value={data.ticketStatus || ""} />
                            </div>

                        </div>

                        {/* RIGHT CHAT */}
                        <div className="w-1/2 flex flex-col">

                            <div
                                ref={messagesRef}
                                className="flex-1 p-6 overflow-y-auto space-y-4"
                                style={{ maxHeight: "calc(80vh - 200px)" }}
                            >
                                {responses.length === 0 && (
                                    <p className="text-gray-500 text-center">No responses yet.</p>
                                )}

                                {responses.map((msg: any) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.senderRole === "ADMIN" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-xs px-4 py-3 rounded-2xl shadow
                      ${msg.senderRole === "ADMIN"
                                                    ? "bg-blue-600 text-white rounded-br-none"
                                                    : "bg-white border text-gray-900 rounded-bl-none"
                                                }`}
                                        >
                                            <p>{msg.responseText}</p>
                                            <p className="text-[10px] mt-1 text-gray-300">{msg.respondedAt}</p>
                                        </div>
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

export default AdminSupportTicketView;
