import MenuDashBoard from "@/app/components_dashboard/Menu";
import Navbar from "@/app/components_dashboard/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    



  return (
    <div className="flex">
      {/* <div className="bg-[#eabe62] w-[14vw] md:w-[13vw] xl:w-[16vw] h-full min-h-[100vh]">
        <MenuDashBoard/>
     
       </div>
       <div className="bg-[#a47345] w-[86vw] md:w-[85vw] xl:w-[84vw] h-full min-h-[100vh] " >
          <Navbar/>
          {children}
       </div> */}
        {children}
    </div>

  );
}