import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Courses() {
  const [courses, setCourses] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/admin/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token"),
      },
    }).then((res) =>
      res.json().then((data) => {
        if (res.ok) {
          setCourses(data.courses);
          // setIsLoading(false);
        } else {
          console.log(data.message);
        }
      })
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center mb-8">Courses</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
              <Link to={`/courses/${course.id}`}>
              <h4 className="text-xl font-bold mb-2">{course.title}</h4>
              </Link>
              
              <p className="text-gray-600 mb-4">{course.description}</p>
              <img
                src={course.image}
                alt="course"
                className="h-48 w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Courses;