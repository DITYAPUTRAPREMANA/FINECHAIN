import { DateFormat, IDRFormat } from 'hackathon_frontend/src/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { transaction } from 'declarations/transaction'
import { getUnixTime } from 'date-fns'

const paymentMethods = [
  {
    bank: 'BCA',
  },
]

const schema = Joi.object({
  id: Joi.string().min(3).max(20).required(),
  amount: Joi.number().required(),
  paymentMethod: Joi.string().min(3).max(10).required().label('Payment method'),
})

type FormData = {
  id: string
  amount: number
  paymentMethod: string
}

export default function PaymentCheckoutCard({
  id,
  name,
  amount,
  tnkb,
  penalty,
  date,
}: {
  id: string
  name: string
  amount: number
  tnkb: string
  penalty: string
  date: number
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    trigger,
  } = useForm<FormData>({
    resolver: joiResolver(schema),
    defaultValues: {
      id,
      amount,
      paymentMethod: '',
    },
  })

  const onSelectValueChange = (v: string) => {
    setValue('paymentMethod', v)
    trigger('paymentMethod')
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    transaction
      .craeteInvoice({
        id: data.id,
        payment_method: data.paymentMethod,
        amount: String(data.amount),
      })
      .then((res) => {
        return JSON.parse(res)
      })
      .then((invoice) => {
        // You can access `data.id` here safely
        transaction.addTransaction({
          id: invoice.external_id,
          amount: invoice.amount,
          xendit_id: invoice.id,
          ticket_id: data.id,
          expiry_date: BigInt(getUnixTime(invoice.expiry_date)),
          status: 'pending',
          created_at: BigInt(getUnixTime(new Date())),
          updated_at: BigInt(getUnixTime(new Date())),
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg w-full mx-auto space-y-6 rounded-xl p-8 border-[3px] border-white shadow-md"
    >
      <h6 className="text-4xl text-navy font-bold ">Detail</h6>
      <div className="w-full flex flex-col gap-2 text-navy text-lg">
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Letter number</p>
          {/* <p className="basis-1/2">{id}</p> */}
          <input type="text" {...register('id')} disabled />
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Name</p>
          <p className="basis-1/2">{name}</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">TNKB</p>
          <p className="basis-1/2">{tnkb}</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Date</p>
          <p className="basis-1/2">
            {DateFormat(new Date(date * 1000).toISOString())}
          </p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Penalty</p>
          <p className="basis-1/2">{penalty}</p>
        </div>
        <div className="flex flex-row">
          <p className="basis-1/2 font-bold">Total fine</p>
          <p className="basis-1/2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            {IDRFormat(amount)}
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xl text-navy font-bold">Payment Method</p>
        <Select
          value={watch('paymentMethod')}
          onValueChange={onSelectValueChange}
        >
          <SelectTrigger className="text-lg">
            <SelectValue placeholder="Choose payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods.map((m) => (
              <SelectItem value={m.bank} className="text-lg">
                {m.bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.paymentMethod && (
          <p className="text-sm text-red-400">{errors.paymentMethod.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="cursor-pointer group relative w-full flex px-10 py-1.5 items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-xl font-bold text-xl shadow-lg transition-all duration-500 hover:-translate-y-0.5"
      >
        <span className="relative z-20">Pay</span>
        <div className="absolute left-0 -top-20 w-full h-80 bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
      </button>
    </form>
  )
}
