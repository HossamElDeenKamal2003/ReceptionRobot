import React, { useState } from "react";
import "./Header.css";
import Logo from '../../images/logo.png';
import Bars from '../../images/bars.png';
import { Link } from "react-router-dom";
const Header = () =>{
const mobile = window.innerWidth<=768 ? true : false;
const [menuOpened , setMenuOpened] = useState(false); 

return (
    <div className="header">
<img src={Logo} className='logo' alt="Logo" />
  {(menuOpened === false && mobile === true)?(
  <div 
  style={{
    backgroundColor : 'var(--appColor)',
    padding : '0.6rem',
    borderRadius : '5px',
    cursor :  'pointer'
  }}
  onClick = {() =>setMenuOpened(true)}
  >
    <img src={Bars} alt = "" style={{width:'1.5rem',height: '1.5rem'}} />
    </div>
  ):(
  <ul className="header-menu">
    <li >
      <Link
      onClick={() =>setMenuOpened(false)}
        to="header"
        span={true}
        smooth={true}
      >Home</Link></li>
    <li >
      <Link
      onClick={() =>setMenuOpened(false)}
        to="programs"
        span={true}
        smooth={true}
      >Programs</Link></li>
    <li >
      <Link
      onClick={() =>setMenuOpened(false)}
        to="Join"
        span={true}
        smooth={true}
      >Why Us</Link></li>
    <li >
      <Link
      onClick={() =>setMenuOpened(false)}
        to="plans"
        span={true}
        smooth={true}
      >Plans</Link></li>
        <li >
      <Link
      onClick={() =>setMenuOpened(false)}
        to="/training"
        span={true}
        smooth={true}
      >training</Link></li>
    <li >
      <Link 
      onClick={() =>setMenuOpened(false)}
      to="testimonials"
      span={true}
      smooth={true}
      >Testimonilas</Link></li>
  </ul>
  )}
    </div>
)
}
export default Header;