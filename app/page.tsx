import AuthButton from "@/components/AuthButton";
import HomeIcon from "@/components/HomeIcon";
import MainTable from "@/components/MainTable";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Index() {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <Link className="flex items-center gap-2 font-medium" href="/">
            <HomeIcon className="w-6 h-6" />
            <span className="text-lg font-semibold">Profit Manager</span>
          </Link>
          {isSupabaseConnected && <AuthButton />}
        </div>
      </nav>

      <MainTable />
    </div>
  );
}
