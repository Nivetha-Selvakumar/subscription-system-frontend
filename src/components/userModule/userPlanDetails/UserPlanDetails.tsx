import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/sideBar";
import { useDispatch, useSelector } from "react-redux";
import { PLAN_LIST_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminPlan/adminPlanListActionTypes";
import SubscriptionPlanCard from "../../../common-components/ui/SubscriptionPlanCard";
import { useNavigate } from "react-router-dom";
import { USER_VIEW_REQUEST } from "../../../redux/actionTypes/AdminModule/AdminUsers/adminViewUserActionType";

const UserPlanDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [billing, setBilling] = useState("monthly");

  const { planList } = useSelector((state: any) => state.planListReducer || {});
  const { userView } = useSelector((state: any) => state.userViewReducer || {});
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscriptionAction, setSubscriptionAction] = useState<"" | "UPGRADE" | "DOWNGRADE" | "NONE">("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    dispatch({ type: PLAN_LIST_REQUEST });
  }, [dispatch]);

  const plans = planList?.data?.data || [];

  const filteredPlans = plans.filter((p: any) =>
    billing === "monthly"
      ? p.planType?.toLowerCase() === "monthly"
      : p.planType?.toLowerCase() === "yearly"
  );

  useEffect(() => {
    if (userId) {
      dispatch({ type: USER_VIEW_REQUEST, payload: { userId } });
    }
  }, [dispatch, userId]);

  const normalizeDate = (d: Date) => {
    d.setHours(0, 0, 0, 0);
    return d;
  };

  // 🔥 COST BASED LOGIC HERE
  useEffect(() => {
    if (!userView?.userDetails) return;

    const u = userView.userDetails;

    // 1️⃣ Not a Subscriber → Show "Choose Plan"
    if (u.role !== "Subscriber") {
      setSubscriptionAction("NONE");
      return;
    }

    // 2️⃣ Validate subscription period
    const today = normalizeDate(new Date());
    const start = normalizeDate(new Date(u.subStartDate));
    const end = normalizeDate(new Date(u.subEndDate));

    const isActivePeriod = today >= start && today <= end;
    if (!isActivePeriod) {
      setSubscriptionAction("NONE");
      return;
    }

    // 3️⃣ Current active plan cost
    const currentPlanCost = u.plan?.cost;
    if (!currentPlanCost) {
      setSubscriptionAction("NONE");
      return;
    }

    // Viewing plans → upgrade/downgrade decided inside card mapping
    setSubscriptionAction(""); // reset
  }, [userView, billing]);

  const onChoosePlan = (plan: any) => {
    navigate(`/user/plan/payment/${plan.id}`, { state: { plan } });
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-[#e9f3f6] px-8 py-10">

        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0b3d52]">Choose Your Plan</h1>
            <p className="text-sm text-gray-600 mt-1">Best plans curated for your subscription needs.</p>
          </div>

          <div className="bg-white shadow px-2 py-1 rounded-full flex gap-2">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-full font-medium ${billing === "monthly" ? "bg-[#034078] text-white" : "text-[#034078]"}`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`px-6 py-2 rounded-full font-medium ${billing === "yearly" ? "bg-[#034078] text-white" : "text-[#034078]"}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* PLAN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPlans.length ? (
            filteredPlans.map((plan: any) => {
              const u = userView?.userDetails;

              const currentPlanId = u?.plan?.id;

              // 🔥 Correct fields
              const currentCost = Number(u?.plan?.cost);       // 300.0
              const selectedCost = Number(plan.planCost);      // "300.0" → 300

              let cardAction: "UPGRADE" | "DOWNGRADE" | "NONE" | "CURRENT" = "NONE";

              // ⭐ Current Plan
              if (plan.id === currentPlanId) {
                cardAction = "CURRENT";
              }
              // ⭐ Upgrade
              else if (selectedCost > currentCost) {
                cardAction = "UPGRADE";
              }
              // ⭐ Downgrade
              else if (selectedCost < currentCost) {
                cardAction = "DOWNGRADE";
              }
              else {
                cardAction = "NONE";
              }

              return (
                <SubscriptionPlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={onChoosePlan}
                  subscriptionAction={cardAction}
                />
              );
            })

          ) : (
            <p className="text-gray-600">No plans available.</p>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

export default UserPlanDetails;
