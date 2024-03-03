// import React, {useState} from "react"
// import ProjectForm from "./ProjectForm"
// import ProjectItem from "./ProjectItem"


// function Projects({projectList, deleteItem, addProject}){

//    const [showForm, setShowForm] = useState(false)
//    const [buttonText, setButtonText] = useState("Show")

//    function toggleForm() {
//       setShowForm(!showForm)
//       {(showForm) ? setButtonText("Show") : setButtonText("Hide")}
//    }


//    const showProjects = projectList.map((item) => {

//       return (
//          <ProjectItem 
//          item = {item}
//          key = {item.id}
//          deleteItem= {deleteItem} />
//       )
//    })


//    return (
//       <div className="card-container">
//          <h2>PROJECTS</h2>
//          {showProjects}
//          <hr className="breakline" />
//          <button onClick={toggleForm} className="formToggleButton">{buttonText} Form</button>
//          {(showForm) ? <ProjectForm addProject={addProject} /> : "" }
//       </div>
//    )
// }


// export default Projects;
