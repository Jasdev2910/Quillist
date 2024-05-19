import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

const useUser = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<{ userId: string } | null>(
    null
  );

  const getDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setUserDetails(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  return {
    loading,
    userDetails,
  };
};

export default useUser;
