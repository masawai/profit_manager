import Header from "@/components/Header";
import MainTable from "@/components/MainTable";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col">
      <Header />

      <MainTable />
    </div>
  );
}
