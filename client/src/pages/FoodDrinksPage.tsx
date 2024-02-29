import { useEffect, useState } from "react";
import { Food } from "../@types/foods.ts";
import styled from "styled-components";
import FoodDrinksCard from "../components/FoodDrinks/FoodDrinksCard.tsx";

const apiUrl = "http://localhost:5000/api/foods/all";

export default function FoodDrinksPage() {
  const [allFoods, setAllFoods] = useState<Food[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}`);

      if (!response.ok) {
        throw new Error("network response is not ok");
      }

      const data = await response.json();
      console.log("Foods Data", data.allFoodLocations);

      const foods = data.allFoodLocations as Food[];
      setAllFoods(foods);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <HeadingContainer>
        <h1 className="text-3xl font-semibold">
          New Cafés, Bars & Restaurants to savor.
        </h1>
      </HeadingContainer>

      <div>
        {allFoods.map((food) => {
          return <FoodDrinksCard key={food._id} food={food} />;
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
