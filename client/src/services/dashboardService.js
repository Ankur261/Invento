import axios from "axios";

export const fetchDashboardStats = async () => {
  const response = await axios.get("http://localhost:8080/dashboard");
  return response.data;
};
