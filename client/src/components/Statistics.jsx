import React, { useContext } from "react"
import ThemeContext from './ThemeContext'

function Statistics() {

   const { theme } = useContext(ThemeContext);

   return (
      <div className={`your-component ${theme}`}>
         <div className="squad-container">
            <br/>
            <div className="card-container">
               <h1>Yeah stats!!!</h1>
               <h3>Squad Owner</h3>
               <h3>Number of Members</h3>
               <h3>Number of Posts</h3>
            </div>
          </div>
      </div>
   )
}

export default Statistics

