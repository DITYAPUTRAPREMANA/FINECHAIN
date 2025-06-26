import { useEffect, useState } from 'react'
import PaymentCheckoutCard from '../components/payment/PaymentCheckoutCard'
import { transaction } from 'declarations/transaction'

export default function TicketPaymentCheckoutPage() {
  const [ticket, setTicket] = useState<null | Ticket>(null)

  useEffect(() => {
    transaction
      .getTicket()
      .then((ticket) => {
        setTicket({
          ...ticket,
          amount: Number(ticket.amount),
          date: Number(ticket.date),
        })
      })
      .catch((e) => {
        console.log('Error', e)
      })
  }, [])

  return (
    <section className="min-h-[calc(100dvh-80px)] h-full flex justify-center items-center">
      {ticket && (
        <PaymentCheckoutCard
          id={ticket.id}
          name={ticket.name}
          amount={ticket.amount}
          tnkb={ticket.tnkb}
          penalty={ticket.penalty}
          date={ticket.date}
        />
      )}
    </section>
  )
}
