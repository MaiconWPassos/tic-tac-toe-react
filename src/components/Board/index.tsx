import React, { useCallback, useState } from "react";
import { AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./styles.css";

const winningSequences = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const MySwal = withReactContent(Swal);
const Board: React.FC = () => {
  const [player, setPlay] = useState<string>("X");
  const [finished, setFinished] = useState(false);
  const [houses, setHouses] = useState<
    Array<{
      value: string;
      active: boolean;
    }>
  >([
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
    { value: "", active: false },
  ]);

  const isWinner = useCallback((): boolean => {
    for (let index = 0; index < winningSequences.length; index++) {
      const seq = winningSequences[index];

      let house1 = seq[0];
      let house2 = seq[1];
      let house3 = seq[2];

      if (
        houses[house1].value === player &&
        houses[house2].value === player &&
        houses[house3].value === player
      ) {
        const newHouses = houses;

        newHouses[house1].active = true;
        newHouses[house2].active = true;
        newHouses[house3].active = true;

        return true;
      }
    }

    return false;
  }, [houses, player]);

  const reset = useCallback(() => {
    setPlay("X");
    setHouses([
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
      { value: "", active: false },
    ]);
    setFinished(false)

  }, []);

  const isTie = useCallback(() => {
    if (houses.find((t) => t.value === "") === undefined) {
      MySwal.fire({
        title: `Game over`,
        icon: "error",
      });

      reset();

      setPlay("X");
    }
  }, [houses, reset]);

  const handleSetHouse = useCallback(
    (index: number) => {
      const newHouses = houses;

      if (newHouses[index].value === "") {
        newHouses[index].value = player;

        setHouses(newHouses);
        if (!isWinner()) {
          isTie();
        } else {
          setTimeout(() => {
            setPlay("X");
            MySwal.fire({
              title: `Player ${player === "X" ? 1 : 2} win`,
              icon: "success",
            });
          }, 500);
          setFinished(true)
        }

        setPlay(player === "X" ? "O" : "X");
      }
    },
    [houses, player, isTie, isWinner]
  );

  return (
    <>
      <div className="player">Player {player === "X" ? "1" : "2"}</div>
      <div className="board">
        {houses.map((h, i) => (
          <button
            className={`houses ${h.active ? "active" : ""}`}
            key={i}
            onClick={() => handleSetHouse(i)}
            disabled={finished}
          >
            {h.value !== "" ? (
              h.value === "X" ? (
                <AiOutlineClose />
              ) : (
                <BsCircle />
              )
            ) : (
              ""
            )}
          </button>
        ))}
      </div>
      <button className="reset" onClick={reset}>
        Reset <AiOutlineReload />
      </button>
    </>
  );
};

export default Board;
