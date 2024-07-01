import { getUser } from "@/tools/actions";
import Sidebar from "./component/Sidebar";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const dataUser = getUser();

  return (
    <div className="w-screen">
      <Sidebar dataUser={dataUser}/>
      <main className="mt-28 md:mt-28 w-full bg-fondoapp px-4 md:px-20 h-screen max-h-screen overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
