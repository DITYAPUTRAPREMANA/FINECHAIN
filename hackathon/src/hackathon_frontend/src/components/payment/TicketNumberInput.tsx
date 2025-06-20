export default function TicketNumberInput() {
  return (
    <div className="w-full max-w-lg rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm">
      <div className="bg-navy text-lg text-center text-white font-bold px-4 py-3">
        <p>Enter ticket number</p>
      </div>
      <form action="" className="w-full p-4">
        <input
          id="ticket-number"
          type="text"
          className="w-full bg-white rounded-full px-4 py-3 text-base text-navy focus-within:outline-navy"
          placeholder="ticket number..."
        />
      </form>
    </div>
  )
}
