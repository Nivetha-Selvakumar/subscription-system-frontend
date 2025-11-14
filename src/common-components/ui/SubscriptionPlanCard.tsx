import React from "react";

interface PlanCardProps {
    plan: any;
    onSelect?: (plan: any) => void;
}

const SubscriptionPlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
    return (
        <div
            className={`rounded-2xl shadow-lg border p-8 flex flex-col justify-between 
      ${plan.recommended ? "bg-[#053c57] text-white" : "bg-white text-gray-800"}`}
        >
            <div>
                <p className={`text-sm mb-3 px-3 py-1 rounded-full w-fit 
          ${plan.recommended ? "bg-white/20" : "bg-gray-200 text-gray-800"}`}>
                    {plan.planName}
                </p>

                <p className="text-4xl font-bold">{`₹${plan.planCost}`}</p>
                <p className="text-sm mb-6">{plan.planType}</p>

                <ul className="space-y-3">
                    {plan.description?.split(",").map((line: string, index: number) => (
                        <li key={index} className="flex gap-3 items-start">
                            <span className="text-green-500 font-bold">✔</span>
                            <span>{line.trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {onSelect && (
                <button
                    onClick={() => onSelect(plan)}
                    className={`mt-8 w-full py-3 rounded-full font-semibold
            ${plan.recommended ? "bg-white text-[#053c57]" : "bg-teal-600 text-white hover:bg-teal-700"}`}
                >
                    Choose Plan
                </button>
            )}
        </div>
    );
};

export default SubscriptionPlanCard;
