"use client";

import { useState } from "react";

const MainTable = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "商品1",
      sales: 60000000,
      cost: 35000000,
      additionalCosts: 3000000,
      promotionCosts: 16000000,
      abcCosts: 260000,
      operationCosts: 4200000,
    },
    {
      id: 2,
      name: "商品2",
      sales: 30000000,
      cost: 18000000,
      additionalCosts: 1500000,
      promotionCosts: 3500000,
      abcCosts: 878000,
      operationCosts: 2100000,
    },
    {
      id: 3,
      name: "商品3",
      sales: 10000000,
      cost: 3000000,
      additionalCosts: 500000,
      promotionCosts: 400000,
      abcCosts: 32000,
      operationCosts: 700000,
    },
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

  const calculateGrossMargin = (sales: number, cost: number) =>
    sales ? ((sales - cost) / sales) * 100 : 0;

  const calculateNetGrossProfit = (
    sales: number,
    cost: number,
    additionalCosts: number
  ) => sales - cost - additionalCosts;

  const calculateNetGrossMargin = (sales: number, netGrossProfit: number) =>
    sales > 0 ? (netGrossProfit / sales) * 100 : 0;

  const calculateSalesProfit = (
    sales: number,
    netGrossProfit: number,
    promotionCosts: number
  ) => netGrossProfit - promotionCosts;

  const calculateSalesProfitMargin = (sales: number, salesProfit: number) =>
    sales > 0 ? (salesProfit / sales) * 100 : 0;

  const calculateABCProfit = (salesProfit: number, abcCosts: number) =>
    salesProfit - abcCosts;

  const calculateABCProfitMargin = (sales: number, abcProfit: number) =>
    sales > 0 ? (abcProfit / sales) * 100 : 0;

  const calculateOperatingProfit = (
    abcProfit: number,
    operationCosts: number
  ) => abcProfit - operationCosts;

  const calculateOperatingProfitMargin = (
    sales: number,
    operatingProfit: number
  ) => (sales > 0 ? (operatingProfit / sales) * 100 : 0);

  return (
    <div className=" bg-gray-100">
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
                  {calculateGrossProfit(product.sales, product.cost)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                売上総利益率
              </td>
              {products.map((product) => {
                const grossMargin = calculateGrossMargin(
                  product.sales,
                  product.cost
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {grossMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>

            {/* 注文連動費 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                注文連動費
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.additionalCosts}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "additionalCosts",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>

            {/* 純粗利 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                純粗利
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {calculateNetGrossProfit(
                    product.sales,
                    product.cost,
                    product.additionalCosts
                  )}
                </td>
              ))}
            </tr>

            {/* 純粗利率 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                純粗利率
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const netGrossMargin = calculateNetGrossMargin(
                  product.sales,
                  netGrossProfit
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {netGrossMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>

            {/* 販促費 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                販促費
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.promotionCosts}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "promotionCosts",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>

            {/* 販売利益 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                販売利益
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {salesProfit}
                  </td>
                );
              })}
            </tr>
            {/* 販売利益率 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                販売利益率
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                const salesProfitMargin = calculateSalesProfitMargin(
                  product.sales,
                  salesProfit
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {salesProfitMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>

            {/* ABC */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ABC
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.abcCosts}
                    onChange={(e) =>
                      handleInputChange(product.id, "abcCosts", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>

            {/* ABC利益 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ABC利益
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                const abcProfit = calculateABCProfit(
                  salesProfit,
                  product.abcCosts
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {abcProfit}
                  </td>
                );
              })}
            </tr>

            {/* ABC利益率 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                ABC利益率
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                const abcProfit = calculateABCProfit(
                  salesProfit,
                  product.abcCosts
                );
                const abcProfitMargin = calculateABCProfitMargin(
                  product.sales,
                  abcProfit
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {abcProfitMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>

            {/* 運営費 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                運営費
              </td>
              {products.map((product) => (
                <td
                  key={product.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  <input
                    type="number"
                    value={product.operationCosts}
                    onChange={(e) =>
                      handleInputChange(
                        product.id,
                        "operationCosts",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </td>
              ))}
            </tr>

            {/* 商品ごとの営業利益 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                商品ごとの営業利益
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                const abcProfit = calculateABCProfit(
                  salesProfit,
                  product.abcCosts
                );
                const operatingProfit = calculateOperatingProfit(
                  abcProfit,
                  product.operationCosts
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {operatingProfit}
                  </td>
                );
              })}
            </tr>
            {/* 商品ごとの営業利益率 */}
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                商品ごとの営業利益率
              </td>
              {products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                const salesProfit = calculateSalesProfit(
                  product.sales,
                  netGrossProfit,
                  product.promotionCosts
                );
                const abcProfit = calculateABCProfit(
                  salesProfit,
                  product.abcCosts
                );
                const operatingProfit = calculateOperatingProfit(
                  abcProfit,
                  product.operationCosts
                );
                const operatingProfitMargin = calculateOperatingProfitMargin(
                  product.sales,
                  operatingProfit
                );
                return (
                  <td
                    key={product.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {operatingProfitMargin.toFixed(2)}%
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

export default MainTable;
