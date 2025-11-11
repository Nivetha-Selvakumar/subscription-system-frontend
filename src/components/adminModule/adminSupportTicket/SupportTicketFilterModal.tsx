"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Formik, Form } from "formik";
import dayjs from "dayjs";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import DatePickerComponent from "../../../common-components/ui/datePickerRange";

interface SupportTicketFilterProps {
  isModalOpen: boolean;
  toggleModal: (open: boolean) => void;
  onChangeFilter: (filterData: any) => void;
  initialFilter: any;
}

const STATUS_OPTIONS = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Resolved", value: "resolved" },
];

const SupportTicketFilterModal: React.FC<SupportTicketFilterProps> = ({
  isModalOpen,
  toggleModal,
  onChangeFilter,
  initialFilter,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(initialFilter?.status || "");
  const [startDate, setStartDate] = useState<Date | null>(
    initialFilter?.startDate ? new Date(initialFilter.startDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialFilter?.endDate ? new Date(initialFilter.endDate) : null
  );

  useEffect(() => {
    if (isModalOpen) {
      setSelectedStatus(initialFilter?.status || "");
      setStartDate(initialFilter?.startDate ? new Date(initialFilter.startDate) : null);
      setEndDate(initialFilter?.endDate ? new Date(initialFilter.endDate) : null);
    }
  }, [isModalOpen, initialFilter]);

  const handleReset = (resetForm: () => void) => {
    resetForm();
    setSelectedStatus("");
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
    width: 520,
    bgcolor: "#fff",
    boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
    borderRadius: "12px",
    maxHeight: "90vh",
    overflow: "auto",
    p: 0,
    fontFamily: '"Inter", sans-serif',
  };

  return (
    <Modal open={isModalOpen} onClose={() => {}} disableEscapeKeyDown aria-labelledby="support-ticket-filter">
      <Box sx={modalStyle}>
        <div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
          <h2 className="text-lg font-semibold text-gray-800">Support Ticket Filter</h2>
          <Close onClick={() => handleReset(() => {})} sx={{ cursor: "pointer", color: "#444" }} />
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            status: selectedStatus,
          }}
          onSubmit={(values, { resetForm }) => {
            if ((startDate && !endDate) || (!startDate && endDate)) {
              alert("Please select both start and end dates.");
              return;
            }

            const transformed = {
              status: values.status,
              startDate: startDate ? dayjs(startDate).startOf("day").toISOString() : "",
              endDate: endDate ? dayjs(endDate).endOf("day").toISOString() : "",
            };

            onChangeFilter(transformed);
            toggleModal(false);
            resetForm();
          }}
        >
          {({ values, handleChange, resetForm }) => (
            <Form>
              <div className="p-5 flex flex-col gap-4">
                <DynamicDropdown
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={(event: any) => {
                    handleChange(event);
                    setSelectedStatus(event.target.value);
                  }}
                  options={STATUS_OPTIONS}
                />

                <DatePickerComponent
                  initialStartDate={startDate}
                  initialEndDate={endDate}
                  onStartChange={date => setStartDate(date)}
                  onEndChange={date => setEndDate(date)}
                />
              </div>

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

export default SupportTicketFilterModal;

