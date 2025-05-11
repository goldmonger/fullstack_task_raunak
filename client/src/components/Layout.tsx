import React from "react";

interface ILayoutProps {
  children: React.ReactNode | React.ReactNode[];
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="border border-[#D3D4D9] font-inter font-semibold rounded-lg shadow 3xl:px-6">
        {/* context for connect status */}
        {/* <p className="text-emerald-500 text-xl">{connectStatus}</p> */}
        <div className="pt-5 pb-1 rounded-t-lg flex items-center">
          <div className="h-16 w-16 rounded-lg relative">
            <img src="/logo.png" className="absolute -top-0.5 -left-2.5" />
          </div>
          <div className="lg:text-[32px] 3xl:text-[48px]">Note App</div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
