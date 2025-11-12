"use client";
import React, { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Formik, Form } from "formik";
import { Close } from "@mui/icons-material";
import "../../../styles/AdminModule/AdminUser/userList.scss";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";

interface PlanFilterProps {
	isModalOpen: boolean;
	toggleModal: (open: boolean) => void;
	onChangeFilter: (filterData: any) => void;
	initialFilter: any;
}

const PLAN_TYPES = [
	{ label: "Monthly", value: "Monthly" },
	{ label: "Yearly", value: "Yearly" },
];

const STATUS = [
	{ label: "Active", value: "Active" },
	{ label: "Inactive", value: "Inactive" },
];

const PlanFilterModal: React.FC<PlanFilterProps> = ({
	isModalOpen,
	toggleModal,
	onChangeFilter,
	initialFilter,
}) => {
	const [selectedPlanType, setSelectedPlanType] = useState(initialFilter?.planType || "");

	useEffect(() => {
		if (isModalOpen) {
			setSelectedPlanType(initialFilter?.planType || "");
		}
	}, [isModalOpen, initialFilter]);

	const handleReset = (resetForm: () => void) => {
		resetForm();
		setSelectedPlanType("");
		onChangeFilter({});
		toggleModal(false);
	};

	const modalStyle = {
		position: "absolute" as const,
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 680,
		bgcolor: "#fff",
		boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
		borderRadius: "12px",
		maxHeight: "90vh",
		overflow: "auto",
		p: 0,
		fontFamily: '"Inter", sans-serif',
	};

	return (
		<Modal
			open={isModalOpen}
			onClose={() => {}}
			disableEscapeKeyDown
			aria-labelledby="plan-filter-modal"
		>
			<Box sx={modalStyle}>
				{/* Header */}
				<div className="flex justify-between items-center px-5 py-3 border-b border-gray-200 bg-gray-50 rounded-t-md">
					<h2 className="text-lg font-semibold text-gray-800">Plan Filter</h2>
					<Close onClick={() => handleReset(() => {})} sx={{ cursor: "pointer", color: "#444" }} />
				</div>

				<Formik
					enableReinitialize
					initialValues={{
						planType: initialFilter?.planType || "",
						status: initialFilter?.status || "",
						costMin: initialFilter?.costMin || "",
						costMax: initialFilter?.costMax || "",
					}}
					onSubmit={(values, { resetForm }) => {
						// Optional: validate cost range
						if (values.costMin && values.costMax && Number(values.costMin) > Number(values.costMax)) {
							alert("Minimum cost cannot be greater than maximum cost.");
							return;
						}

						onChangeFilter({
							...values,
						});
						toggleModal(false);
						resetForm();
					}}
				>
					{({ values, handleChange, resetForm }) => (
						<Form>
							<div className="p-5 flex flex-col gap-4">
								<div className="grid grid-cols-2 gap-3">
									<DynamicDropdown
										label="Plan Type"
										name="planType"
										value={values.planType}
										onChange={(e: any) => {
											handleChange(e);
											setSelectedPlanType(e.target.value);
										}}
										options={PLAN_TYPES}
									/>
									<DynamicDropdown
										label="Status"
										name="status"
										value={values.status}
										onChange={handleChange}
										options={STATUS}
									/>
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Min Cost
										</label>
										<input
											type="number"
											name="costMin"
											value={values.costMin}
											onChange={handleChange}
											placeholder="0"
											className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">
											Max Cost
										</label>
										<input
											type="number"
											name="costMax"
											value={values.costMax}
											onChange={handleChange}
											placeholder="1000"
											className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
										/>
									</div>
								</div>
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

export default PlanFilterModal;

