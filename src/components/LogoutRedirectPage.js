import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function LogoutRedirectPage({setLoggedIn}) {
    const navigate = useNavigate();

    useEffect(() => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setLoggedIn(false);
      navigate('/');
    }, [navigate, setLoggedIn]);
  
    return (
      <>
      </>
    );
  };