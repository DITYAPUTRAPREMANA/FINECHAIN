import React, { ReactNode, useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { NavLink, useLocation } from 'react-router'

type TemplateProps = {
  children: ReactNode
}

const Template = ({ children }: TemplateProps) => {
  const location = useLocation();
  var [actived, setActived] = useState(
    '-right-[calc(75%+32px)] md:-right-[calc(60%+32px)]'
  )
  const [isActive, setIsActive] = useState(true)

  const handleClick = () => {
    setIsActive(!isActive)

    isActive
      ? setActived((actived = 'right-8'))
      : setActived(
        (actived = '-right-[calc(75%+24px)] md:-right-[calc(60%+24px)]')
      )
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <nav className="fixed top-0 flex justify-center w-screen bg-white/30 backdrop-blur-2xl shadow-lg z-50">
        <div className="px-8 lg:px-20 h-20 max-w-[1728px] w-full flex items-center justify-between text-[#145374] font-bold">
          <div className="w-40">
            <img src="/finechain_logo.svg" alt="" className="w-full" />
          </div>
          <div className="hidden lg:flex items-center gap-12 text-xl">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-[#1790C5]" : "hover:opacity-80"}>
              Home
            </NavLink>
            <NavLink to="/fines" className={({ isActive }) => isActive ? "text-[#1790C5]" : "hover:opacity-80"}>
              Fines
            </NavLink>
            <NavLink to="/payments" className={({ isActive }) => isActive ? "text-[#1790C5]" : "hover:opacity-80"}>
              Payment
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => isActive ? "text-[#1790C5]" : "hover:opacity-80"}>
              History
            </NavLink>
          </div>
          {/* <div className="w-10 h-10 rounded-full bg-orange-500">
                    </div> */}
          <a
            href=""
            className="group relative hidden lg:flex px-10 py-1.5 items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-xl font-bold text-xl shadow-lg transition-all duration-500 hover:-translate-y-0.5"
          >
            <span className="relative z-20">Sign In</span>
            <div className="absolute left-0 -top-20 w-full h-80 bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
          </a>
          <button
            onClick={handleClick}
            className="rounded-full block lg:hidden p-2 hover:bg-white/50"
          >
            <Bars3Icon className="size-10 text-[#145374]" />
          </button>
        </div>
      </nav>
      <nav
        className={
          'fixed flex lg:hidden flex-col items-center rounded-4xl py-10 top-28 w-[75%] md:w-[60%] bg-gradient-to-br from-white/30 to-[#F4D06F]/30 backdrop-blur-2xl z-[60] border-4 border-white/50 shadow-lg text-white space-y-8 transition-all ease-in-out delay-100 duration-1000 ' +
          actived
        }
      >
        <div className="w-full flex justify-between items-center px-10">
          <h1 className="font-bold text-[#F81]/85 text-xl md:text-2xl">
            Explore <br /> Finechain
          </h1>
          <a
            href=""
            className="group relative w-fit px-6 py-3 flex items-center justify-center bg-[#FEF7EF] overflow-hidden border-2 border-white rounded-xl font-bold text-xl shadow-lg transition-all duration-500 hover:-translate-y-0.5"
          >
            <span className="relative z-20 text-[#145374]">Sign In</span>
            <div className="absolute left-0 -top-20 w-full h-80 bg-[linear-gradient(90deg,_#FEF7EF_18.75%,_#F4D06F_67.31%,_#F81_92.31%)] transition-all duration-500 ease-in-out group-hover:rotate-180"></div>
          </a>
        </div>
        <div className="w-[calc(100%-80px)] h-0.5 bg-white/50 rounded-full"></div>
        <div className="w-full flex flex-col text-xl md:text-2xl font-semibold pb-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              (isActive ? "text-[#F81]" : "hover:bg-white/30") + " w-full h-20 px-10 flex items-center"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/fines"
            className={({ isActive }) =>
              (isActive ? "text-[#F81]" : "hover:bg-white/30") + " w-full h-20 px-10 flex items-center"
            }
          >
            Fines
          </NavLink>
          <NavLink
            to="/payments"
            className={({ isActive }) =>
              (isActive ? "text-[#F81]" : "hover:bg-white/30") + " w-full h-20 px-10 flex items-center"
            }
          >
            Payment
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              (isActive ? "text-[#F81]" : "hover:bg-white/30") + " w-full h-20 px-10 flex items-center"
            }
          >
            History
          </NavLink>
        </div>
      </nav>
      <main className="max-w-[1728px] w-full flex z-10">
        <div className="fixed w-[345px] h-[355px] bg-[#9DD9D2] blur-[110px] left-44 top-12 z-10 soft-bounce"></div>
        <div className="fixed w-[190px] h-[190px] bg-[#F4D06F] blur-[80px] right-0 top-0 z-10 soft-bounce"></div>
        <div className="fixed w-[480px] h-[480px] bg-[#145374] blur-[132px] right-52 top-60 z-10 soft-bounce"></div>
        <div className="fixed w-[240px] h-[240px] bg-[#F4D06F] blur-[100px] left-12 bottom-0 z-10 soft-bounce"></div>
        <div className="fixed w-[480px] h-[480px] bg-[#F81] blur-[156px] -left-[220px] 3xl:left-36 top-[480px] z-20 soft-bounce"></div>
        <div className="fixed w-[380px] h-[380px] bg-[#9DD9D2] blur-[120px] right-24 -bottom-36 z-10 soft-bounce"></div>
        <div className="pt-20 z-30 w-full h-full">{children}</div>
      </main>
      <footer className="relative w-full h-fit flex justify-center z-30">
        <div className="w-full h-full max-w-[1728px] flex flex-col items-center bg-linear-to-r from-gray-300/40 to-white/40 backdrop-blur-xl rounded-t-[48px] border-t-8 border-white/50 shadow-lg pt-20 space-y-8">
          <div className="flex flex-col lg:flex-row gap-12 justify-between w-full h-full px-8 lg:px-20">
            <img
              src="/footer_ornament.svg"
              className="w-44 xl:w-52 object-top opacity-100"
            />
            <div className="flex flex-col md:flex-row justify-center lg:justify-end gap-12 md:gap-20 w-full text-[#145374] text-xl font-medium">
              <div className="space-y-4 md:space-y-6 md:max-w-56">
                <h2 className="font-bold text-2xl">More To Know</h2>
                <p>Easier, faster and more secure ticket fines payment</p>
                <p>
                  Each transaction are encrypted, transparent, and tamper-proof
                </p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-2xl">Our Features</h2>
                <p>Home</p>
                <p>Fines</p>
                <p>Payment</p>
                <p>History</p>
              </div>
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-bold text-2xl">Our Social Media</h2>
                <p className="underline">INSTAGRAM</p>
                <p className="underline">YOUTUBE</p>
                <p className="underline">LINKEDIN</p>
              </div>
            </div>
          </div>
          <div className="w-[calc(100%-64px)] lg:w-[calc(100%-160px)] h-0.5 rounded-full bg-[#145374]/40 mt-4"></div>
          <div className="bg-[url('/footer_logo.svg')] bg-top w-full h-30 opacity-100 "></div>
        </div>
      </footer>
    </div>
  )
}

export default Template
