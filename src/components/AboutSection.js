import * as React from "react"


class AboutSection extends React.Component {
  
    sectionName;

    style = {
        section: {
            backgroundColor: 'orange'
        }
    };

    constructor(props) {
      super(props);

      this.sectionName = props.name || '';
    }
  
  
    render() {
      return (
        <section className={this.sectionName} style={this.style.section}>
          <div className="navbar-spacer"></div>
          <div className={'flex flex-col justify-around h-full'}>
            <div>
              test
            </div>
            <div className={'flex align-self-end expand-icon-container'}>
              <div className={'text-8xl material-icons m-auto expand-icon'}>expand_more</div>
            </div>
          </div>
        </section>
      )
    }
  }
    
    export default AboutSection