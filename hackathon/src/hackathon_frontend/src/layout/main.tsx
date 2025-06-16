import React, { ReactNode } from "react";

type TemplateProps = {
    children: ReactNode;
};

const Template = ({ children }: TemplateProps) => {
    return (
        <div className="min-w-screen min-h-screen h-full flex justify-center">
            <nav className="fixed flex justify-center w-screen bg-white/30 backdrop-blur-2xl shadow-lg z-50">
                <div className="px-20 h-20 max-w-[1728px] w-full flex items-center justify-between text-[#145374] font-bold">
                    <h1>
                        FINECHAIN
                    </h1>
                    <div className="flex items-center gap-12 text-xl">
                        <a href="" className="hover:opacity-80">Home</a>
                        <a href="" className="hover:opacity-80">Fines</a>
                        <a href="" className="hover:opacity-80">Payment</a>
                        <a href="" className="hover:opacity-80">History</a>
                    </div>
                    {/* <div className="w-10 h-10 rounded-full bg-orange-500">
                    </div> */}
                    <div className="px-10 py-2 border-2 border-white rounded-xl text-xl bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)]">
                        <span className="font-bold">
                            Sign In
                        </span>
                    </div>
                </div>
            </nav>
            <main className="relative max-w-[1728px] w-full flex z-10">
                <div className="fixed w-[345px] h-[355px] bg-[#9DD9D2] blur-[110px] left-44 top-12 z-10 soft-bounce"></div>
                <div className="fixed w-[190px] h-[190px] bg-[#F4D06F] blur-[80px] right-0 top-0 z-10 soft-bounce"></div>
                <div className="fixed w-[480px] h-[480px] bg-[#145374] blur-[132px] right-52 top-60 z-10 soft-bounce"></div>
                <div className="fixed w-[480px] h-[480px] bg-[#F81] blur-[156px] -left-[220px] top-[480px] z-10 soft-bounce"></div>
                <div className="pt-20 z-30 w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Template