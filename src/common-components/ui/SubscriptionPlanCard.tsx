import React from "react";

interface PlanCardProps {
    plan: any;
    onSelect?: (plan: any) => void;
}

const SubscriptionPlanCard: React.FC<PlanCardProps> = ({ plan, onSelect }) => {
    return (
        <div
            className={`rounded-2xl shadow-lg border p-8 flex flex-col justify-between transition 
      ${plan.recommended
                    ? "bg-[#034078] text-white border-[#02345F]"
                    : "bg-white text-gray-800 border-gray-200"
                }`}
        >
            <div>
                {/* PLAN NAME BADGE */}
                <p
                    className={`text-sm mb-3 px-3 py-1 rounded-full w-fit 
          ${plan.recommended
                            ? "bg-white/25 text-white"
                            : "bg-[#034078]/10 text-[#034078]"
                        }`}
                >
                    {plan.planName}
                </p>

                {/* PRICE */}
                <p
                    className={`text-4xl font-bold ${plan.recommended ? "text-white" : "text-[#034078]"
                        }`}
                >
                    ₹{plan.planCost}
                </p>
                <p className="text-sm mb-6 opacity-80">{plan.planType}</p>

                {/* FEATURES */}
                <ul className="space-y-3">
                    {plan.description?.split(",").map((line: string, index: number) => (
                        <li key={index} className="flex gap-3 items-start">
                            <span
                                className={`font-bold ${plan.recommended ? "text-[#9FFFD7]" : "text-green-600"
                                    }`}
                            >
                                ✔
                            </span>
                            <span>{line.trim()}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* BUTTON */}
            {onSelect && (
                <button
                    onClick={() => onSelect(plan)}
                    className={`mt-8 w-full py-3 rounded-full font-semibold transition 
          ${plan.recommended
                            ? "bg-white text-[#034078] hover:bg-gray-100"
                            : "bg-[#034078] text-white hover:bg-[#02345F]"
                        }`}
                >
                    Choose Plan
                </button>
            )}
        </div>
    );
};

export default SubscriptionPlanCard;
