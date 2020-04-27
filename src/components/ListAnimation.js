import React from 'react'
/** @jsx jsx */
import { jsx } from "theme-ui"
import Typing from 'react-typing-animation';
import Delayed from '../components/Delayed'
import { faCheck, faCheckDouble, faBorderNone } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ListAnimation = () => (
    <div className="home-animation is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
    sx={{margin: "auto", maxWidth: "100%", color: "white"}}>
      <Typing speed={40}>
     <div className="columns is-multiline">
       <div className="column is-12">                        
           <Delayed waitBeforeShow={1000}>
           <span>
           <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Discovering tomorrow's technology
           </span>
           <span>
             <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text" sx={{color: "secondary", fontWeight: "bold"}} >Discovering</a> tomorrow's technology <i>today</i>
           </span>
           </Delayed>
       </div>
       <div className="column is-12">                        
           <Delayed waitBeforeShow={1500}>
           <span>
           <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Developing tomorrow's technology
           </span>
           <span>
             <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text"  sx={{color: "secondary", fontWeight: "bold"}} >Developing</a> tomorrow's technology <i>today</i>
           </span>
           </Delayed>
       </div>
       <div className="column is-12">                        
           <Delayed waitBeforeShow={2000}>
           <span>
           <FontAwesomeIcon icon={faSquare} />&nbsp;&nbsp;Delivering tomorrow's technology
           </span>
           <span>
             <FontAwesomeIcon icon={faCheckSquare} />&nbsp;&nbsp;<a className="animation-emphasized-text"  sx={{color: "secondary", fontWeight: "bold"}} >Delivering</a> tomorrow's technology <i>today</i>
           </span>
           </Delayed>
       </div>
     </div>
     </Typing>            
   </div>
)

export default ListAnimation