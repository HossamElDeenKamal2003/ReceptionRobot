import React from "react";
import Header from "../Header/Header";
import './Hero.css';
import heroImage from '../../images/hero_image.png';
import heroImageBack from '../../images/hero_image_back.png';
import Heart from '../../images/heart.png';
import Calories from '../../images/calories.png';
import NumberCounter from 'number-counter';

const Hero = () =>{
  return (
    <div className="hero">
      <div className="blur hero-blur"></div>
  <div className="left-h">
   <Header />

   {/* the best add */}
   <div className="the-best-ad">
      <div></div> 
    <span>the best fitness club in the town</span>
   </div>

{/* Hero Heading */}
<div className="hero-text">
  <div>
    <span className="stoke-text">Shape</span>
    <span>Your</span>   
  </div>
  <div>
    <span>Ideal body</span>
  </div>
  <div>
    <span> in here we will help you to shape and build your ideal body and live up your life to fullest
</span>
  </div>
</div>

{/* figures */}

<div className="figures">

  <div>
    <span>
<NumberCounter end={140} start={100} delay={4} preFix="+" />
    </span>
    <span>export coachs</span>
    </div>
  <div>
    <span>
    <NumberCounter end={680} start={450} delay={4} preFix="+" />
    </span>
    <span>members joined</span>
    </div>
  <div>
    <span>
    <NumberCounter end={790} start={680} delay={4} preFix="+" />
    </span>
    <span>fitness programs</span>
    </div>
</div>

{/* Buttons */}
<div className="hero-buttons">
  <button className="btn">Get Started</button>
  <button className="btn">Learn More</button>
</div>
  </div>

  {/* Right Section */}
  <div className="right-h">
    <button className="btn">Join Now</button>
     

     <div className="heart-rate">
      <img src={Heart} alt="Heart" />
      <span>Heart rate</span>
      <span>116 bpm</span>
     </div>


     <img src={heroImage} className="hero-image" alt="Hero" />
     <img src={heroImageBack} className="hero-image-back" alt="Hero ImageBack" />
     <div  className="calories">
      <img src={Calories} alt= "Calories" />
      <div>
      <span>Calories Burned</span>
      <span>220 kcal</span>
      </div>
     </div>
  </div>
    </div>
  )
}
export default Hero;