import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

/**
 * Expected actions:
 * - USER_TICKET_DETAILS_REQUEST (payload: { ticketId })
 * - USER_TICKET_MESSAGES_REQUEST (payload: { ticketId })
 * - USER_TICKET_SEND_MESSAGE_REQUEST (payload: { ticketId, message })
 * - USER_TICKET_CLOSE_REQUEST (payload: { ticketId })  // user can close as well
 *
 * Reducers used:
 * - state.userTicketDetailsReducer.ticket
 * - state.userTicketMessagesReducer.messages (array)
 */

const POLL_INTERVAL = 5000; // 5s polling for new messages

const UserTicketConversation: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ticketId } = useParams<{ ticketId: string }>();
    const { ticket } = useSelector((state: any) => state.userTicketDetailsReducer || {});
    const { messages = [] } = useSelector((state: any) => state.userTicketMessagesReducer || {});
    const [autoPoll, setAutoPoll] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ticketId) return;
        dispatch({ type: "USER_TICKET_DETAILS_REQUEST", payload: { ticketId } });
        dispatch({ type: "USER_TICKET_MESSAGES_REQUEST", payload: { ticketId } });

        let id: any;
        if (autoPoll) {
            id = setInterval(() => {
                dispatch({ type: "USER_TICKET_MESSAGES_REQUEST", payload: { ticketId } });
            }, POLL_INTERVAL);
        }
        return () => {
            if (id) clearInterval(id);
        };
    }, [dispatch, ticketId, autoPoll]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!ticketId) return null;

    const canEdit = ticket?.status === "OPEN";

    return (
        <Sidebar>
            <div className="p-8 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-semibold">Ticket: {ticket?.subject || ticketId}</h2>
                        <div className="text-sm text-gray-500">Status: {ticket?.status}</div>
                    </div>

                    <div className="flex gap-2">
                        {ticket?.status === "OPEN" && (
                            <button
                                onClick={() => navigate(`/user/tickets/edit/${ticketId}`)}
                                className="px-3 py-1 border rounded"
                            >
                                Edit
                            </button>
                        )}

                        {ticket?.status === "OPEN" && (
                            <button
                                onClick={() => dispatch({ type: "USER_TICKET_CLOSE_REQUEST", payload: { ticketId } })}
                                className="px-3 py-1 bg-red-600 text-white rounded"
                            >
                                Close
                            </button>
                        )}
                    </div>
                </div>

                {/* Conversation box */}
                <div className="bg-white border rounded p-4 mb-4 h-[60vh] overflow-auto">
                    {messages.length === 0 ? (
                        <div className="text-gray-500">No messages yet.</div>
                    ) : (
                        messages.map((m: any, idx: number) => {
                            const isUser = m.senderType === "USER";
                            return (
                                <div key={m.messageId || idx} className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[75%] p-3 rounded-lg ${isUser ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                                        <div className="text-sm">{m.message}</div>
                                        <div className="text-xs text-gray-300 mt-2">{new Date(m.createdAt).toLocaleString()}</div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Send message form */}
                {ticket?.status !== "CLOSED" ? (
                    <Formik
                        initialValues={{ message: "" }}
                        onSubmit={(values, { resetForm }) => {
                            if (!values.message.trim()) return;
                            dispatch({ type: "USER_TICKET_SEND_MESSAGE_REQUEST", payload: { ticketId, message: values.message } });
                            resetForm();
                        }}
                    >
                        {({ values, handleChange }) => (
                            <Form className="flex gap-3 items-center">
                                <input
                                    name="message"
                                    value={values.message}
                                    onChange={handleChange}
                                    placeholder="Write a message..."
                                    className="flex-1 border rounded px-3 py-2"
                                />
                                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
                                    Send
                                </button>
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <div className="text-gray-600">This ticket is closed — no more messages can be sent.</div>
                )}
            </div>
        </Sidebar>
    );
};

export default UserTicketConversation;
