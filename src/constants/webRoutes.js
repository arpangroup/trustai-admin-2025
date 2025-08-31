import { act } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import { Users } from "lucide-react";

export const WEB_ROUTES = {
  DASHBOARD:  { path: '', element: <Dashboard /> },
  USERS:   { path: 'users', element: <Users /> },

};
