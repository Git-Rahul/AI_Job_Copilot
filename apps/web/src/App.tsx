import { useState, useEffect } from 'react'
import { api } from "./api/client";
import ProfileForm from "./components/ProfileForm";
import './App.css'

function App() {
  const [, setMessage] = useState("");

  useEffect(() => {
    api.get("/api/health")
      .then((response) => {
        setMessage(response.data.service)
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div>
        <h1>AI JOB COPILOT 🚀</h1>
        <ProfileForm />
      </div>
    </>
  )
}

export default App;