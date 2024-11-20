import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import './DifficultySelect.css'

function DifficultySelect() {

  const [diff, setDiff] = useState("easy")

  const setEasy = () => {
    setDiff("easy")
  }

  const setMedium = () => {
    setDiff("medium")
  }

  const setHard = () => {
    setDiff("hard")
  }

  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Set the start time in localStorage
    sessionStorage.setItem("startTime", Date.now());
    // Redirect to the whiteboard page
    navigate("/whiteboard");
  };

  return (
    <div className="diff-container">
      <h1>Difficulty Selection:</h1>
      <h2>Please select which question you would like to answer</h2>
      <h3>Easy:</h3>
      <Button onClick={setEasy} variant={diff === "easy" ? "contained" : "outlined"}>Return the sum of the even numbers in a list.</Button>
      <h3>Medium:</h3>
      <Button onClick={setMedium} variant={diff === "medium" ? "contained" : "outlined"}>Reverse a string</Button>
      <h3>Hard:</h3>
      <Button onClick={setHard} variant={diff === "hard" ? "contained" : "outlined"}>Solve the traveling salesman problem</Button><br /><br />
      <button onClick={handleGetStarted}>Start</button>
    </div>
  )
}

export default DifficultySelect