"use client";

import { useState } from "react";
import TableRow from "./TableRow";

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
            <TableRow
              label="売上"
              values={products.map((product) => product.sales)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "sales", value)
              }
            />
            <TableRow
              label="原価"
              values={products.map((product) => product.cost)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "cost", value)
              }
            />
            <TableRow
              label="売上総利益(粗利)"
              values={products.map((product) =>
                calculateGrossProfit(product.sales, product.cost)
              )}
              isPercentage={false}
              readOnly={true}
            />
            <TableRow
              label="売上総利益率"
              values={products.map((product) =>
                calculateGrossMargin(product.sales, product.cost)
              )}
              isPercentage={true}
              readOnly={true}
            />

            {/* 注文連動費 */}
            <TableRow
              label="注文連動費"
              values={products.map((product) => product.additionalCosts)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "additionalCosts", value)
              }
            />

            <TableRow
              label="純粗利"
              values={products.map((product) =>
                calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                )
              )}
              readOnly={true}
            />

            <TableRow
              label="純粗利率"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales,
                  product.cost,
                  product.additionalCosts
                );
                return calculateNetGrossMargin(product.sales, netGrossProfit);
              })}
              isPercentage={true}
              readOnly={true}
            />

            {/* 販促費 */}
            <TableRow
              label="販促費"
              values={products.map((product) => product.promotionCosts)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "promotionCosts", value)
              }
            />

            <TableRow
              label="販売利益"
              values={products.map((product) => {
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
              })}
              readOnly={true}
            />
            <TableRow
              label="販売利益率"
              values={products.map((product) => {
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
                return calculateSalesProfitMargin(product.sales, salesProfit);
              })}
              isPercentage={true}
              readOnly={true}
            />

            <TableRow
              label="ABC"
              values={products.map((product) => product.abcCosts)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "abcCosts", value)
              }
            />

            <TableRow
              label="ABC利益"
              values={products.map((product) => {
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
              })}
              readOnly={true}
            />

            <TableRow
              label="ABC利益率"
              values={products.map((product) => {
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
                return calculateABCProfitMargin(product.sales, abcProfit);
              })}
              isPercentage={true}
              readOnly={true}
            />

            <TableRow
              label="運営費"
              values={products.map((product) => product.operationCosts)}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "operationCosts", value)
              }
            />

            <TableRow
              label="商品ごとの営業利益"
              values={products.map((product) => {
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
                return calculateOperatingProfit(
                  abcProfit,
                  product.operationCosts
                );
              })}
              readOnly={true}
            />
            <TableRow
              label="商品ごとの営業利益率"
              values={products.map((product) => {
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
                return calculateOperatingProfitMargin(
                  product.sales,
                  operatingProfit
                );
              })}
              isPercentage={true}
              readOnly={true}
            />
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
