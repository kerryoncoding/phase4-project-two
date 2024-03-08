import React from "react"
import SquadForm from "./SquadForm"


function addSquad(newSquad){
   fetch("http://localhost:5173/components/squadlist", {
      method: "POST",
      headers: {
         "Content-Type":"application/json"
      },
      body: JSON.stringify(newSquad)
   })
   .then(res => res.json())
   .then(data => {
      setSquadList([...squadList, data])
   })
}

function Create(){
   return (
      <div className="about-container">
         <h2>CREAT NEW PODSQUAD</h2>
         <p>this should be a form to create a new squad</p>
         <br />
         <div className="card-container">
            <h3>CREATE NEW POD</h3>
            <SquadForm addSquad={addSquad} />
         </div>
      </div>
      
   )
}

export default Create;