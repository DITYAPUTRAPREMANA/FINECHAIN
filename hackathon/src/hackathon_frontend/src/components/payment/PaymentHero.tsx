import TicketNumberInput from './TicketNumberInput'

export default function PaymentHero() {
  return (
    <div className="grid w-full min-h-[calc(100dvh-80px)] h-full p-8">
      <div className="h-full w-full bg-linear-to-br from-white/0 to-[#FFE0BD] rounded-lg border-[3px] border-white backdrop-filter backdrop-blur-md">
        <div className="flex w-full h-full lg:flex-row">
          <div className="w-full basis-3/5 px-8 flex flex-col justify-center gap-4">
            <h1 className="text-3xl lg:text-7xl text-navy font-bold">
              Pay your ticket fine here!
            </h1>
            <p className="text-navy p-6 bg-white/10 backdrop-blur-sm rounded-lg">
              Settle your fines with confidence. Blockchain tech brings security
              and simplicity to every transaction
            </p>
          </div>
          <div className="hidden relative w-full h-full basis-2/5 bg-[url(../../../public/images/bg-payment-hero.png)] rounded-r-lg lg:block">
            <div className="absolute z-0 inset-0 bg-navy/30 rounded-r-lg backdrop-blur-[2px]" />

            <div className="relative z-10 h-full px-4 flex justify-center items-center">
              <TicketNumberInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
