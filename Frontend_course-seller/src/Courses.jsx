import { useEffect, useState } from "react";

function Courses() {
    const [courses, setCourses] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/admin/courses", 
            {
                method : "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" :"Bearer " + localStorage.getItem("token")
                }
            }).then((res) => res.json().then((data) => {
                if(res.ok){
                    setCourses(data.courses);
                    // setIsLoading(false);
                }
                else{
                    console.log(data.message);
                }
            }))
    }, [])

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                    <h3 className="text-2xl font-bold text-center mb-6">Courses</h3>
                    {/* {isLoading && <p className="text-center text-red-500">Loading...</p>} */}
                    {courses.map((course) => (
                        <div key={course._id} className="mb-4 p-4 border rounded-lg">
                            <h4 className="text-lg font-bold">{course.title}</h4>
                            <p className="text-gray-600">{course.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Courses;    