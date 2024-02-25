export default function Legal() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">
        特定商取引法に基づく表記
      </h1>
      <div className="mb-4">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                販売者名
              </td>
              <td className="border border-gray-200 p-2">Profit Manager</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                メールアドレス
              </td>
              <td className="border border-gray-200 p-2">
                masaya.sasho@gmail.com
              </td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                販売URL
              </td>
              <td className="border border-gray-200 p-2">
                <a
                  href="https://www.profit-manager.biz/"
                  className="text-blue-500 hover:text-blue-700"
                >
                  https://www.profit-manager.biz/
                </a>
              </td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                支払方法
              </td>
              <td className="border border-gray-200 p-2">クレジットカード</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                支払時期
              </td>
              <td className="border border-gray-200 p-2">ご購入時</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                商品代金以外の必要金額
              </td>
              <td className="border border-gray-200 p-2">なし</td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                商品引渡し方法
              </td>
              <td className="border border-gray-200 p-2">
                購入完了後、サービスにアクセスできるようになります。
              </td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                商品引渡し時期
              </td>
              <td className="border border-gray-200 p-2">
                購入完了後すぐにご提供いたします。
              </td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                解約について
              </td>
              <td className="border border-gray-200 p-2">
                当サービスはいつでも解約が可能です。解約をご希望の場合は、アカウント設定ページより解約手続きを行ってください。解約手続き完了後、次回更新日以降の課金は発生しません。
                <br />
                既に支払われたサブスクリプション料金については、サービスの性質上、返金は行っておりませんのでご了承ください。解約に関する詳細は、利用規約またはFAQページをご参照ください。
              </td>
            </tr>
            <tr>
              <td className="font-semibold border border-gray-200 p-2">
                動作環境（推奨）
              </td>
              <td className="border border-gray-200 p-2">
                本サービスの利用にあたり、推奨する動作環境は以下のとおりです。
                <br />
                <br />
                ● Windows
                <br />
                ・OS：Microsoft Windows7以上
                <br />
                ・Webブラウザ：GoogleChrome（最新版）
                <br />
                <br />
                ● Mac
                <br />
                ・OS：Mac OS X<br />
                ・Webブラウザ：GoogleChrome（最新版）
                <br />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4">
        ※
        上記の表示事項（住所・電話番号・代表者など）に関しお問合せのある場合はメールもしくはお問い合わせフォームからご連絡いただければ、遅滞なく開示いたします。
      </p>
    </div>
  );
}
