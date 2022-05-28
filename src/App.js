import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Homepage from "./components/Homepage";
import CoursePage from "./components/CoursePage";
import CreateReviewPage from "./components/CreateReviewPage";
import AboutPage from "./components/AboutPage";
import UserPage from "./components/UserPage";
import LoginRedirectPage from "./components/LoginRedirectPage";
import LogoutRedirectPage from "./components/LogoutRedirectPage";
import Navbar from "./components/Navbar";
import CourseSelector from "./components/CourseSelector";
import SearchResultPage from "./components/SearchResultPage";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  //const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    console.log(access_token);
    if (access_token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    
  }, []);

  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn}/>
      <Routes>

        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<SearchResultPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/loginRedirect" element={<LoginRedirectPage setLoggedIn={setLoggedIn}/>} />
        <Route path="/logoutRedirect" element={<LogoutRedirectPage setLoggedIn={setLoggedIn}/>} />

        <Route path="courses/:courseId">
          <Route index element={<CoursePage />} />
          <Route path="new-review" element={<CreateReviewPage />} /> {/* Route for writing a new review with auto-filled course info */}
        </Route>

        <Route path="new-review" element={<CourseSelector />} /> {/* Route for writing a review without auto-filled course info */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
