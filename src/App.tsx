import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Home />}></Route>)
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
