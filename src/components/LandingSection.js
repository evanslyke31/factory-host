import * as React from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"
import '../styles/LandingSection.scss'

class LandingSection extends React.Component {
  
    sectionName;
    isToggled;
    scrollToCallbackFn = () => {};

    style = {
        section: {
            backgroundColor: 'white'
        },
        belts: {
            height: "200px",
            width: "285vw"
        }
    };

    constructor(props) {
      super(props);

      this.sectionName = props.name || '';
      this.scrollToCallbackFn = props.scrollToCallbackFn;
    }
  
  
    render() {
      return (
        <section className={this.sectionName} style={this.style.section}>
          <Helmet>
            <script src={withPrefix('belts.js')} type="text/javascript" />
          </Helmet>
          <div className="navbar-spacer"></div>
          <div className={'flex flex-col justify-around h-full'}>
            <div id="belts" className={''} style={this.style.belts}>
            </div>
            <div className={'title-container'}>
              <div className={`title ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
                FactoryHost {this.isToggled}
              </div>
              <div className={`sub-title ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
                A Satisfactory Dedicated Server Provider
              </div>
            </div>
            <div className={'flex align-self-end expand-icon-container'}>
              <div className={'text-8xl material-icons m-auto expand-icon'} onClick={() => this.scrollToCallbackFn('about')}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default LandingSection