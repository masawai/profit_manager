export default function DownloadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* ダウンロード矢印 */}
      <path d="M12 5v9" />
      <path d="M18 10l-6 6-6-6" />
      {/* 下部の線と短い縦の棒 */}
      <path d="M5 20h14" />
      <path d="M5 19v-2" />
      <path d="M19 19v-2" />
    </svg>
  );
}
