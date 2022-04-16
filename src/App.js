import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import CoursePage from "./components/CoursePage";
import CreateReviewPage from "./components/CreateReviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Homepage />} />

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
