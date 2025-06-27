import { TicketIcon, BanknotesIcon, LinkIcon } from "@heroicons/react/24/solid";

const FeatureDashboard = () => {
    return (
        <section className="w-full my-20 p-20 rounded-4xl bg-gradient-to-r from-white/50 to-yellow-100/50 backdrop-blur-2xl border-gray-200/75 border-4">
            <div className="space-y-12">
                <div className="w-full flex flex-col items-center gap-4 text-[#145374]">
                    <h1 className="font-bold text-3xl text-center max-w-[500px]">Key Features Designed to Elevate Your Experience</h1>
                    <p className="text-center max-w-[680px] text-2xl">At the heart of our platform are powerful features thoughtfully designed to enhance your experience at every step. </p>
                </div>
                <div className="overflow-hidden relative w-full h-[480px] bg-[#FFF0C870] rounded-4xl">
                    <div className="absolute -bottom-80 left-[20%] rounded-full h-[600px] w-[600px] bg-[#9DD9D2] blur-[80px]"></div>
                    <div className="absolute -top-28 -left-12 rounded-full h-80 w-80 bg-[#FF8811] blur-3xl"></div>
                    <div className="absolute -top-40 right-20 rounded-full h-96 w-96 bg-[#74CDFB] blur-3xl"></div>
                    <div className="absolute -bottom-64 -right-24 rounded-full h-80 w-80 bg-[#FF8811] blur-3xl"></div>
                    <article className="w-full h-full flex justify-between items-center p-12">
                        <div className="relative w-[32%] h-[80%] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[120px] rounded-4xl border-3 border-[#DCDCDC]">
                            <div className="absolute -top-12 left-8 rounded-full size-24 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px] flex justify-center items-center">
                                <TicketIcon className="size-12 text-[#9DD9D2]" />
                            </div>
                            <div className="px-10 pt-16 text-white space-y-4">
                                <h2 className="font-bold text-3xl text-[#9DD9D2]">
                                    Indonesian Fine Tickets
                                </h2>
                                <p className="text-xl">
                                    Explore and manage traffic violation tickets across Indonesia with ease. Stay informed and organized with our seamless ticket tracking system.
                                </p>
                            </div>
                            <div className="absolute -bottom-6 right-12 rounded-full w-40 h-12 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px]"></div>
                        </div>

                        <div className="relative w-[32%] h-[80%] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[120px] rounded-4xl border-3 border-[#DCDCDC]">
                            <div className="absolute -top-12 w-full flex justify-center">
                                <div className="rounded-full size-24 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px] flex justify-center items-center">
                                    <BanknotesIcon className="size-12 text-[#FF8811]" />
                                </div>
                            </div>
                            <div className="px-10 pt-16 text-white space-y-4">
                                <h2 className="font-bold text-3xl text-[#FF8811]">
                                    Easy Fine Payment
                                </h2>
                                <p className="text-xl">
                                    Pay your fines quickly and securely with our user-friendly payment system. No queues, no hassle—just a few taps away.
                                </p>
                            </div>
                            <div className="absolute -bottom-6 w-full flex justify-center">
                                <div className="rounded-full w-40 h-12 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px]"></div>
                            </div>
                        </div>

                        <div className="relative w-[32%] h-[80%] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[120px] rounded-4xl border-3 border-[#DCDCDC]">
                            <div className="absolute -top-12 right-8 rounded-full size-24 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px]  flex justify-center items-center">
                                <LinkIcon className="size-12 text-[#74CDFB]" />
                            </div>
                            <div className="px-10 pt-16 text-white space-y-4">
                                <h2 className="font-bold text-3xl text-[#74CDFB]">
                                    Secured with ICP
                                </h2>
                                <p className="text-xl">
                                    Your data is protected using Internet Computer Protocol, ensuring transparency, security, and trust on a decentralized network.
                                </p>
                            </div>
                            <div className="absolute -bottom-6 left-12 rounded-full w-40 h-12 border-3 border-[#DCDCDC] bg-linear-to-br from-[#282828]/70 to-[#808080]/70 backdrop-blur-[240px]"></div>
                        </div>
                    </article>

                </div>
            </div>
        </section>
    );
}

export default FeatureDashboard;