import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import DefaultMain from "../components/defaultMain/DefaultMain";
import MovieCard from "../components/movieCard/MovieCard";
import Seats from "../components/seats/Seats";
import Footer from "../components/footer/Footer";
import NotFound from "./NotFound";

const HomePage = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<DefaultMain/>} />
        <Route path="/movie/:id" element={<MovieCard/>} />
        <Route path="/movie/:id/seats" element={<Seats/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default HomePage;
