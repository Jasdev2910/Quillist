import { Navigate } from "react-router-dom";

import useUser from "./hooks/useUser";

function App() {
  const user = useUser();

  if (user.loading) {
    return "loading....";
  }

  if (!user.userDetails) {
    return <Navigate to={"/signin"} />;
  }

  return <Navigate to={"/blogs"} />;
}

export default App;
