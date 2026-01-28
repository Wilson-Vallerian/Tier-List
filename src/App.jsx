import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorRoute from "./routes/ErrorRoute";
import RootLayout from "./routes/RootLayout";
import Body from "./components/body/Body";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorRoute />,
    children: [{ path: "/", element: <Body /> }],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
