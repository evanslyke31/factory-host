import * as React from "react"
import '../styles/AboutSection.scss'

class AboutSection extends React.Component {
  
    sectionName;
    scrollToCallbackFn = () => {};

    style = {
        section: {
            backgroundColor: 'orange'
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
          <div className="navbar-spacer"></div>
          <div className={'flex flex-col justify-around h-full'}>
            <div className="cards">
              <div className={`first ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>test</div>
              <div className={`second ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>test</div>
              <div className={`third ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>test</div>
            </div>
            <div className={'flex align-self-end expand-icon-container'}>
              <div className={'text-8xl material-icons m-auto expand-icon'} onClick={() => this.scrollToCallbackFn('pricing')}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default AboutSection