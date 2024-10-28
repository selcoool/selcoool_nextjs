import MenuDashBoard from "@/app/components_dashboard/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    



  return (
    <div className="flex">
      <div className="bg-[#eabe62] w-[16vw] md:w-[17vw] xl:w-[16vw] h-full min-h-[100vh]">
        <MenuDashBoard/>
       </div>
       <div className="bg-[#a47345] w-[84vw] md:w-[83vw] xl:w-[84vw] h-full min-h-[100vh]" >
          {children}
       </div>
    </div>

  );
}