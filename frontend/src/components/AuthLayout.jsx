import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else if (token) {
      setIsLoggedIn(true);
      navigate("/dishes");
    }
  }, [navigate]);

  return isLoggedIn && <>{children}</>;
}
