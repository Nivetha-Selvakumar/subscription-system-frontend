import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../layout/sideBar";
import DynamicInput from "../../../common-components/ui/dynamicInput";
import DynamicDropdown from "../../../common-components/ui/dynamicDropdown";
import showToast from "../../../common-components/ui/toastNotification";

// ✅ Redux Action Types
import { PLAN_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanViewActionTypes";
import { PLAN_EDIT_REQUEST, PLAN_EDIT_CLEAR } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanEditActionTypes";

// ✅ Validation Schema
const validationSchema = Yup.object().shape({
  planName: Yup.string().required("Plan name is required"),
  planType: Yup.string().required("Plan type is required"),
  planCost: Yup.number()
    .typeError("Cost must be a number")
    .required("Plan cost is required"),
  description: Yup.string().nullable(),
  status: Yup.string().required("Status is required"),
});

// ✅ Dropdown options
const planTypeOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
  { label: "Delete", value: "DELETE" },
];

const AdminEditPlan: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { planView } = useSelector(
    (state: any) => state.planViewReducer || {}
  );

  const { planEdit, planEditLoading } = useSelector(
    (state: any) => state.planEditReducer || {}
  );

  const [initialValues, setInitialValues] = useState({
    planName: "",
    planType: "",
    planCost: "",
    description: "",
    status: "ACTIVE",
  });

  const hasFetched = useRef(false);

  // ✅ Fetch plan details initially
  useEffect(() => {
    if (id && !hasFetched.current) {
      hasFetched.current = true;
      dispatch({ type: PLAN_VIEW_REQUEST, payload: { planId: id } });
    }
  }, [id, dispatch]);

  // ✅ Set form values when API returns data
  useEffect(() => {
    if (planView?.data) {
      const p = planView.data;
      setInitialValues({
        planName: p.planName || "",
        planType: p.planType?.toLowerCase() || "",
        planCost: p.planCost || "",
        description: p.description || "",
        status: p.status?.toUpperCase() || "ACTIVE",
      });
    }
  }, [planView]);

  // ✅ Handle submit
  const handleSubmit = (values: any) => {
    const adminId = localStorage.getItem("user_id");

    const payload = {
      planName: values.planName,
      planType: values.planType.toUpperCase(),
      planCost: values.planCost,
      description: values.description,
      status: values.status.toUpperCase(),
    };

    dispatch({
      type: PLAN_EDIT_REQUEST,
      payload: {
        adminUserId: adminId,
        targetPlanId: id,
        payload,
      },
    });
  };

  // ✅ Toast & redirect after success
  useEffect(() => {
    if (planEdit?.code === 200) {
      showToast("Plan updated successfully", "success", "EditPlan-Container");
      dispatch({ type: PLAN_EDIT_CLEAR });
      setTimeout(() => {
        navigate("/admin/plans");
      }, 2000);
    }
  }, [planEdit, dispatch, navigate]);

  useEffect(() => {
    document.title = "Subscription | Admin Plan";
  }, []);

  return (
    <Sidebar>
      <ToastContainer containerId="EditPlan-Container" />
      <div className="flex justify-center items-start w-full min-h-screen bg-gray-50">
        <div className="max-w-4xl-[75rem] w-full bg-white rounded-lg shadow flex flex-col h-[80vh] my-8">
          <h1 className="text-2xl font-bold text-gray-900 px-6 pt-6">
            Edit Plan
          </h1>

          <div className="flex flex-col flex-1 overflow-y-auto px-6 pt-6">
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicInput
                      type="text"
                      label="Plan Name"
                      name="planName"
                      value={values.planName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.planName}
                      touched={touched.planName}
                    />

                    <DynamicDropdown
                      label="Plan Type"
                      name="planType"
                      value={values.planType}
                      onChange={(e: any) =>
                        setFieldValue("planType", e.target.value)
                      }
                      onBlur={handleBlur}
                      error={errors.planType}
                      touched={touched.planType}
                      options={planTypeOptions}
                    />

                    <DynamicInput
                      type="number"
                      label="Plan Cost"
                      name="planCost"
                      value={values.planCost}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.planCost}
                      touched={touched.planCost}
                    />

                    <DynamicDropdown
                      label="Status"
                      name="status"
                      value={values.status}
                      onChange={(e: any) =>
                        setFieldValue("status", e.target.value)
                      }
                      onBlur={handleBlur}
                      error={errors.status}
                      touched={touched.status}
                      options={statusOptions}
                    />

                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={3}
                        className={`w-full px-3 py-2 text-sm border rounded-md outline-none ${errors.description && touched.description
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                    </div>
                  </div>

                  <div className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end gap-4 px-6 py-4 mt-auto">
                    <button
                      type="button"
                      onClick={() => navigate("/admin/plans")}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={planEditLoading}
                      className={`px-4 py-2 text-sm font-medium text-white rounded-md ${planEditLoading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                      {planEditLoading ? "Saving..." : "Save Changes"}
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

export default AdminEditPlan;
