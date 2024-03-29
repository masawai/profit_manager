"use client";

import { useRef, useState } from "react";
import TableRow from "./TableRow";
import Tooltip from "./Tooltip";

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

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleInputChange = (id: number, field: string, value: string) => {
    // 数値フィールドの場合、カンマを除去して数値に変換
    // 入力が空の場合は0を設定
    const numericValue =
      field === "sales" ||
      field === "cost" ||
      field === "additionalCosts" ||
      field === "promotionCosts" ||
      field === "abcCosts" ||
      field === "operationCosts"
        ? value === ""
          ? 0
          : parseFloat(value.replace(/,/g, ""))
        : value;

    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: numericValue } : product
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
      [
        "売上",
        ...products.map((product) => product.sales.toLocaleString()),
        calculateTotal("sales").toLocaleString(),
      ],
      [
        "原価",
        ...products.map((product) => product.cost.toLocaleString()),
        calculateTotal("cost").toLocaleString(),
      ],
      [
        "売上総利益(粗利)",
        ...products.map((product) =>
          calculateGrossProfit(
            product.sales.toString(),
            product.cost.toString()
          ).toLocaleString()
        ),
        calculateTotalGrossProfit().toLocaleString(),
      ],
      [
        "売上総利益率",
        ...products.map(
          (product) =>
            calculateGrossMargin(
              product.sales.toString(),
              product.cost.toString()
            ).toLocaleString() + "%"
        ),
        calculateTotalGrossMargin().toLocaleString() + "%",
      ],
      [
        "注文連動費",
        ...products.map((product) => product.additionalCosts.toLocaleString()),
        calculateTotal("additionalCosts").toLocaleString(),
      ],
      [
        "純粗利",
        ...products.map((product) =>
          calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          ).toLocaleString()
        ),
        calculateTotalNetGrossProfit().toLocaleString(),
      ],
      [
        "純粗利率",
        ...products.map(
          (product) =>
            calculateNetGrossMargin(
              product.sales.toString(),
              calculateNetGrossProfit(
                product.sales.toString(),
                product.cost.toString(),
                product.additionalCosts.toString()
              ).toString()
            ).toLocaleString() + "%"
        ),
        calculateTotalNetGrossMargin().toLocaleString() + "%",
      ],
      [
        "販促費",
        ...products.map((product) => product.promotionCosts.toLocaleString()),
        calculateTotal("promotionCosts").toLocaleString(),
      ],
      [
        "販売利益",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          return calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          ).toLocaleString();
        }),
        calculateTotalSalesProfit().toLocaleString(),
      ],
      [
        "販売利益率",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          const salesProfit = calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          );
          return (
            calculateSalesProfitMargin(
              product.sales.toString(),
              salesProfit.toString()
            ).toLocaleString() + "%"
          );
        }),
        calculateTotalSalesProfitMargin().toLocaleString() + "%",
      ],
      [
        "ABC",
        ...products.map((product) => product.abcCosts.toLocaleString()),
        calculateTotal("abcCosts").toLocaleString(),
      ],
      [
        "ABC利益",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          const salesProfit = calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          );
          return calculateABCProfit(
            salesProfit.toString(),
            product.abcCosts.toString()
          ).toLocaleString();
        }),
        calculateTotalABCProfit().toLocaleString(),
      ],
      [
        "ABC利益率",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          const salesProfit = calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          );
          const abcProfit = calculateABCProfit(
            salesProfit.toString(),
            product.abcCosts.toString()
          );
          return (
            calculateABCProfitMargin(
              product.sales.toString(),
              abcProfit.toString()
            ).toLocaleString() + "%"
          );
        }),
        calculateTotalABCProfitMargin().toLocaleString() + "%",
      ],
      [
        "運営費",
        ...products.map((product) => product.operationCosts.toLocaleString()),
        calculateTotal("operationCosts").toLocaleString(),
      ],
      [
        "商品ごとの営業利益",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          const salesProfit = calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          );
          const abcProfit = calculateABCProfit(
            salesProfit.toString(),
            product.abcCosts.toString()
          );
          return calculateOperatingProfit(
            abcProfit.toString(),
            product.operationCosts.toString()
          ).toLocaleString();
        }),
        calculateTotalOperatingProfit().toLocaleString(),
      ],
      [
        "商品ごとの営業利益率",
        ...products.map((product) => {
          const netGrossProfit = calculateNetGrossProfit(
            product.sales.toString(),
            product.cost.toString(),
            product.additionalCosts.toString()
          );
          const salesProfit = calculateSalesProfit(
            product.sales.toString(),
            netGrossProfit.toString(),
            product.promotionCosts.toString()
          );
          const abcProfit = calculateABCProfit(
            salesProfit.toString(),
            product.abcCosts.toString()
          );
          const operatingProfit = calculateOperatingProfit(
            abcProfit.toString(),
            product.operationCosts.toString()
          );
          return (
            calculateOperatingProfitMargin(
              product.sales.toString(),
              operatingProfit.toString()
            ).toLocaleString() + "%"
          );
        }),
        calculateTotalOperatingProfitMargin().toLocaleString() + "%",
      ],
    ];
    // CSV形式の文字列に変換
    const csvContent = [headers, ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvContent}`);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Profit Manager.csv");
    document.body.appendChild(link); // Firefoxではこのステップが必要
    link.click();
    document.body.removeChild(link);
  };
  const handlePrint = () => {
    window.print();
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

  const calculateGrossProfit = (sales: string, cost: string): number => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericCost = parseFloat(cost.replace(/,/g, ""));
    return numericSales - numericCost;
  };

  const calculateGrossMargin = (sales: string, cost: string): string => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericCost = parseFloat(cost.replace(/,/g, ""));
    const margin =
      numericSales > 0
        ? ((numericSales - numericCost) / numericSales) * 100
        : 0;
    return Math.round(margin).toString() + "%";
  };

  const calculateNetGrossProfit = (
    sales: string,
    cost: string,
    additionalCosts: string
  ): number => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericCost = parseFloat(cost.replace(/,/g, ""));
    const numericAdditionalCosts = parseFloat(
      additionalCosts.replace(/,/g, "")
    );
    return numericSales - numericCost - numericAdditionalCosts;
  };

  const calculateNetGrossMargin = (
    sales: string,
    netGrossProfit: string
  ): string => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericNetGrossProfit = parseFloat(netGrossProfit.replace(/,/g, ""));
    const margin =
      numericSales > 0 ? (numericNetGrossProfit / numericSales) * 100 : 0;
    return Math.round(margin).toString() + "%";
  };

  const calculateSalesProfit = (
    sales: string,
    netGrossProfit: string,
    promotionCosts: string
  ): number => {
    const numericNetGrossProfit = parseFloat(netGrossProfit.replace(/,/g, ""));
    const numericPromotionCosts = parseFloat(promotionCosts.replace(/,/g, ""));
    return numericNetGrossProfit - numericPromotionCosts;
  };

  const calculateSalesProfitMargin = (
    sales: string,
    salesProfit: string
  ): string => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericSalesProfit = parseFloat(salesProfit.replace(/,/g, ""));
    const margin =
      numericSales > 0 ? (numericSalesProfit / numericSales) * 100 : 0;
    return Math.round(margin).toString() + "%";
  };

  const calculateABCProfit = (
    salesProfit: string,
    abcCosts: string
  ): number => {
    const numericSalesProfit = parseFloat(salesProfit.replace(/,/g, ""));
    const numericAbcCosts = parseFloat(abcCosts.replace(/,/g, ""));
    return numericSalesProfit - numericAbcCosts;
  };

  const calculateABCProfitMargin = (
    sales: string,
    abcProfit: string
  ): string => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericAbcProfit = parseFloat(abcProfit.replace(/,/g, ""));
    const margin =
      numericSales > 0 ? (numericAbcProfit / numericSales) * 100 : 0;
    return Math.round(margin).toString() + "%";
  };

  const calculateOperatingProfit = (
    abcProfit: string,
    operationCosts: string
  ): number => {
    const numericAbcProfit = parseFloat(abcProfit.replace(/,/g, ""));
    const numericOperationCosts = parseFloat(operationCosts.replace(/,/g, ""));
    return numericAbcProfit - numericOperationCosts;
  };

  const calculateOperatingProfitMargin = (
    sales: string,
    operatingProfit: string
  ): string => {
    const numericSales = parseFloat(sales.replace(/,/g, ""));
    const numericOperatingProfit = parseFloat(
      operatingProfit.replace(/,/g, "")
    );
    const margin =
      numericSales > 0 ? (numericOperatingProfit / numericSales) * 100 : 0;
    return Math.round(margin).toString() + "%";
  };

  const calculateTotal = (field: keyof (typeof products)[0]) => {
    return products.reduce((acc, product) => acc + Number(product[field]), 0);
  };

  const calculateTotalGrossProfit = () => {
    return products.reduce(
      (acc, product) =>
        acc +
        calculateGrossProfit(product.sales.toString(), product.cost.toString()),
      0
    );
  };

  const calculateTotalGrossMargin = () => {
    const totalSales = calculateTotal("sales");
    const totalGrossProfit = calculateTotalGrossProfit();
    return totalSales > 0
      ? ((totalGrossProfit / totalSales) * 100).toFixed(0)
      : "0";
  };

  const calculateTotalNetGrossProfit = () => {
    return products.reduce(
      (acc, product) =>
        acc +
        calculateNetGrossProfit(
          product.sales.toString(),
          product.cost.toString(),
          product.additionalCosts.toString()
        ),
      0
    );
  };

  const calculateTotalNetGrossMargin = () => {
    const totalSales = calculateTotal("sales");
    const totalNetGrossProfit = calculateTotalNetGrossProfit();
    return totalSales > 0
      ? ((totalNetGrossProfit / totalSales) * 100).toFixed(0)
      : "0";
  };

  const calculateTotalSalesProfit = () => {
    return products.reduce((acc, product) => {
      const netGrossProfit = calculateNetGrossProfit(
        product.sales.toString(),
        product.cost.toString(),
        product.additionalCosts.toString()
      );
      return (
        acc +
        calculateSalesProfit(
          product.sales.toString(),
          netGrossProfit.toString(),
          product.promotionCosts.toString()
        )
      );
    }, 0);
  };

  const calculateTotalSalesProfitMargin = () => {
    const totalSales = calculateTotal("sales");
    const totalSalesProfit = calculateTotalSalesProfit();
    return totalSales > 0
      ? ((totalSalesProfit / totalSales) * 100).toFixed(0)
      : "0";
  };

  const calculateTotalABCProfit = () => {
    return products.reduce((acc, product) => {
      const netGrossProfit = calculateNetGrossProfit(
        product.sales.toString(),
        product.cost.toString(),
        product.additionalCosts.toString()
      );
      const salesProfit = calculateSalesProfit(
        product.sales.toString(),
        netGrossProfit.toString(),
        product.promotionCosts.toString()
      );
      return (
        acc +
        calculateABCProfit(salesProfit.toString(), product.abcCosts.toString())
      );
    }, 0);
  };

  const calculateTotalABCProfitMargin = () => {
    const totalSales = calculateTotal("sales");
    const totalABCProfit = calculateTotalABCProfit();
    return totalSales > 0
      ? ((totalABCProfit / totalSales) * 100).toFixed(0)
      : "0";
  };

  const calculateTotalOperatingProfit = () => {
    return products.reduce((acc, product) => {
      const netGrossProfit = calculateNetGrossProfit(
        product.sales.toString(),
        product.cost.toString(),
        product.additionalCosts.toString()
      );
      const salesProfit = calculateSalesProfit(
        product.sales.toString(),
        netGrossProfit.toString(),
        product.promotionCosts.toString()
      );
      const abcProfit = calculateABCProfit(
        salesProfit.toString(),
        product.abcCosts.toString()
      );
      return (
        acc +
        calculateOperatingProfit(
          abcProfit.toString(),
          product.operationCosts.toString()
        )
      );
    }, 0);
  };

  const calculateTotalOperatingProfitMargin = () => {
    const totalSales = calculateTotal("sales");
    const totalOperatingProfit = calculateTotalOperatingProfit();
    return totalSales > 0
      ? ((totalOperatingProfit / totalSales) * 100).toFixed(0)
      : "0";
  };

  return (
    <div className="" onClick={handleClickOutside}>
      <div className="overflow-x-auto w-auto max-w-full m-2">
        <div className="flex items-center mb-4 print:hidden">
          <button
            onClick={addNewProduct}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            列を追加
          </button>
          <div
            className="relative inline-block text-left mb-4 ml-2"
            ref={menuRef}
            onMouseLeave={() => setIsMenuVisible(false)}
          >
            <button
              type="button"
              onClick={toggleMenuVisibility} // ボタンクリックでメニューの表示状態を切り替える
              className="inline-flex justify-center w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none"
            >
              ダウンロード
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* メニューの表示状態に基づいてメニューを表示/非表示 */}
            {isMenuVisible && (
              <div
                className="origin-top-right absolute right-0 w-auto rounded-md shadow-lg bg-indigo-100 bg-opacity-100"
                role="menu"
                aria-orientation="vertical"
              >
                <div role="none" className="px-2 py-1">
                  {/* メニューオプション */}
                  <a
                    href="#"
                    className="text-gray-700 w-full block text-sm hover:bg-indigo-200"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      downloadCSV();
                    }}
                  >
                    CSVダウンロード
                  </a>
                  <a
                    href="#"
                    className="text-gray-700 block text-sm hover:bg-indigo-200"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePrint();
                    }}
                  >
                    PDFダウンロード
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <Tooltip
                  text={`1) 商品ごとの利益を可視化する場合は「商品名」、出品しているECモールごとの利益を可視化する場合には「ECモール名（Amazonなど）」を入力しましょう。
                         2) B to Bであればクライアントごとの利益を可視化するためにクライアント名を入力しましょう。
                         3) 飲食店で、店舗ごとの利益を可視化する場合は「店舗名」を入力。メニューごとの利益を可視化する場合は「メニュー名」を入力しましょう。`}
                >
                  項目
                </Tooltip>
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                合計
              </th>
              {products.map((product) => (
                <th
                  key={product.id}
                  className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                  onContextMenu={(e) => showContextMenu(e, product.id)}
                >
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) =>
                      handleInputChange(product.id, "name", e.target.value)
                    }
                    className="bg-white mt-1 block w-full rounded-md border-2 border-gray-200"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-50 divide-y divide-gray-200">
            <TableRow
              label="売上"
              values={[
                ...products.map((product) => product.sales.toLocaleString()),
              ]}
              totalValue={calculateTotal("sales").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "sales", value)
              }
            />
            <TableRow
              label="原価"
              values={[
                ...products.map((product) => product.cost.toLocaleString()),
              ]}
              totalValue={calculateTotal("cost").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "cost", value)
              }
            />
            <TableRow
              label="売上総利益(粗利)"
              values={[
                ...products.map((product) =>
                  calculateGrossProfit(
                    product.sales.toString(),
                    product.cost.toString()
                  ).toLocaleString()
                ),
              ]}
              totalValue={calculateTotalGrossProfit().toLocaleString()}
              readOnly={true}
            />
            <TableRow
              label="売上総利益率"
              values={[
                ...products.map((product) =>
                  calculateGrossMargin(
                    product.sales.toString(),
                    product.cost.toString()
                  )
                ),
              ]}
              totalValue={calculateTotalGrossMargin() + "%"}
              readOnly={true}
            />
            <TableRow
              label="注文連動費"
              values={[
                ...products.map((product) =>
                  product.additionalCosts.toLocaleString()
                ),
              ]}
              totalValue={calculateTotal("additionalCosts").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "additionalCosts", value)
              }
              tooltipText={`注文や受注ごとに必ず発生するコスト。カード決済手数料、送料、梱包資材、同封物、ノベルティ、付属品などの料金を指します。
              飲食店の場合は、使い捨て容器、ショッピングモールなどの手数料、キャッシュレス決済手数料などの料金を指します。
              商品ごとに割り振りができない場合は、注文連動費の合計を商品売上比率であん分しましょう。
              B to Bの場合は、注文連動費がかからないケースがほとんどなので「0」を入力しましょう。`}
            />
            <TableRow
              label="純粗利"
              values={[
                ...products.map((product) =>
                  calculateNetGrossProfit(
                    product.sales.toString(),
                    product.cost.toString(),
                    product.additionalCosts.toString()
                  ).toLocaleString()
                ),
              ]}
              totalValue={calculateTotalNetGrossProfit().toLocaleString()}
              readOnly={true}
            />
            <TableRow
              label="純粗利率"
              values={[
                ...products.map((product) => {
                  const netGrossProfit = calculateNetGrossProfit(
                    product.sales.toString(),
                    product.cost.toString(),
                    product.additionalCosts.toString()
                  );
                  return calculateNetGrossMargin(
                    product.sales.toString(),
                    netGrossProfit.toString()
                  );
                }),
              ]}
              totalValue={calculateTotalNetGrossMargin() + "%"}
              readOnly={true}
            />
            <TableRow
              label="販促費"
              values={[
                ...products.map((product) =>
                  product.promotionCosts.toLocaleString()
                ),
              ]}
              totalValue={calculateTotal("promotionCosts").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "promotionCosts", value)
              }
              tooltipText={`広告、営業の人件費など受注を獲得するためにかかったコストを指します。`}
            />
            <TableRow
              label="販売利益"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                return calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                ).toLocaleString();
              })}
              totalValue={calculateTotalSalesProfit().toLocaleString()}
              readOnly={true}
            />
            <TableRow
              label="販売利益率"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                const salesProfit = calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                );
                return calculateSalesProfitMargin(
                  product.sales.toString(),
                  salesProfit.toString()
                );
              })}
              totalValue={calculateTotalSalesProfitMargin() + "%"}
              readOnly={true}
            />
            <TableRow
              label="ABC"
              values={products.map((product) =>
                product.abcCosts.toLocaleString()
              )}
              totalValue={calculateTotal("abcCosts").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "abcCosts", value)
              }
              tooltipText={`Activity-Based Costingの略です。商品ごとの人件費を指します。業務部門（マーケティング部や商品企画部など）の人件費をここに入れましょう。
              ABC計算シートもご用意しております。
              右の「A」ボタンをクリックしてご使用ください。`}
            />
            <TableRow
              label="ABC利益"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                const salesProfit = calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                );
                return calculateABCProfit(
                  salesProfit.toString(),
                  product.abcCosts.toString()
                ).toLocaleString();
              })}
              totalValue={calculateTotalABCProfit().toLocaleString()}
              readOnly={true}
            />
            <TableRow
              label="ABC利益率"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                const salesProfit = calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                );
                const abcProfit = calculateABCProfit(
                  salesProfit.toString(),
                  product.abcCosts.toString()
                );
                return calculateABCProfitMargin(
                  product.sales.toString(),
                  abcProfit.toString()
                );
              })}
              totalValue={calculateTotalABCProfitMargin() + "%"}
              readOnly={true}
            />
            <TableRow
              label="運営費"
              values={products.map((product) =>
                product.operationCosts.toLocaleString()
              )}
              totalValue={calculateTotal("operationCosts").toLocaleString()}
              readOnly={false}
              onValueChange={(index, value) =>
                handleInputChange(products[index].id, "operationCosts", value)
              }
              tooltipText={`家賃やバックオフィス業務の人件費を指します。
              売上比率に応じてあん分した額を入力しましょう。
              右の「➗」ボタンをクリックすれば、自動で売上比率に応じてあん分できます。`}
            />
            <TableRow
              label="商品ごとの営業利益"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                const salesProfit = calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                );
                const abcProfit = calculateABCProfit(
                  salesProfit.toString(),
                  product.abcCosts.toString()
                );
                return calculateOperatingProfit(
                  abcProfit.toString(),
                  product.operationCosts.toString()
                ).toLocaleString();
              })}
              totalValue={calculateTotalOperatingProfit().toLocaleString()}
              readOnly={true}
            />
            <TableRow
              label="商品ごとの営業利益率"
              values={products.map((product) => {
                const netGrossProfit = calculateNetGrossProfit(
                  product.sales.toString(),
                  product.cost.toString(),
                  product.additionalCosts.toString()
                );
                const salesProfit = calculateSalesProfit(
                  product.sales.toString(),
                  netGrossProfit.toString(),
                  product.promotionCosts.toString()
                );
                const abcProfit = calculateABCProfit(
                  salesProfit.toString(),
                  product.abcCosts.toString()
                );
                const operatingProfit = calculateOperatingProfit(
                  abcProfit.toString(),
                  product.operationCosts.toString()
                );
                return calculateOperatingProfitMargin(
                  product.sales.toString(),
                  operatingProfit.toString()
                );
              })}
              totalValue={calculateTotalOperatingProfitMargin() + "%"}
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
