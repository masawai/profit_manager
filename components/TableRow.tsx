import Tooltip from "@/components/Tooltip";
import React from "react";

interface TableRowProps {
  label: string;
  values: string[]; // Changed from number[] to string[]
  isPercentage?: boolean;
  readOnly?: boolean;
  onValueChange?: (index: number, value: string) => void;
  tooltipText?: string;
}

const TableRow: React.FC<TableRowProps> = ({
  label,
  values,
  isPercentage = false,
  readOnly = false,
  onValueChange,
  tooltipText,
}) => {
  const handleBlur = (index: number, value: string) => {
    if (onValueChange) {
      onValueChange(index, value);
    }
  };

  const editableInputClass =
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  const readonlyInputClass =
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
  return (
    <tr>
      <td className="px-6 py-4 whitespace-pre-line text-sm font-medium text-gray-900">
        {tooltipText ? <Tooltip text={tooltipText}>{label}</Tooltip> : label}
      </td>
      {values.map((value, index) => (
        <td
          key={index}
          className={readOnly ? readonlyInputClass : editableInputClass}
        >
          {readOnly ? (
            <span>{value}</span>
          ) : (
            <input
              type="text"
              value={value}
              readOnly={readOnly}
              className="bg-white mt-1 block w-full rounded-md border-2 border-gray-200"
              onChange={(e) =>
                onValueChange && onValueChange(index, e.target.value)
              }
              onBlur={(e) => handleBlur(index, e.target.value)}
            />
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
