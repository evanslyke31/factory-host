import * as React from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"
import '../styles/LandingSection.scss'

class LandingSection extends React.Component {
  
    sectionName;

    style = {
        section: {
            backgroundColor: 'green'
        },
        belts: {
            height: "500px",
            width: "100vw"
        }
    };

    constructor(props) {
      super(props);

      this.sectionName = props.name || '';
    }
  
  
    render() {
      return (
        <section className={this.sectionName} style={this.style.section}>
          <Helmet>
            <script src={withPrefix('belts.js')} type="text/javascript" />
          </Helmet>
          <div className="navbar-spacer"></div>
          <div className={'flex flex-col justify-around h-full'}>
            <div id="belts" style={this.style.belts}>
            </div>
            <div className={'flex align-self-end expand-icon-container'}>
              <div className={'text-8xl material-icons m-auto expand-icon'}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default LandingSection