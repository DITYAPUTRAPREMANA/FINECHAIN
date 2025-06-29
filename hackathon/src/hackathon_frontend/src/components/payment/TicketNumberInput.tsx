import { hackathon_backend } from 'declarations/hackathon_backend'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router'

export default function TicketNumberInput() {
  const [ticketNumber, setTicketNumber] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    hackathon_backend
      .getFineDetail(ticketNumber)
      .then((data) => {
        if (data.length === 0) alert('Invalid ticket number!')
        else navigate(`/payments/checkout/${data[0].letterNumber}`)
      })
      .catch((e) => {
        alert('Something went wrong. Please try again later.')
      })
  }

  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm">
      <div className="bg-navy text-lg text-center text-white font-bold px-4 py-3">
        <p>Enter ticket number</p>
      </div>
      <form onSubmit={onSubmit} className="w-full p-4">
        <div className="relative">
          <input
            id="ticket-number"
            type="text"
            className="w-full bg-white rounded-full px-4 py-3 text-base text-navy focus-within:outline-navy"
            placeholder="ticket number..."
            onChange={(e) => setTicketNumber(e.currentTarget.value)}
          />
          <button
            type="submit"
            className="absolute w-16 right-0 top-0 bottom-0 flex justify-center items-center cursor-pointer bg-navy text-white rounded-r-full"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}
