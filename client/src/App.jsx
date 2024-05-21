
import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Chat from "./components/Chat"


// import Chat from "./components/Chat"
import ThemeProvider from './components/ThemeProvider'


import "./App.css"


function App() {
    const [active, setActive] = useState(true)
   const [user, setUser] = useState(null)
   // New for phase 4 test
   const [myPostList, setMyPostList] = useState([])
   

   useEffect(() => {
      fetchUser()
   }, [])


   
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


   if (!user) return (
      <>
         <Login updateUser={updateUser} />
      </>
   )
   return (
      <ThemeProvider>
         <Routes>
            <Route path='/' element={<Home user={user} logOut={logOut} updateUser={updateUser} />} />
            <Route path='chat' element={<Chat user={user} />} />
         </Routes>
      </ThemeProvider>
   )
}

export default App
