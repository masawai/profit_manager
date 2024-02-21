"use client";

import Header from "@/components/Header";
import { useState } from "react";

const Spreadsheet = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "商品1", sales: "", cost: "" },
    { id: 2, name: "商品2", sales: "", cost: "" },
    { id: 3, name: "商品3", sales: "", cost: "" },
  ]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const calculateGrossProfit = (sales: number, cost: number): number =>
    sales - cost;

  const calculateGrossMargin = (sales: number, cost: number): number =>
    sales ? ((sales - cost) / sales) * 100 : 0;

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />
      <div className="overflow-x-auto w-full">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          5段階利益管理表
        </h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                項目
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                売上
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.sales}
                    onChange={(e) =>
                      handleInputChange(product.id, "sales", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                原価
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.cost}
                    onChange={(e) =>
                      handleInputChange(product.id, "cost", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                売上総利益(粗利)
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {calculateGrossProfit(
                    parseFloat(product.sales),
                    parseFloat(product.cost)
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                売上総利益率
              </td>
              {products.map((product) => {
                const grossMargin = calculateGrossMargin(
                  parseFloat(product.sales),
                  parseFloat(product.cost)
                );
                const textColorClass =
                  grossMargin < 50 ? "text-red-500" : "text-gray-500";
                return (
                  <td
                    key={product.id}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${textColorClass}`}
                  >
                    {grossMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Spreadsheet;
