"use client";

import type { NextPage } from "next";
// import { useAccount } from "wagmi";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "../components/zk-credit-score/HomePage";
import ReportPage from "../components/zk-credit-score/ReportPage";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/report/:address" element={<ReportPage />} />
        </Routes>
    </Router>
  );
};

export default Home;
