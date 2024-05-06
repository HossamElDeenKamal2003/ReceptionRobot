import React from "react";
import './Programs.css';
import { programsData } from "../../data/programsData";
import RightArrow from '../../images/rightArrow.png';

const Programs = () =>{
    return(
        <div className="programs"id="programs">
            <div className="programs-header">
                <span className="stoke-text">Explore Our</span>
                <span>Programs</span>
                <span className="stoke-text">to shape ypu</span>
              </div>
                
              <div className="programs-categories">
       {programsData.map((program) =>{
        return(
            <div className="category">
                {program.image}
                <span>{program.heading}</span>
                <span>{program.details}</span>
                <div className="join-now">
                    <span>Join Now</span>
                    <img src={RightArrow} alt="RightArrow" />
                </div>
            </div>
        )
       })}
                
            </div>
        </div>
    )
}
export default Programs;