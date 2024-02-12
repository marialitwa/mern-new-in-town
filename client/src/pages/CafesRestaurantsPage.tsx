// import React from 'react'
import { useEffect, useState } from "react";
import CafeRestaurantCard from "../components/CafeRestaurantCard";
import { CafeRestaurant } from "../@types/cafesRestaurants";
import styled from "styled-components";

const apiUrl = "http://localhost:5000/api/cafes-restaurants/all";

export default function CafesRestaurantsPage() {
  const [allCafesRestaurants, setAllCafesRestaurants] = useState<
    CafeRestaurant[]
  >([]);

  const fetchCafesAndRestaurants = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      // console.log("RESPONSE", response);

      if (!response.ok) {
        throw new Error("Network response is not ok");
      }

      const data = await response.json();
      console.log("Cafe Data", data.allCafesRestaurants);

      const cafesAndRestaurants = data.allCafesRestaurants as CafeRestaurant[];
      setAllCafesRestaurants(cafesAndRestaurants);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchCafesAndRestaurants();
  }, []);

  return (
    <>
      <HeadingContainer>
        <h1 className="text-3xl font-semibold">
          New Cafés & Restaurants to savor.
        </h1>
      </HeadingContainer>

      <div>
        {allCafesRestaurants.map((cafeRestaurant) => {
          return (
            <CafeRestaurantCard
              key={cafeRestaurant._id}
              cafeRestaurant={cafeRestaurant}
            />
          );
        })}
      </div>
    </>
  );
}

// STYLING

const HeadingContainer = styled.div`
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1.5em;
  background-color: #eee;
`;
