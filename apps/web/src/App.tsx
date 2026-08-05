import { useState, useEffect } from 'react'
import {api} from "./api/client";
import './App.css'

function App() {
  const [message, setMessage] = useState("");

  useEffect(()=>{
    api.get("/api/health")
    .then((response)=>{
      setMessage(response.data.service)
    })
    .catch((err)=>{
      console.error(err);
    });
  },[]);
  return (
    <>
    <div>
      <h1>AI JOB COPILOT 🚀</h1>
      <p>{message}</p>
    </div>
    </>
  )
}

export default App;