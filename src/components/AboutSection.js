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
              <div className={`first ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
                <div className="title">Full Control</div>
                <div className="description">Having us as your game server provider you have the ability to use your own game saves. Monitor your server with our server managment. Once done with our services you can keep your save.</div>
              </div>
              <div className={`second ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
                <div className="title">99% Uptime</div>
                <div className="description">Play with your friends or let your friends play without you. Your server will be up regardless if you are managing your factories or not.</div>
              </div>
              <div className={`third ${(this.props.currentSection === this.sectionName ? 'animate' : '')}`}>
                <div className="title">Support</div>
                <div className="description">You have access to support for any issue you may come accross. We will be ready to help.</div>
              </div>
            </div>
            <div className={'flex align-self-end expand-icon-container'}>
              <div className={'material-icons m-auto expand-icon'} onClick={() => this.scrollToCallbackFn('pricing')}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default AboutSection