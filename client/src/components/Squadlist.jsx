import React, {useState} from "react"
// import ProjectForm from "./SquadForm"
import SquadItem from "./SquadItem"


function Squadlist({projectList, deleteItem}){

   const [showForm, setShowForm] = useState(false)
   const [buttonText, setButtonText] = useState("Show")

   function toggleForm() {
      setShowForm(!showForm)
      {(showForm) ? setButtonText("Show") : setButtonText("Hide")}
   }


   const showSquads = projectList.map((item) => {

      return (
         <SquadItem 
         item = {item}
         key = {item.id}
         deleteItem= {deleteItem} />
      )
   })


   return (
      <div className="card-container">
         <h2>ALL SQUADS HERE.....</h2>
         {showSquads}
         {/* <hr className="breakline" /> */}
         {/* <button onClick={toggleForm} className="formToggleButton">{buttonText} Form</button>
         {(showForm) ? <ProjectForm addProject={addProject} /> : "" } */}
      </div>
   )
}


export default Squadlist;
