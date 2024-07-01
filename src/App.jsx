import React from "react";
import Dice from "./Dice";
import Tracking from "./Tracking";
import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [totalRolls, setTotalRolls] = useState(0);

  React.useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].number;
    const isAllSame = dice.every((die) => die.number == firstValue);
    if (isAllHeld && isAllSame) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      number: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const numberArray = [];
    for (let i = 0; i < 8; i++) {
      numberArray.push(generateNewDie());
    }
    return numberArray;
  }

  function rollDice() {
    setTotalRolls((prev) => (prev += 1));
    setDice((prev) =>
      prev.map((item) => {
        return item.isHeld ? item : generateNewDie();
      })
    );
  }

  const holdDice = (id) => {
    setDice((prev) =>
      prev.map((item) => {
        return item.id == id ? { ...item, isHeld: !item.isHeld } : item;
      })
    );
  };

  const diceItems = dice.map((value) => (
    <Dice
      value={value.number}
      isHeld={value.isHeld}
      key={value.id}
      holdDice={() => holdDice(value.id)}
    />
  ));

  function newGame() {
    setTotalRolls(0);
    setTenzies(false);
    setDice(allNewDice());
  }

  const { width, height } = window;
  return (
    <main>
      <div className="container">
        <h1 className="title">Tenzies</h1>
        <p className="info--text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice--container">{diceItems}</div>
        <button className="roll--button" onClick={tenzies ? newGame : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
        <Tracking totalRolls={totalRolls} />
      </div>
      {tenzies && <Confetti width={width} height={height} />}
    </main>
  );
}
