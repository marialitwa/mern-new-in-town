// import React from 'react'

import { Link } from "react-router-dom";
import CafeRestaurantCard from "../components/CafeRestaurantCard";

// type Props = {}

function CafesRestaurantsPage() {
  return (
    <>
      <Link to={"/"}>Homepage</Link>
      <h1>New Cafés & Restaurants to savor.</h1>
      <CafeRestaurantCard />
    </>
  );
}

export default CafesRestaurantsPage;
