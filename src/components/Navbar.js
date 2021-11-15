import * as React from "react"
import '../styles/Navbar.scss'

class Navbar extends React.Component {

  scrollToCallbackFn = () => {};

  constructor(props) {
    super(props);

    this.scrollToCallbackFn = props.scrollToCallbackFn;

  }

  render () { 
    return (
      <div id="navbar" className={'navbar-container fixed flex justify-evenly items-center'}>
        <div className="w-1/2 flex justify-evenly">
          <div className={`text-2xl navbar-link ${this.props.currentSection === 'landing' ? 'active' : ''}`} onClick={() => this.scrollToCallbackFn('landing')}>
            FactoryHost
          </div>
        </div>
        <div className={'w-1/2 flex justify-evenly'}>
          <div className={`navbar-link ${this.props.currentSection === 'about' ? 'active' : ''}`} onClick={() => this.scrollToCallbackFn('about')}>
            About
          </div>
          <div className={`navbar-link ${this.props.currentSection === 'pricing' ? 'active' : ''}`} onClick={() => this.scrollToCallbackFn('pricing')}>
            Pricing
          </div>
        </div>
      </div>
    )
  }
}
  
  export default Navbar