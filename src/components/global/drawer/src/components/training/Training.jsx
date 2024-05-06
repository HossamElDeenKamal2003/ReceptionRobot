import React, { useState } from 'react'
import Header from '../Header/Header'
import Hero from '../Hero/Hero'
import screen from '../../images/screen.webp';
import './trending.css'
import gym1 from '../../images/gym.webp';
import gym2 from '../../images/gym2.webp';
import gym3 from '../../images/gym3.webp';
import gym4 from '../../images/gym4.webp';
import gym5 from '../../images/gym5.webp';
import gym6 from '../../images/gym6.webp';

const Training = () => {
  let [img , setImg] = useState(gym1);


  return (
    <div>
      <Hero />
      <div className='screen'>
        <img src={screen} alt="" />
        <div className="btns">
          <button onClick={() => setImg(gym1)}>A</button>
          <button onClick={() => setImg(gym2)}>b</button>
          <button onClick={() => setImg(gym3)}>c</button>
          <button onClick={() => setImg(gym4)}>D</button>
          <button onClick={() => setImg(gym5)}>E</button>
          <button onClick={() => setImg(gym6)}>F</button>
        </div>
        <div className="train">
          <img src={img} className='train-img' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Training
