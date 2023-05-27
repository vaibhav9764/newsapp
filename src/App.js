
import './App.css';

import React, { useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  
  const apiKey="1c01848716374d6f91468a7a10e371ad"
  
  const [progress, setProgress] = useState(0)

  const pagesize=15;

    return (
      <>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
    
      />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey}   setProgress={setProgress} key="genreal" pageSize={pagesize} country="in" categroy="general" />} />
          <Route exact path="/business" element={<News apiKey={apiKey}   setProgress={setProgress} key="business" pageSize={pagesize} country="in" categroy="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey}   setProgress={setProgress} key="entertainment" pageSize={pagesize} country="in" categroy="entertainment" />} />
          <Route exact path="/health" element={<News apiKey={apiKey}   setProgress={setProgress} key="health" pageSize={pagesize} country="in" categroy="health" />} />
          <Route exact path="/science" element={<News apiKey={apiKey}   setProgress={setProgress} key="science" pageSize={pagesize} country="in" categroy="science" />} />
          <Route exact path="/sports" element={<News apiKey={apiKey}   setProgress={setProgress} key="sports" pageSize={pagesize} country="in" categroy="sports" />} />
          <Route exact path="/technology" element={<News apiKey={apiKey}   setProgress={setProgress} key="technology" pageSize={pagesize} country="in" categroy="technology" />} />
        </Routes>
      </>

    )
  
}

export default App;