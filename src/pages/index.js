import * as React from "react"
import Navbar from "../components/Navbar"
import AboutSection from "../components/AboutSection"
import LandingSection from "../components/LandingSection"
import PricingSection from "../components/PricingSection"
import { scroller } from "react-scroll";

// styles
const main = {
  width: "100vw",
  margin: "0",
  padding: "0",
}

class IndexPage extends React.Component {

  index = 0;
  
  sections = ['landing','about','pricing'];

  keys = {37: 1, 38: 1, 39: 1, 40: 1};
  supportsPassive = false;
  wheelOpt = this.supportsPassive ? { passive: false } : false;
  wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  scrollTimeMilliSeconds = 800;
  scrolling = false;
  scrollingTimeoutId;

  constructor(props) {
    super(props);

    this.state = {
      currentSection: this.sections[0]
    };
  }

  componentDidMount () {
    window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
    window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
    window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
    window.addEventListener('keydown', this.preventDefaultForScrollKeys, false);
    window.addEventListener("mousedown", function(e){  e.preventDefault(); });

    try {
      window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
        get: function () { this.supportsPassive = true; } 
      }));
    } catch(e) {}
  }

  componentWillUnmount () {
    window.removeEventListener('DOMMouseScroll', this.preventDefault); // older FF
    window.removeEventListener(this.wheelEvent, this.preventDefault); // modern desktop
    window.removeEventListener('touchmove', this.preventDefault); // mobile
    window.removeEventListener('keydown', this.preventDefaultForScrollKeys);
    window.removeEventListener('mousedown', null);
    window.removeEventListener('test', null);

    if(this.scrollingTimeoutId)
      clearTimeout(this.scrollingTimeoutId);
  }

  render () {
    return (
      <main style={main}>
        <title>Home Page</title>
        <Navbar scrollToCallbackFn={this.scrollTo.bind(this)} currentSection={this.state.currentSection}/>
        <LandingSection name={this.sections[0]} scrollToCallbackFn={this.scrollTo.bind(this)} currentSection={this.state.currentSection}/>
        <AboutSection name={this.sections[1]} scrollToCallbackFn={this.scrollTo.bind(this)} currentSection={this.state.currentSection}/>
        <PricingSection name={this.sections[2]} scrollToCallbackFn={this.scrollTo.bind(this)} currentSection={this.state.currentSection}/>
      </main>
    )
  }

  preventDefaultForScrollKeys = (e) => {
    if (this.keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
  }

  preventDefault = (e) => {
    e.preventDefault();

    if (!this.scrolling) {

      this.scrolling = true;
      if(this.scrollingTimeoutId)
        clearTimeout(this.scrollingTimeoutId);

      this.scrollingTimeoutId = setTimeout(() => {
        this.scrolling = false;
      }, this.scrollTimeMilliSeconds);

      if(e.type === 'keydown') {
        if(e.keyCode === 40  && this.index < this.sections.length - 1) {
          this.scrollTo(this.sections[this.index + 1]);
        } else if (e.keyCode === 38 && this.index > 0) {
          this.scrollTo(this.sections[this.index - 1]);
        }
      }
    
      else if(e.type === 'wheel') {
        if(e.wheelDelta < 0 && this.index < this.sections.length - 1) {
          this.scrollTo(this.sections[this.index + 1]);
        } else if (e.wheelDelta > 0 && this.index > 0) {
          this.scrollTo(this.sections[this.index - 1]);
        }
      }
  
    }
  }

  scrollTo(section) {
    this.index = this.sections.findIndex(s => s === section);

    this.setState(state => ({
      currentSection: section
    }));

    scroller.scrollTo(section, {
      duration: this.scrollTimeMilliSeconds,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }
}

export default IndexPage
