import * as React from "react"
import '../styles/PricingCard.scss'

class PricingCard extends React.Component {
    
    updateIndexCallbackFn = () => {};

    
    constructor(props) {
        super(props);

        this.updateIndexCallbackFn = props.updateIndexCallbackFn;
      }
    
    
      render() {
        return (
            <div className="pricing-card">
                <div className="arrow-placeholder">
                    <div className={`text-8xl material-icons ${(this.props.currentIndex > 0) ? '' : 'hidden'}`} onClick={() => this.updateIndexCallbackFn(-1)}>chevron_left</div>
                </div>
                    {this.props.content}
                <div className="arrow-placeholder">
                    <div className={`text-8xl material-icons ${(this.props.currentIndex < this.props.maxIndex) ? '' : 'hidden'}`} onClick={() => this.updateIndexCallbackFn(1)}>chevron_right</div>
                </div>
            </div>
        );
      }
}

export default PricingCard;