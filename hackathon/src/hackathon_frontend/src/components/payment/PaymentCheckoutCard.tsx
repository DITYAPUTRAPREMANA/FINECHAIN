import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export default function PaymentCheckoutCard() {
  const onSelectValueChange = () => {}

  return (
    <div className="max-w-lg w-full mx-auto space-y-6 rounded-xl p-8 border-[3px] border-white shadow-md">
      <h6 className="text-4xl text-navy font-bold ">Detail</h6>
      <div className="w-full flex flex-col gap-2 text-navy text-lg">
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Letter number</p>
          <p className="basis-1/2">ABCD1234NZZ001</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Name</p>
          <p className="basis-1/2">Ryan Hangralim</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">TNKB</p>
          <p className="basis-1/2">DK1121ACY</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Date</p>
          <p className="basis-1/2">16 Juni 2004</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Penalty</p>
          <p className="basis-1/2">DUI</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Total fine</p>
          <p className="basis-1/2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            Rp 250.000
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xl text-navy font-bold">Payment Method</p>
        <Select onValueChange={onSelectValueChange}>
          <SelectTrigger className="text-lg">
            <SelectValue placeholder="Choose payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BCA" className="text-lg">
              BCA
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <button className="group relative w-full flex px-10 py-1.5 items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-xl font-bold text-xl shadow-lg transition-all duration-500 hover:-translate-y-0.5">
        <span className="relative z-20">Pay</span>
        <div className="absolute left-0 -top-20 w-full h-80 bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
      </button>
    </div>
  )
}
