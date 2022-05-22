import CourseList from "./CourseList";
import Filter from "./Filter";
import Navbar from "./Navbar";

export default function Homepage() {
  
  return (
    <>
      <Navbar />
      <Filter />
      <CourseList />
    </>
  );
};