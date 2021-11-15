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
            <script src={withPrefix('triangles.js')} type="text/javascript" />
          </Helmet>
          <div className="navbar-spacer"></div>
          <div id="triangles" className="triangles">
          </div>
          <div className={'flex flex-col title-container'}>
            <div className={`title ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
              FactoryHost {this.isToggled}
            </div>
            <div className={`sub-title ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
              A Satisfactory Dedicated Server Provider
            </div>
            <div className={'flex align-self-end expand-icon-container mt-auto'}>
              <div className={'text-8xl material-icons m-auto expand-icon'} onClick={() => this.scrollToCallbackFn('about')}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default LandingSection