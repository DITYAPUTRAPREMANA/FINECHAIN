
const HeroDashboard = () => {
    return (
        <div className="relative w-full h-[calc(100vh-80px)]">
            <div className="absolute flex right-0 top-0 w-full h-full z-30">
                <img src="/images/finechain_hero.png" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-40 w-full h-full px-20 flex justify-between items-center bg-black/25">
                <div className="space-y-10 text-white">
                    <h1 className="text-[68px] font-bold leading-[1]">
                        Next Generation <br/>
                        of Traffic Fine <br/>
                        Payments Collection
                    </h1>
                    <p className="text-lg w-[520px]">
                        Paying your ticket fines is now easier, faster, and more secure with blockchain technology. No more long queues, lost receipts, or doubts about where your money goes—each transaction is encrypted, transparent, and tamper-proof. 
                    </p>
                    <a href="" className="group relative w-fit px-10 py-2 flex items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-xl font-bold text-xl shadow-lg transition-all duration-500 hover:-translate-y-0.5">
                        <span className="relative z-20 text-[#145374]">Explore More</span>
                        <div className="absolute left-0 -top-20 w-full h-80 bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
                    </a>
                </div>
                <div className="relative pr-10">
                    <div className="relative w-[400px] h-[400px] rounded-full bg-orange-400 z-50 border-2 border-white/25 shadow-lg"></div>
                    <div className="absolute -right-0 -bottom-12 w-[400px] h-[400px] rounded-full bg-orange-400/35 backdrop-blur-lg border-2 border-white/25 shadow-lg"></div>
                </div>
            </div>
        </div>
    );
};

export default HeroDashboard; 