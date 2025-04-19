import type { CustomTooltipProps } from "@/types";

export function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md text-xs">
        <p className="font-medium">{payload[0].payload.formattedDate}</p>
        <p className="text-gray-700">
          Rate:{" "}
          <span className="font-medium">{payload[0].value.toFixed(4)}</span>
        </p>
      </div>
    );
  }
  return null;
}
