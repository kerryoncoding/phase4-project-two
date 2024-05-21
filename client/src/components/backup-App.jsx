import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"


import Home from "./components/Home"
import Squads from "./components/Squads"
import Create from "./components/Create"
import Login from "./components/Login"
// new for phase 4 test
import Button from "./components/Button"
import Statistics from "./components/Statistics"
// import Chat from "./components/Chat"
import ThemeProvider from './components/ThemeProvider'

// new - socket
import { socket } from './socket';
// import { ConnectionState } from './components/ConnectionState';
// import { ConnectionManager } from './components/ConnectionManager';
// import { Events } from "./components/Events";
// import { MyForm } from './components/MyForm';
// 

import "./App.css"


function App() {
   const [squadList, setSquadList] = useState([])
   const [squadUserList, setSquadUserList] = useState([])
   const [postList, setPostList] = useState([])
   const [displayedSquads, setDisplayedSquads] = useState([])
   const [displayedPosts, setDisplayedPosts] = useState([])
   const [active, setActive] = useState(true)
   const [member, setMember] = useState([])
   const [squadNumber, setSquadNumber] = useState(0)
   const [user, setUser] = useState(null)
   // New for phase 4 test
   const [myPostList, setMyPostList] = useState([])
   
   // new - socket
   const [isConnected, setIsConnected] = useState(socket.connected);
   const [fooEvents, setFooEvents] = useState([]);
   // 



   useEffect(() => {
      fetchUser()
      fetchPosts()
      fetchSquads()
      fetchSquadUsers()
// new-sockets
      function onConnect() {
         setIsConnected(true);
       }
   
       function onDisconnect() {
         setIsConnected(false);
       }
   
       function onFooEvent(value) {
         setFooEvents(previous => [...previous, value]);
       }
   
       socket.on('connect', onConnect);
       socket.on('disconnect', onDisconnect);
       socket.on('foo', onFooEvent);
   
       return () => {
         socket.off('connect', onConnect);
         socket.off('disconnect', onDisconnect);
         socket.off('foo', onFooEvent);
       };
      // 
   }, [])



   // SQUADS: Gets all of the squads info -> squadList
   const fetchSquads = () => (
      fetch('/api/squads')
         .then(res => res.json())
         .then(data => {
            setSquadList(data)
         })
   )

   // POSTS: Gets all of the posts info -> PostList
   const fetchPosts = () => (
      fetch('/api/posts')
         .then(res => res.json())
         .then(data => {
            setPostList(data)
         })
   )


   // SQUADUSERS: Gets all squadusers -> squadUserList
   const fetchSquadUsers = () => (
      fetch('/api/squadusers')
         .then(res => res.json())
         .then(data => {
            setSquadUserList(data)
         })
   )

   
  // LOGIN - checks authorized user info -> user
  const fetchUser = () => {
   fetch('/api/authorized')
      .then(res => {
         if (res.ok) {
            res.json().then(user => setUser(user))
            setActive(true)
         } else {
            setUser(null)
            setActive(true)
         }
      })
}

// LOGOUT user
   function logOut() {
      fetch('/api/logout', { method: 'DELETE' })
         .then(res => {
            if (res.ok) {
               setMyPostList([])
               updateUser(null)
            }
         })
   }

// ### using login
   const updateUser = (user) => {
      setUser(user)
      let tempSquads = [...squadList]
         setDisplayedSquads(tempSquads)
   }


// GATHER EVERYTHING (SQUADS/POSTS) HERE:
// BY DEFAULT ALL SQUAD CARDS ARE SHOWN, ALL POSTS ARE HIDDEN
// CLICKING A CARD CHANGES ALL CARDS BUT THAT ONE FROM SHOWN/HIDDEN
// CLICKING A CARD CHANGES ALL POSTS WITH SAME SQUAD_ID FROM SHOWN/HIDDEN
   function toggleView(item) {
      if (active) {
         setSquadNumber(item.id)
         const oneSquad = displayedSquads.filter((data) => data.id == item.id)
         setDisplayedSquads(oneSquad)
         let tempPosts = [...postList]
         let onePost = tempPosts.filter((data) => data.squad_id == item.id)
         setDisplayedPosts(onePost)
         checkMemberStatus(item)
      } else {
         let tempSquads = [...squadList]
         setDisplayedSquads(tempSquads)
         setDisplayedPosts([])
         setSquadNumber(0)
      }
      setActive(!active)
   }


// CHECK IF MEMBER OF THAT SQUAD (squaduser)
   function checkMemberStatus(item) {
      let tempStatus = squadUserList.filter((data) => ((data.squad_id == item.id) && (data.user_id == user.id)))
      if (tempStatus.length == 0) {
         setMember(false)
      } else {
         setMember(tempStatus[0].membership)
      }
   }

// SQUADUSER: add to squadUser
   function joinSquad() {
      let new_member = {
         squad_id:squadNumber,
         user_id: user.id,
         membership: true
      }
      updateSquadUser(new_member)
   }

   function updateSquadUser(new_member) {
      fetch(('/api/squadusers'), {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(new_member)
      })
         .then(res => res.json())
         .then(data => 
            setSquadUserList([...squadUserList, data]),
            setMember(true))
   }


// SQUADUSER: remove from squaduser
   function leaveSquad() {
      let temp_id_list = squadUserList.filter((data) => ((data.squad_id == squadNumber) && (data.user_id == user.id)))
      let item = temp_id_list[0].id

      fetch(`/api/squadusers/${item}`, {
         method: 'DELETE',
      })
         .then(res => res.json())
         .then(data => {
            let updatedList = squadUserList.filter((data) => data.id != item)
            setSquadUserList(updatedList)
            setMember(false)
         })
   }
   

   
// CREATE NEW POST
   function makePosting(item) {
      let newPost = {
         body: item,
         user_id: user.id,
         squad_id: squadNumber,
      }
      fetch('/api/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(newPost),
      })
         .then((r) => r.json())
         .then((data) => {
            fetchPosts()
            setDisplayedPosts([...displayedPosts, data])
         });
   }


// EDIT EXISTING POST
   function editPost(item, messageBody ) {
      let updatedPost = {
         body: messageBody,
         user_id: user.id,
         squad_id: squadNumber,
      }
         
      fetch(`/api/posts/${item}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPost),
         })
         .then((r) => r.json())
         .then((data) => {
            fetchPosts()
            let updatedPosts = displayedPosts.map((post) => (item == post.id) ? data : post)
            setDisplayedPosts(updatedPosts)
      });
   }


// DELETE EXISTING POST - Removes selected post Item from "posts" table
   function deletePost(item) {
   fetch(`/api/posts/${item}`, {
      method: 'DELETE',
   })
         .then(res => res.json())
         .then(data => {
            let updatedList = displayedPosts.filter((data) => data.id != item)
            setDisplayedPosts(updatedList)
         })
   }


// SQUADS: Add a new squad to "squads" table
   function addSquad(res) {
      let updatedList = ([...squadList, res])
      setDisplayedSquads(updatedList)
      setSquadList(updatedList)
      alert("Podsquad '" + res.name + "' has successfully been created!")
   }


// SQUADS CARD: Remove clicked Squad from "squads" table
   function deleteCard(item) {
      fetch(`/api/squads/${item}`, {
         method: 'DELETE',
      })
         .then(res => res.json())
         .then(data => {
            let updatedList = squadList.filter((data) => data.id != item)
            setDisplayedSquads(updatedList)
            setSquadList(updatedList)
            setActive(true)
         })
   }


   // SEE ALL OF USERS POSTS

   function getPostsByUser() {
      alert(user.id)
      fetch(`api/posts/${user.id}`)
         .then(res => res.json())
         .then(data => setMyPostList(data))
   }





   if (!user) return (
      <>
         <Login updateUser={updateUser} />
      </>
   )
   return (
      <ThemeProvider>
         <Routes>
            <Route path='/' element={<Home user={user} logOut={logOut} updateUser={updateUser} />} />
            <Route path='button' element={<Button getPostsByUser={getPostsByUser} myPostList={myPostList}  />} />

            <Route path='squads' element={<Squads user={user} makePosting={makePosting} logOut={logOut} toggleView={toggleView}  member={member} squadList={squadList} displayedSquads={displayedSquads} displayedPosts={displayedPosts} deleteCard={deleteCard} active={active} deletePost={deletePost} editPost={editPost} joinSquad={joinSquad} leaveSquad={leaveSquad} />} />

            <Route path='create' element={<Create addSquad={addSquad} user={user} />} />
            <Route path='statistics' element={<Statistics />} />
            <Route path='chat' element={<Chat user={user} isConnected={isConnected} fooEvents={fooEvents} />} />
         </Routes>
      </ThemeProvider>
   )
}

export default App
