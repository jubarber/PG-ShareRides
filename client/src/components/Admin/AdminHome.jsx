import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const cookies = new Cookies()
  const navigate = useNavigate()

  useEffect(() => {
    if(cookies.get("admin") !== "true") {
      navigate("/admin")
    }
  }, [cookies])

  const logout = () => {
    cookies.remove("admin")
    navigate("/admin")
  }


  return (
    <div>
      <h1> Hola </h1>
      <button onClick={logout}> Logout </button>
    </div>
  )
}

export default AdminHome