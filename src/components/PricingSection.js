import * as React from "react"
import '../styles/PricingSection.scss'
import PricingCard from './PricingCard'

class PricingSection extends React.Component {
  
  sectionName;
  maxIndex = 2;

  constructor(props) {
    super(props);

    this.sectionName = props.name || '';
    this.state = {
      currentIndex: 0
    };
  }

  updateIndex(amount) {
    let newIndex = this.state.currentIndex + amount;
    if (newIndex >= 0 && newIndex <= this.maxIndex) {
      this.setState(state => ({
        currentIndex: newIndex
      }));
      console.log(this.state.currentIndex);
    }
  }

  lowTier = 
  (
  <div className="card">
    <div className="title">Low Tier</div>
    <div className="size">8 GB</div>
    <div className="description">Recommended for player counts of around 1-3. Will get you and your friends started on your journey.</div>
  </div>
  );

  midTier = (
    <div className="card">
    <div className="title">Mid Tier</div>
    <div className="size">12 GB</div>
    <div className="description">Recommended for player counds of around 3-5. This plan should be sufficient for larger factories.</div>
  </div>
  )

  hightTier = (
    <div className="card">
    <div className="title">High Tier</div>
    <div className="size">16 GB</div>
    <div className="description">Recommended for player counds of around 5+. This plan should meet all your needs not matter how large of a factory you plan on having.</div>
  </div>
  )

  plans = { 0: { content: this.lowTier, price: 15 }, 1: { content: this.midTier, price: 20 }, 2: { content: this.hightTier, price: 25 } }

  render() {
    return (
      <section className={this.sectionName}>
          <div className="navbar-spacer"></div>
          <div className="pricing-container">
            <div className="card-container">
              <PricingCard currentIndex={this.state.currentIndex} maxIndex={this.maxIndex} content={this.plans[this.state.currentIndex].content} updateIndexCallbackFn={this.updateIndex.bind(this)}/>
            </div>
            <div className="pricing-checkout">
              <div className="price">${this.plans[this.state.currentIndex].price} / mo</div>
              <button onClick={() => window.location = `/buy?id=${this.state.currentIndex}`}>Buy</button>
            </div>
          </div>
    </section>
    )
  }
}
    
export default PricingSection