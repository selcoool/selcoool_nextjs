import MenuDashBoard from "@/app/components_dashboard/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

    



  return (
    <div className="flex">
       <div className="bg-[#00ffff] w-[14vw] md:w-[15vw] xl:w-[16vw] h-full">
        <MenuDashBoard/>
       </div>
       <div className="bg-[#00b3b3] w-[85vw] md:w-[85vw] xl:w-[84vw] h-full" >
          {children}
       </div>
    </div>

  );
}