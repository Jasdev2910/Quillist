import { Navigate } from "react-router-dom";
import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";
import useUser from "../hooks/useUser";

export const Signup = () => {
  const user = useUser();

  if (user.loading) {
    return "Loading.....";
  }

  if (user.userDetails) {
    return <Navigate to={"/blogs"} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signup" />
        </div>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </div>
  );
};
