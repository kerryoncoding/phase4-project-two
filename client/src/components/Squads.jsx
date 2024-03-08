import React, { useState, useEffect } from "react"
import Squadlist from "./Squadlist"

function Squads() {
   const [projectList, setProjectList] = useState([])
   const URL = "http://localhost:5173/components/squadlist"

   useEffect(()=>{
      fetch(URL)
      .then(res => res.json())
      .then(data => setProjectList(data))
   },[])

   
   function deleteItem(item){
      fetch(`${URL}/${item}`, {
         method: "DELETE",
      })
      .then(res => res.json())
      .then(data=> {
         let updatedList = projectList.filter((data)=> data.id != item)
         setProjectList(updatedList)
      })
   }


   function addProject(newProject){
      fetch("http://localhost:5173/components/squadlist", {
         method: "POST",
         headers: {
            "Content-Type":"application/json"
         },
         body: JSON.stringify(newProject)
      })
      .then(res => res.json())
      .then(data => {
         setProjectList([...projectList, data])
      })
   }


   return (
      <div className="about-container">
         <h2>LIST ALL SQADS</h2>
         <div className="card-container">
            <Squadlist projectList={projectList} addProject={addProject} deleteItem={deleteItem} />
         </div>
      </div>     
   )
}

export default Squads;