import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../layout/sideBar";
import DynamicInput from "../../../common-components/ui/dynamicInput";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import showToast from "../../../common-components/ui/toastNotification";
import "../../../styles/AdminModule/AdminUser/userList.scss";

const validationSchema = Yup.object().shape({
	planName: Yup.string().required("Plan name is required"),
	planType: Yup.string().required("Plan type is required"),
	cost: Yup.number().typeError("Cost must be a number").required("Cost is required"),
	status: Yup.string().required("Status is required"),
});

const PLAN_TYPES = [
	{ label: "Monthly", value: "Monthly" },
	{ label: "Yearly", value: "Yearly" },
	{ label: "One-time", value: "One-time" },
];

const STATUS = [
	{ label: "Active", value: "Active" },
	{ label: "Inactive", value: "Inactive" },
];

const initialValues = {
	planName: "",
	planType: "",
	cost: "",
	status: "Active",
	description: "",
};

const AdminAddPlan: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { planCreate, planCreateLoading } = useSelector(
		(state: any) => state.planCreateReducer || {}
	);

	const handleSubmit = (values: any) => {
		const payload = {
			name: values.planName,
			type: values.planType,
			cost: Number(values.cost),
			status: values.status,
			description: values.description || null,
		};

		dispatch({ type: "PLAN_CREATE_REQUEST", payload });
	};

	useEffect(() => {
		if (planCreate?.code === 201 || planCreate?.code === 200) {
			showToast("Plan created successfully", "success", "AddPlan-Container");
			dispatch({ type: "PLAN_CREATE_CLEAR" });
			setTimeout(() => {
				window.location.href = `/admin/plans`;
			}, 2000);
		}
	}, [planCreate, dispatch, navigate]);

	return (
		<Sidebar>
			<div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
				<div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
					<h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">Add New Plan</h1>
					<div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
							{({ values, errors, touched, handleChange, handleBlur }) => (
								<Form>
									<div className="grid grid-cols-2 gap-4">
										<DynamicInput
											label="Plan Name"
											name="planName"
											value={values.planName}
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="Enter plan name"
											error={touched.planName && errors.planName ? String(errors.planName) : ""}
										/>
										<DynamicDropdown
											label="Plan Type"
											name="planType"
											value={values.planType}
											onChange={handleChange}
											options={PLAN_TYPES}
										/>
										<DynamicInput
											label="Cost"
											name="cost"
											type="number"
											value={values.cost}
											onChange={handleChange}
											onBlur={handleBlur}
											placeholder="0"
											error={touched.cost && errors.cost ? String(errors.cost) : ""}
										/>
										<DynamicDropdown
											label="Status"
											name="status"
											value={values.status}
											onChange={handleChange}
											options={STATUS}
										/>
									</div>
									<div className="mt-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
										<textarea
											name="description"
											value={values.description}
											onChange={handleChange}
											placeholder="Optional description"
											className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
											rows={4}
										/>
									</div>

									<div className="flex justify-end gap-3 py-6">
										<button
											type="button"
											onClick={() => navigate("/admin/plans")}
											className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100"
										>
											Cancel
										</button>
										<button
											type="submit"
											disabled={!!planCreateLoading}
											className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-60"
										>
											{planCreateLoading ? "Saving..." : "Save Plan"}
										</button>
									</div>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</Sidebar>
	);
};

export default AdminAddPlan;

