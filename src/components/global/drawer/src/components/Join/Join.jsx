import React, { useRef } from "react";
import './Join.css';

const Join = () =>{
    const form = useRef();
    return(
     <div className="Join" id="join-us">
    <div className="left-j">
        <hr />
        <div>
            <span className="stoke-text">READY TO</span>
            <span> LEVEL UP</span>
        </div>
        <div>
            <span>YOUR BODY</span>
            <span className="stoke-text"> WHY US?</span>
        </div>
    </div>
    <div className="right-j">
        <form ref={form} className="email-container"> 
            <input type="email"  name="user email" placeholder="Enter Your Email address"/>
            <button className="btn btn-j">Join Now</button>
        </form>
    </div>
     </div>
    )
}
export default Join;