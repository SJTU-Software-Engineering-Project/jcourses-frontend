import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageWithNavbar from "./components/PageWithNavbar";
import CourseFilterAndCourseList from "./components/CourseFilterAndCourseList";
import CoursePage from "./components/CoursePage";
import LoginForm from "./components/LoginForm";
import ReviewForm from "./components/ReviewForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWithNavbar />} >
          {/* Web pages of the following routes have a navbar at the top */}

          <Route index element={<CourseFilterAndCourseList />} />

          <Route path="courses/:courseId">
            <Route index element={<CoursePage />} />
            <Route path="new-review" element={<ReviewForm />} /> {/* Route for writing a new review with auto-filled course */}
          </Route>
          
          <Route path="login" element={<LoginForm />} />

          <Route path="new-review" element={<ReviewForm />} /> {/* Route for writing a review without auto-filled course */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
