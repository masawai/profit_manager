import Tooltip from "@/components/Tooltip";
import React from "react";

interface TableRowProps {
  label: string;
  values: string[]; // 合計値を除く全ての値
  totalValue: string; // 新しい合計値のプロパティ
  readOnly?: boolean;
  onValueChange?: (index: number, value: string) => void;
  tooltipText?: string;
}

const TableRow: React.FC<TableRowProps> = ({
  label,
  values,
  totalValue, // 合計値を受け取る
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
      <td className="px-6 py-4 whitespace-pre-line text-sm text-gray-900">
        {tooltipText ? <Tooltip text={tooltipText}>{label}</Tooltip> : label}
      </td>
      {/* 合計値の列 */}
      <td className={readonlyInputClass}>
        <span>{totalValue}</span>
      </td>
      {/* 商品の値の列 */}
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
