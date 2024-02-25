import Tooltip from "@/components/Tooltip";
import React from "react";

interface TableRowProps {
  label: string;
  values: number[];
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
  const handleChange = (index: number, value: string) => {
    if (onValueChange) {
      onValueChange(index, value);
    }
  };

  // 入力可能なフィールドのスタイル
  const editableInputClass =
    // "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

  // 入力不可能なフィールド（読み取り専用）のスタイル
  const readonlyInputClass =
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500";
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {tooltipText ? (
          <Tooltip text={tooltipText}>{label}</Tooltip> // ツールチップを使用
        ) : (
          label
        )}
      </td>
      {values.map((value, index) => (
        <td
          key={index}
          className={readOnly ? readonlyInputClass : editableInputClass}
        >
          {readOnly ? (
            <span>{isPercentage ? `${value.toFixed(2)}%` : value}</span>
          ) : (
            <input
              type="number"
              value={isPercentage ? `${value.toFixed(2)}%` : value.toString()}
              readOnly={readOnly}
              className="bg-white mt-1 block w-full rounded-md border-2 border-gray-200"
              onChange={(e) => handleChange(index, e.target.value)}
            />
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
