import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import HomeIcon from "./HomeIcon";

export default function Header() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();
  return (
    <div className="flex flex-col gap-16 items-center bg-indigo-400 print:hidden">
      <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full  flex justify-between items-center p-2 text-sm">
          <div className="flex items-center">
            <Link className="flex items-center gap-2 font-medium" href="/">
              <h1 className="flex items-center text-white text-2xl font-bold hover:text-gray-300 transition duration-300 ease-in-out">
                <HomeIcon className="w-6 h-6 mr-1" />
                Profit Manager
              </h1>
            </Link>
            <p className="text-lg text-white ml-3"> 5段階利益管理表</p>
          </div>
          {/* TODO: ログイン機能は不要なためコメントアウト */}
          {/* {isSupabaseConnected ? <AuthButton /> : <div></div>}  */}
        </div>
      </header>
    </div>
  );
}
