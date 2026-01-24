import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/App.css";
import ErrorRoute from "./routes/ErrorRoute";
import RootLayout from "./routes/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorRoute />,
    children: [{ path: "/", element: <div>MAIN</div> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
