/* import { FormEvent, useState } from 'react'
import { hackathon_backend } from 'declarations/hackathon_backend'

function App() {
  const [greeting, setGreeting] = useState('')
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    hackathon_backend.greet(name).then((greeting) => {
      setGreeting(greeting)
    })
    return false
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input
          id="name"
          alt="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <button type="submit" className="text-red-500">
          Click Meeee!
        </button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  )
}

export default App
 */