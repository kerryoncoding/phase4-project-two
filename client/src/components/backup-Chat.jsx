

import React, { useContext } from "react"
import ThemeContext from './ThemeContext'
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from "./Events";
import { MyForm } from './MyForm';


function Chat( {user, isConnected, fooEvents} ) {

   const { theme } = useContext(ThemeContext);

     return (
      <div className={`your-component ${theme}`}>
         <div className="squad-container">
            <br/>
            <div className="card-container">

               <h1>Welcome to Live Chat, {user.username}!</h1>
               {/* <hr className="breakline" /> */}
               <div className="chatbox">
                  chat Line item here....
                  <Events events={fooEvents} />
               </div>
               <ConnectionState isConnected={ isConnected } />
               <ConnectionManager />
               <MyForm />
            </div>
         </div>
      </div>
   )
}

export default Chat