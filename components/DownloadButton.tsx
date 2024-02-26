"use client";

import { useEffect, useRef, useState } from "react";

export default async function DownloadButton() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // CSVダウンロードの関数
  const downloadCSV = () => {
    // CSVダウンロードのロジックをここに実装
    console.log("CSVダウンロード");
    setIsMenuVisible(false); // ダウンロード後、メニューを閉じる
  };

  // PDFダウンロードの関数
  const handlePrint = () => {
    // PDFダウンロードのロジックをここに実装
    console.log("PDFダウンロード");
    setIsMenuVisible(false); // ダウンロード後、メニューを閉じる
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left mb-4 ml-2" ref={menuRef}>
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
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {/* メニューオプション */}
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              onClick={downloadCSV}
            >
              CSVダウンロード
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
              role="menuitem"
              onClick={handlePrint}
            >
              PDFダウンロード
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
