import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Homepage from "./components/Homepage";
import CoursePage from "./components/CoursePage";
import CreateReviewPage from "./components/CreateReviewPage";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";

const config = require('./utils/config');

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const localToken = sessionStorage.getItem('accessToken');
    if (localToken == null) {
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
          //setAccessToken(res.data);
          setLoggedIn(true);
          console.log(res.data);
          sessionStorage.setItem('accessToken',res.data)
        })
        .catch((error) => {
          console.log("error " + error);
        });
      }
    }
    
  }, []);

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn}/>
      <Routes>

        <Route path="/" element={<Homepage />} />

        <Route path="/about" element={<AboutPage />} />

        <Route path="courses/:courseId">
          <Route index element={<CoursePage />} />
          <Route path="new-review" element={<CreateReviewPage />} /> {/* Route for writing a new review with auto-filled course info */}
        </Route>

        <Route path="new-review" element={<CreateReviewPage />} /> {/* Route for writing a review without auto-filled course info */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
