import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const config = require('../utils/config');

export default function LoginRedirectPage({setLoggedIn}) {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("Loggin in...")

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get(
        "code"
        );
        const reqUrl = `${config.API_URL}/oauth/token/access?code=${code}`;

        console.log(reqUrl);
        
        if (code != null) {
            axios
            .get(reqUrl, {
            })
            .then((res) => {
                console.log(res.data["access_token"]);
                localStorage.setItem('access_token',res.data["access_token"]);
                localStorage.setItem('refresh_token',res.data["refresh_token"]);
                setLoggedIn(true);
                navigate('/');
            })
            .catch((error) => {
                console.log("error " + error);
                setMsg("error " + error);
            });
        }
      }, [navigate,setLoggedIn]);
  
    return (
      <>
        {msg}
      </>
    );
  };