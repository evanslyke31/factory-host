import * as React from "react"


class PricingSection extends React.Component {
  
    sectionName;

    style = {
        section: {
            backgroundColor: 'blue'
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
            test
      </section>
      )
    }
  }
    
    export default PricingSection