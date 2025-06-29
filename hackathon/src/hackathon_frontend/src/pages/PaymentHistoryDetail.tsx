import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchFineDetails, BackendFine } from "../components/history/historyUtils"; // Adjust path as needed

const PaymentHistoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [fineDetail, setFineDetail] = useState<BackendFine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError("ID not found in URL.");
        setLoading(true);
        return;
      }

      try {
        setLoading(true);
        const detail = await fetchFineDetails(id);
        setFineDetail(detail);
      } catch (err) {
        setError("Failed to load fine details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className='flex w-full justify-center py-8'>
    <img src="/footer_ornament.svg" alt="" className='size-36 animate-spin' />
  </div>;
  if (error || !fineDetail) return <div className="p-8 text-xl text-red-600">{error}</div>;

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(fineDetail.totalFine);

  return (
    <div className="w-full px-20 py-8 flex justify-center">
      <div className="w-full space-y-6 max-w-[1568px]">
        <div className="text-cyan-800 text-xl font-normal font-['Roboto']">
          History &gt; {fineDetail.letterNumber}
        </div>

        <div className="p-12 bg-gradient-to-br from-white/40 to-orange-200/40 rounded-[48px] shadow-[4px_4px_16px_8px_rgba(0,0,0,0.15)] outline-[3px] outline-offset-[-3px] outline-white backdrop-blur-[50px] flex flex-col justify-center items-start gap-10">
          <div className="flex flex-col justify-start items-start gap-6 w-full">
            <div className="w-full h-12 inline-flex justify-between items-center">
              <div className="text-cyan-800 text-3xl font-bold font-['Roboto']">
                Fine Payment Detail
              </div>
              <div className="px-6 py-2 bg-gradient-to-br from-white/60 to-orange-200/60 rounded-[48px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] outline-2 outline-offset-[-2px] outline-white backdrop-blur-xl flex justify-center items-center gap-2.5">
                <div className="text-cyan-800 text-xl font-bold font-['Roboto']">
                  {fineDetail.status}
                </div>
              </div>
            </div>
            <div className="w-full h-0 outline outline-cyan-800/30" />
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-4">
            <DetailRow label="Letter Number" value={fineDetail.letterNumber} />
            <DetailRow label="Name" value={fineDetail.name} />
            <DetailRow label="TNKB" value={fineDetail.TNKB} />
            <DetailRow label="Date" value={fineDetail.date} />
            <DetailRow label="Type of Penalty" value={fineDetail.penaltyType} />

            <div className="w-full inline-flex justify-center items-center gap-4">
              <div className="flex-1 text-cyan-800 text-xl font-bold font-['Roboto']">
                Total Fine
              </div>
              <div className="flex-1 h-8 relative">
                <div className="w-72 px-12 py-1 bg-gradient-to-br from-white/60 to-orange-200/60 rounded-[48px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.15)] outline-white outline-2 outline-offset-[-3px] backdrop-blur-[50px] inline-flex justify-center items-center gap-2.5">
                  <div className="text-cyan-800 text-xl font-bold font-['Roboto']">
                    {formattedPrice.toString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-4">
            <div className="text-cyan-800 text-2xl font-bold font-['Roboto']">
              Payment Method
            </div>
            <DetailRow label="paymentMethod" value={"fineDetail.accountNumber"} />
          </div>
        </div>

        <a
          href="#"
          className="group relative mb-10 w-[452px] py-3 px-6 flex items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-full font-bold text-2xl text-cyan-800 shadow-lg transition-all duration-500 hover:-translate-y-0.5"
        >
          <span className="relative z-20">Export Proof of Payment</span>
          <div className="absolute left-0 -top-20 w-full h-screen bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#FF8811_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
        </a>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full inline-flex justify-between items-center">
    <div className="flex-1 text-cyan-800 text-xl font-bold font-['Roboto']">{label}</div>
    <div className="flex-1 text-cyan-800 text-xl font-normal font-['Roboto']">{value}</div>
  </div>
);

export default PaymentHistoryDetail;
