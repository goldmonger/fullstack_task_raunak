import React from "react";

interface ILayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="max-w-[900px] mx-3 border border-[#D3D4D9] font-inter font-semibold rounded-lg shadow px-6">
        {/* context for connect status */}
        {/* <p className="text-emerald-500 text-xl">{connectStatus}</p> */}
        <div className="pt-5 pb-1 rounded-t-lg flex items-center gap-1 md:gap-2 relative -left-2">
          <div className="h-16 w-16 rounded-lg relative">
            <img src="/logo.png" className="" />
          </div>
          <div className="text-[24px] md:text-[32px] 3xl:text-[48px]">Note App</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
