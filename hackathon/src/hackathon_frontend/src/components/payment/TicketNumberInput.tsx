export default function TicketNumberInput() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white/20 backdrop-blur-sm">
      <div className="bg-navy text-center text-white font-bold p-2">
        <p>Enter ticket number</p>
      </div>
      <form action="" className="px-4 py-8">
        <input
          id="ticket-number"
          type="text"
          className="w-full bg-white rounded-full px-4 py-2 text-base text-navy focus-within:outline-navy"
          placeholder="ticket number..."
        />
      </form>
    </div>
  )
}
