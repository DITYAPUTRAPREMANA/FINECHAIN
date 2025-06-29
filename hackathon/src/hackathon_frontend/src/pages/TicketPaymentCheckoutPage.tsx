import { useEffect, useState } from 'react'
import PaymentCheckoutCard from '../components/payment/PaymentCheckoutCard'
import { transaction } from 'declarations/transaction'
import { useNavigate, useParams } from 'react-router'
import { hackathon_backend } from 'declarations/hackathon_backend'

export default function TicketPaymentCheckoutPage() {
  const { ticketNumber } = useParams()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const navigate = useNavigate()

  // Get dummy data
  // useEffect(() => {
  //   transaction
  //     .getTicket()
  //     .then((ticket) => {
  //       setTicket({
  //         ...ticket,
  //         amount: Number(ticket.amount),
  //         date: Number(ticket.date),
  //       })
  //     })
  //     .catch((e) => {
  //       console.log('Error', e)
  //     })
  // }, [])

  useEffect(() => {
    hackathon_backend
      .getFineDetail(ticketNumber || '')
      .then((data) => {
        if (data.length === 0) {
          alert('Invalid ticket number!')
          navigate('/payments')
        } else {
          return data[0]
        }
      })
      .then((fine) => {
        if (fine)
          setTicket({
            ...fine,
            totalFine: Number(fine.totalFine),
            createdAt: Number(fine.createdAt),
          })
      })
      .catch((e) => {
        alert('Something went wrong. Please try again later.')
      })
  }, [ticketNumber, navigate])

  return (
    <section className="min-h-[calc(100dvh-80px)] h-full flex justify-center items-center">
      {ticket && (
        <PaymentCheckoutCard
          id={ticket.letterNumber}
          name={ticket.name}
          amount={ticket.totalFine}
          tnkb={ticket.TNKB}
          penalty={ticket.penaltyType}
          date={ticket.createdAt}
        />
      )}
    </section>
  )
}
