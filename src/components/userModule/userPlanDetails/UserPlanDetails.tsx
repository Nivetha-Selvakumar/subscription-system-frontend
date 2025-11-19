import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { PLAN_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes";
import SubscriptionPlanCard from "../../../common-components/ui/SubscriptionPlanCard";
import { useNavigate } from "react-router-dom";

const UserPlanDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");

  const { planList } = useSelector((state: any) => state.planListReducer || {});

  useEffect(() => {
    dispatch({ type: PLAN_LIST_REQUEST, payload: {} });
  }, [dispatch]);

  const plans = planList?.data?.data || [];

  const filteredPlans = plans.filter((p: any) =>
    billing === "monthly"
      ? p.planType?.toLowerCase() === "monthly"
      : p.planType?.toLowerCase() === "yearly"
  );

  const onChoosePlan = (plan: any) => {
    navigate(`/user/plan/payment/${plan.id}`, {
      state: { plan },  // send object
    });
  };
  return (
    <Sidebar>
      <div className="min-h-screen bg-[#e9f3f6] px-8 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0b3d52]">Choose Your Plan</h1>
            <p className="text-sm text-gray-600 mt-1">
              Best plans curated for your subscription needs.
            </p>
          </div>

          <div className="bg-white shadow px-2 py-1 rounded-full flex gap-2">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition
      ${billing === "monthly"
                  ? "bg-[#034078] text-white"
                  : "text-[#034078]"
                }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition
      ${billing === "yearly"
                  ? "bg-[#034078] text-white"
                  : "text-[#034078]"
                }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPlans.length ? (
            filteredPlans.map((plan: any) => (
              <SubscriptionPlanCard
                key={plan.id}
                plan={plan}
                onSelect={onChoosePlan}
              />
            ))
          ) : (
            <p className="text-gray-600">No plans available.</p>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default UserPlanDetails;