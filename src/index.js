import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./views/components/header/Header";
import Footer from "./views/components/footer/Footer";
import Home from "./views/components/home/Home";
import NotFound from "./views/components/not-found/NotFound";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.Fragment>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </React.Fragment>,
);

serviceWorker.unregister();
