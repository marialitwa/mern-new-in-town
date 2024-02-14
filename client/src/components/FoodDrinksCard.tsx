// import React from 'react'

import styled from "styled-components";
import { Food } from "../@types/foods";

type Props = {
  food: Food;
};

function FoodDrinksCard({ food }: Props) {
  return (
    <>
      <CardContainer>
        <p>{food.name}</p>
        <p>{food.city_district}</p>
      </CardContainer>
    </>
  );
}

export default FoodDrinksCard;

// STYLING

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em 1em 1em 3em;
  margin: 1em 2em;

  //glass effect
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
