import * as React from "react"
import '../styles/Navbar.scss'

const Navbar = () => {
    return (
      <div className={'navbar-container fixed flex justify-evenly items-center'}>
        <div className="w-1/2 flex justify-evenly">
          <div className="text-2xl">
            FactoryHost
          </div>
        </div>
        <div className={'w-1/2 flex justify-evenly'}>
          <div className="">
            About
          </div>
          <div className="">
            Pricing
          </div>
        </div>
      </div>
    )
  }
  
  export default Navbar