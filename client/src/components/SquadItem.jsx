import React from "react"


function SquadItem({item, deleteItem}){

      function handleDeleteClick(){
         deleteItem(item.id)
      }

      return (
            <div className="card" >
               <button className="cardDeleteButton" onClick={handleDeleteClick}>X</button>
               <h2>{item.name}</h2>
               <img src={item.image} className="card-image" alt={item.name}></img>
               <p>{item.description}</p>
            </div>
      )
}

export default SquadItem;
