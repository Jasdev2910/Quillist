import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

export const Appbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin"); // Navigate to the sign-in page
  };

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col font-bold text-xl justify-center cursor-pointer"
      >
        Quillist
      </Link>
      <div className="flex items-center relative">
        <Link to={`/publish`}>
          <button type="button" className="mr-4 text-black flex">
            <IoMdAddCircleOutline size={32} />
          </button>
        </Link>

        <div
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
          className="relative"
        >
          <Avatar size={"big"} name="harkirat" />
          {showLogout && (
            <button
              onClick={handleLogout}
              className="absolute right-0 top-8 mt-2 py-2 px-6 bg-white border rounded shadow"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// import { Avatar } from "./BlogCard";
// import { Link } from "react-router-dom";
// import { IoMdAddCircleOutline } from "react-icons/io";

// export const Appbar = () => {

//   return (
//     <div className="border-b flex justify-between px-10 py-4">
//       <Link
//         to={"/blogs"}
//         className="flex flex-col font-bold text-xl justify-center cursor-pointer"
//       >
//         Quillist
//       </Link>
//       <div className="flex items-center">
//         <Link to={`/publish`}>
//           <button type="button" className="mr-4 text-black flex">
//             <IoMdAddCircleOutline size={32} />
//           </button>
//         </Link>

//         <div onMouseEnter={}>
//         <Avatar size={"big"} name="harkirat" />
//         </div>
//       </div>
//     </div>
//   );
// };
