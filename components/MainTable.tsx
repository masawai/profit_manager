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

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    productId: null as number | null,
  });

  const handleInputChange = (id: number, field: string, value: string) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const addNewProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: `商品${products.length + 1}`,
      sales: 0,
      cost: 0,
      additionalCosts: 0,
      promotionCosts: 0,
      abcCosts: 0,
      operationCosts: 0,
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
    setContextMenu({ ...contextMenu, visible: false }); // コンテキストメニューを閉じる
  };

  const duplicateProduct = (id: number) => {
    const productToDuplicate = products.find((product) => product.id === id);
    if (productToDuplicate) {
      const newProduct = {
        ...productToDuplicate,
        id: Math.max(...products.map((p) => p.id)) + 1,
      };
      setProducts([...products, newProduct]);
    }
    setContextMenu({ ...contextMenu, visible: false }); // コンテキストメニューを閉じる
  };
  const downloadCSV = () => {
    // 項目名の行
    const headers = ["商品名", ...products.map((product) => product.name)].join(
      ","
    );
    // 各項目ごとのデータを行として構築
    const rows = [
      ["売上", ...products.map((product) => product.sales)],
      ["原価", ...products.map((product) => product.cost)],
      [
        "売上総利益(粗利)",
        ...products.map((product) =>
          calculateGrossProfit(product.sales, product.cost)
        ),
      ],
      [
        "売上総利益率",
        ...products.map(
          (product) =>
            calculateGrossMargin(product.sales, product.cost).toFixed(2) + "%"
        ),
      ],
      ["注文連動費", ...products.map((product) => product.additionalCosts)],
      [
        "純粗利",
        ...products.map((product) =>
          calculateNetGrossProfit(
            product.sales,
            product.cost,
            product.additionalCosts
          )
        ),
      ],
      [
        "純粗利率",
        ...products.map(
          (product) =>
            calculateNetGrossMargin(
              product.sales,
              calculateNetGrossProfit(
                product.sales,
                product.cost,
                product.additionalCosts
              )
            ).toFixed(2) + "%"
        ),
      ],
      ["販促費", ...products.map((product) => product.promotionCosts)],
      [
        "販売利益",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales,
            product.cost,
            product.additionalCosts
          );
          return calculateSalesProfit(
            product.sales,
            netGrossProfit,
            product.promotionCosts
          );
        }),
      ],
      [
        "販売利益率",
        ...products.map((product) => {
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
            calculateSalesProfitMargin(product.sales, salesProfit).toFixed(2) +
            "%"
          );
        }),
      ],
      ["ABC", ...products.map((product) => product.abcCosts)],
      [
        "ABC利益",
        ...products.map((product) => {
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
          return calculateABCProfit(salesProfit, product.abcCosts);
        }),
      ],
      [
        "ABC利益率",
        ...products.map((product) => {
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
          const abcProfit = calculateABCProfit(salesProfit, product.abcCosts);
          return (
            calculateABCProfitMargin(product.sales, abcProfit).toFixed(2) + "%"
          );
        }),
      ],
      ["運営費", ...products.map((product) => product.operationCosts)],
      [
        "商品ごとの営業利益",
        ...products.map((product) => {
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
          const abcProfit = calculateABCProfit(salesProfit, product.abcCosts);
          return calculateOperatingProfit(abcProfit, product.operationCosts);
        }),
      ],
      [
        "商品ごとの営業利益率",
        ...products.map((product) => {
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
          const abcProfit = calculateABCProfit(salesProfit, product.abcCosts);
          const operatingProfit = calculateOperatingProfit(
            abcProfit,
            product.operationCosts
          );
          return (
            calculateOperatingProfitMargin(
              product.sales,
              operatingProfit
            ).toFixed(2) + "%"
          );
        }),
      ],
    ];
    // CSV形式の文字列に変換
    const csvContent = [headers, ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link); // Firefoxではこのステップが必要
    link.click();
    document.body.removeChild(link);
  };
  const showContextMenu = (event: React.MouseEvent, productId: number) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.pageX,
      y: event.pageY,
      productId,
    });
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
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

  // 入力可能なフィールドのスタイル
  const editableInputClass =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  // 入力不可能なフィールド（読み取り専用）のスタイル
  const readonlyInputClass =
    "px-6 py-4 whitespace-nowrap text-sm text-gray-500 bg-gray-100";

  return (
    <div className=" bg-gray-100" onClick={handleClickOutside}>
      <div className="overflow-x-auto w-full">
        <h1 className="text-xl font-semibold text-gray-900 mb-4">
          5段階利益管理表
        </h1>
        <button
          onClick={addNewProduct}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          列を追加
        </button>
        {/* CSVダウンロードボタン */}
        <button
          onClick={downloadCSV}
          className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          CSVダウンロード
        </button>
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
                  onContextMenu={(e) => showContextMenu(e, product.id)}
                >
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(product.id, "name", e.target.value)
                    }
                    className={editableInputClass}
                  />
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
                    className={editableInputClass}
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
                    className={editableInputClass}
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                売上総利益(粗利)
              </td>
              {products.map((product) => (
                <td key={product.id} className={readonlyInputClass}>
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
                  <td key={product.id} className={readonlyInputClass}>
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
                    className={editableInputClass}
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
                <td key={product.id} className={readonlyInputClass}>
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
                  <td key={product.id} className={readonlyInputClass}>
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
                    className={editableInputClass}
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
                  <td key={product.id} className={readonlyInputClass}>
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
                  <td key={product.id} className={readonlyInputClass}>
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
                    className={editableInputClass}
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
                  <td key={product.id} className={readonlyInputClass}>
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
                  <td key={product.id} className={readonlyInputClass}>
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
                    className={editableInputClass}
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
                  <td key={product.id} className={readonlyInputClass}>
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
                  <td key={product.id} className={readonlyInputClass}>
                    {operatingProfitMargin.toFixed(2)}%
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      {contextMenu.visible && (
        <ul
          className="absolute bg-white shadow rounded z-50"
          style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          onClick={(e) => e.stopPropagation()} // ここでのクリックは伝播させない
        >
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() =>
              contextMenu.productId !== null &&
              removeProduct(contextMenu.productId)
            }
          >
            削除
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() =>
              contextMenu.productId !== null &&
              duplicateProduct(contextMenu.productId)
            }
          >
            複製
          </li>
        </ul>
      )}
    </div>
  );
};

export default MainTable;
