import React from 'react'
import Header from './componnents/header'
import Footer from './componnents/footer'
import UserCard from './componnents/userCards'

function index() {
  return (
     <div className="App">
      <div className="container">
        <Header />
        <UserCard />
        <Footer />
      </div>
    </div>
  )
}

export default index
