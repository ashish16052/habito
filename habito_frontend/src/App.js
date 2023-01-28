import React, { useState } from 'react'
import './App.scss'
import Habits from './components/Habits/Habits'
import Heatmap from './components/Heatmap/Heatmap'
import Nav from './components/Nav/Nav'

const App = () => {

  const [refresh,setrefresh] = useState(false)

  return (
    <div>
      <Nav/>
      <Heatmap refresh={refresh}/>
      <Habits changeRefresh={setrefresh} refresh={refresh}/>
    </div>
  )
}

export default App