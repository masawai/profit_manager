import { FORM_URL } from "@/const/urls";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8">
      <ul className="flex justify-center space-x-4">
        <li>
          <a href="/" className="hover:text-gray-300">
            トップページ
          </a>
        </li>
        <li>
          <a href={FORM_URL} className="hover:text-gray-300">
            お問い合わせ
          </a>
        </li>
        <li>
          <a href="/terms" className="hover:text-gray-300">
            利用規約
          </a>
        </li>
        <li>
          <a href="/privacy" className="hover:text-gray-300">
            プライバシーポリシー
          </a>
        </li>
        <li>
          <a href="/legal" className="hover:text-gray-300">
            特定商取引法に基づく表記
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
