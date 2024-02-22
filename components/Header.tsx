import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AuthButton from "./AuthButton";
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
    <div className="flex flex-col gap-16 items-center bg-indigo-400">
      <header className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full  flex justify-between items-center p-3 text-sm">
          <Link className="flex items-center gap-2 font-medium" href="/">
            <HomeIcon className="w-6 h-6" />
            <span className="text-lg font-semibold text-white">
              Profit Manager
            </span>
          </Link>
          {isSupabaseConnected ? <AuthButton /> : <div></div>}
        </div>
      </header>
    </div>
  );
}
