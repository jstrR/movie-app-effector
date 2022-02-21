import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import { Header } from "widgets/header";
import { Footer } from "shared/ui";
import NotFound from "../notFound/NotFound";

import { CircularLoader } from "shared/ui";

const MovieChartPage = lazy(() => import("./movieChartPage/MovieChartPage"));
const MovieCardPage = lazy(() => import("./movieCardPage/MovieCardPage"));
const Seats = lazy(() => import("./seats/Seats"));

const HomePage = () => (
  <>
    <Header />
    <Suspense fallback={<CircularLoader />}>
      <Routes>
        <Route path="/" element={<MovieChartPage />} />
        <Route path="/movie/:id" element={<MovieCardPage />} />
        <Route path="/movie/:id/seats" element={<Seats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </>
);

export default HomePage;
