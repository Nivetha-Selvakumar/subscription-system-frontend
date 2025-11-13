"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Formik, Form } from "formik";
import { Close } from "@mui/icons-material";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import DatePickerComponent from "../../../common-components/ui/datePickerRange";
import dayjs from "dayjs";

interface FeedbackFilterProps {
    isModalOpen: boolean;
    toggleModal: (open: boolean) => void;
    onChangeFilter: (filterData: any) => void;
    initialFilter: any;
}

const RATING_OPTIONS = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
];

const STATUS_OPTIONS = [
    { label: "Active", value: "ACTIVE" },
    { label: "Inactive", value: "INACTIVE" },
];

const FeedbackFilterModal: React.FC<FeedbackFilterProps> = ({
    isModalOpen,
    toggleModal,
    onChangeFilter,
    initialFilter,
}) => {
    const [startDate, setStartDate] = useState<Date | null>(
        initialFilter?.startDate ? new Date(initialFilter.startDate) : null
    );

    const [endDate, setEndDate] = useState<Date | null>(
        initialFilter?.endDate ? new Date(initialFilter.endDate) : null
    );

    // RESET values when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setStartDate(
                initialFilter?.startDate ? new Date(initialFilter.startDate) : null
            );
            setEndDate(
                initialFilter?.endDate ? new Date(initialFilter.endDate) : null
            );
        }
    }, [isModalOpen, initialFilter]);

    // Reset all values
    const handleReset = (resetForm: () => void) => {
        resetForm();
        setStartDate(null);
        setEndDate(null);
        onChangeFilter({});
        toggleModal(false);
    };

    const modalStyle = {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "#fff",
        boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
        borderRadius: "12px",
        maxHeight: "90vh",
        overflow: "auto",
        p: 0,
        fontFamily: '"Inter", sans-serif',
    };

    return (
        <Modal open={isModalOpen} onClose={() => { }}>
            <Box sx={modalStyle}>
                {/* Header */}
                <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
                    <h2 className="text-lg font-semibold text-gray-800">Feedback Filter</h2>
                    <Close
                        onClick={() => handleReset(() => { })}
                        sx={{ cursor: "pointer", color: "#444" }}
                    />
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        ratings: initialFilter?.ratings || "",
                        status: initialFilter?.status || "",
                    }}
                    onSubmit={(values, { resetForm }) => {

                        if ((startDate && !endDate) || (!startDate && endDate)) {
                            alert("Please select both start and end dates.");
                            return;
                        }

                        const payload = {
                            ...values,
                            startDate: startDate ? dayjs(startDate).startOf("day").toISOString() : "",
                            endDate: endDate ? dayjs(endDate).endOf("day").toISOString() : "",
                        };

                        onChangeFilter(payload);
                        toggleModal(false);
                        resetForm();
                    }}
                >

                    {({ values, handleChange, resetForm }) => (
                        <Form>
                            <div className="p-5 flex flex-col gap-4">
                                {/* Rating */}
                                <DynamicDropdown
                                    label="Ratings"
                                    name="ratings"
                                    value={values.ratings}
                                    onChange={handleChange}
                                    options={RATING_OPTIONS}
                                />

                                {/* Status */}
                                <DynamicDropdown
                                    label="Status"
                                    name="status"
                                    value={values.status}
                                    onChange={handleChange}
                                    options={STATUS_OPTIONS}
                                />

                                {/* Date Range */}
                                <DatePickerComponent
                                    initialStartDate={startDate}
                                    initialEndDate={endDate}
                                    onStartChange={(d) => setStartDate(d)}
                                    onEndChange={(d) => setEndDate(d)}
                                />

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end items-center gap-3 border-t border-gray-200 bg-gray-50 px-5 py-3 rounded-b-md">
                                <button
                                    type="button"
                                    onClick={() => handleReset(resetForm)}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
                                >
                                    Reset
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default FeedbackFilterModal;
