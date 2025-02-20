import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Course() {
  const [course, setCourse] = useState(null);
  const { courseId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/courses/${courseId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.course) {
          setCourse(res.data.course);
        } else {
          alert("Course not found");
        }
      })
      .catch(() => alert("Error fetching course"));
  }, [courseId]);

  if (!course) {
    return <div className="text-center text-red-500 mt-10">Course not found</div>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CourseCard course={course} />
      <UpdateCourse course={course} setCourse={setCourse} />
    </div>
  );
}

export function CourseCard({ course }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div key={course.id} className="mb-4 p-4 border rounded-lg">
        <h4 className="text-lg font-bold">{course.title}</h4>
        <p className="text-gray-600">{course.description}</p>
        <img className="h-48 w-96 object-cover" src={course.image} alt="course" />
      </div>
    </div>
  );
}

export function UpdateCourse({ course, setCourse }) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    image: course.image,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/admin/courses/${course.id}`, formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.course) {
          setCourse(res.data.course);
          alert("Course updated successfully!");
        } else {
          alert("Update failed!");
        }
      })
      .catch(() => alert("Error updating course"));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h3 className="text-2xl font-bold text-center mb-6">Update the course</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image Link</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Course;
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// function Course(){
//     const [courses, setCourses] = useState([]);
//     // const [isLoading, setIsLoading] = useState(true);
//     const {courseId} = useParams();
//     useEffect(() => {
//         fetch("http://localhost:3000/admin/courses/", 
//             {
//                 method : "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "authorization" :"Bearer " + localStorage.getItem("token")
//                 }
//             }).then((res) => res.json().then((data) => {
//                 if(res.ok){
//                     setCourses(data.courses);
//                     // setIsLoading(false);
//                 }
//                 else{
//                     alert("TRY AGAIN!")
//                 }
//             }))
//     }, [])
//     let course = courses.find(course => course.id == courseId);
//     if(!course){
//         return <div>Course not found</div>
//     }
//     return <div style={{display: "flex", justifyContent: "center"}}>
//         <CourseCard course={course}/>
//         <UpdateCourse course={course} courses = {courses} setCourses={setCourses}/>
//     </div>
// }
// export function CourseCard(props){
//     const course = props.course;
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         <div key={course.id} className="mb-4 p-4 border rounded-lg">
//             <h4 className="text-lg font-bold">{course.title}</h4>
//             <p className="text-gray-600">{course.description}</p>
//             <img className="h-48 w-96 object-cover"src={course.image} alt="course" />
//         </div>
//         </div>
//     )
// }
// export function UpdateCourse(props){
//     const [formData, setFormData] = useState({ title: "", description: "", image : "" });
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
//     const course = props.course;
//     const courses = props.courses;
//     const setCourses = props.setCourses;
//     return (
//             <div>
//                 <div className="flex items-center justify-center min-h-screen bg-gray-100">
//               <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//                 <h3 className="text-2xl font-bold text-center mb-6">Update the course</h3>
                
//                 <form onSubmit={() => {
//                     fetch("http://localhost:3000/admin/courses/"+course.id,{
//                         method : "PUT",
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": "Bearer " + localStorage.getItem("token"), //
//                         },
//                         body: JSON.stringify(formData)
//                     }).then((res) => res.json().then((data) => {
//                         if(res.ok){
//                             // setCourses(data.courses);
//                             let updatedCourses = [];
//                             for(let i = 0; i < courses.length; i++){
//                                 if(courses[i].id == course.id){
//                                     updatedCourses.push({
//                                         id : course.id,
//                                         title : course.title,
//                                         description : course.description,
//                                         image : course.image
//                                     });
//                                 }
//                                 else{
//                                     updatedCourses.push(courses[i]);
//                                 }
//                             }
//                             setCourses(updatedCourses);
//                             // alert("Course updated successfully!")
//                             // window.location = "/courses/"+course.id;
//                         }
//                         else{
//                             alert("TRY AGAIN!")
//                         }
//                     }))
//                 }}>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Title</label>
//                     <input
//                       type="text"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Description</label>
//                     <input
//                       type="text"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none"
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-gray-700">Image Link</label>
//                     <input
//                       type="text"
//                       name="image"
//                       value={formData.image}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-3 py-2 border rounded-lg focus:outline-none"
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                     >
//                     Update
//                   </button>
//                 </form>
//               </div>
//             </div>
//         </div>
//     )
// }

// export default Course;  