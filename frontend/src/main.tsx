import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup.tsx";
import { Signin } from "./pages/Signin.tsx";
import { Blog } from "./pages/Blog.tsx";
import { Blogs } from "./pages/Blogs.tsx";
import { Publish } from "./pages/Publish.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />{" "}
        {/* Redirects requests coming to "/" to the Signup component */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
