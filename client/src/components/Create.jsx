

import React, {useContext} from "react"
import CreateForm from "./CreateForm"
import ThemeContext from './ThemeContext'


function Create({ addSquad, user }) {

   const { theme } = useContext(ThemeContext);   

   return (
      <div className={`your-component ${theme}`}>
         <div className="about-container">
            <div className="card-container">
               <CreateForm addSquad={addSquad} user={user} />
            </div>
         </div>
      </div>
            
   )
}

export default Create;