import { useEffect } from "react";
import Board from "./components/Board";
import { moveBelow, updateBoard } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { createBoard } from "./utils/createBoard";

import {
  formulaForColumnOfFour,
  formulaForColumnOfThree,
  generateInvalidMoves,
} from "./utils/formulas";
import {
  checkForColumnOfThree,
  checkForRowOfFour,
  checkForRowOfThree,
  isColumnOfFour,
} from "./utils/moveCheckLogic";

function App() {
  const dispatch = useAppDispatch();
  const board = useAppSelector(({ candyCrush: { board } }) => board);

  const boardSize = useAppSelector(
    ({ candyCrush: { boardSize } }) => boardSize
  );

  useEffect(() => {
    dispatch(updateBoard(createBoard(boardSize)));
  }, [dispatch, boardSize]);
  console.log(dispatch, "dispatch");
  useEffect(() => {
    const timeout = setTimeout(() => {
      const newBoard = [...board];
      isColumnOfFour(newBoard, boardSize, formulaForColumnOfFour(boardSize));
      checkForRowOfFour(
        newBoard,
        boardSize,
        generateInvalidMoves(boardSize, true)
      );
      checkForColumnOfThree(
        newBoard,
        boardSize,
        formulaForColumnOfThree(boardSize)
      );
      checkForRowOfThree(newBoard, boardSize, generateInvalidMoves(boardSize));
      dispatch(updateBoard(newBoard));
      dispatch(moveBelow());
    }, 150);
    return () => clearInterval(timeout);
  }, [board, dispatch, boardSize]);

  return (
    <div className="flex flex-col  lg:flex-row items-center w-full mx-auto gap-4 justify-center h-screen bg-blue-300 ">
      <div className="bg-purple-400 hidden lg:block w-96 h-[82vh]">
        <img
          src="https://www.wikihow.com/images/thumb/7/7c/Play-Candy-Crush-Saga-Step-4-Version-2.jpg/v4-460px-Play-Candy-Crush-Saga-Step-4-Version-2.jpg"
          alt=""
          className="w-96 h-full"
        />
      </div>
      <div>
        <Board />
      </div>
      <div className=" lg:flex gap-4 flex-col hidden  w-96 h-[82vh]">
        <div className="bg-purple-400 w-96 h-[40vh]">
          <img
            src="https://www.pandasecurity.com/en/mediacenter/src/uploads/2014/03/candycrush-1024x736.jpg"
            alt=""
            className="w-96 h-full"
          />
        </div>
        <div className="bg-purple-400 w-96 h-[40vh]">
          <img
            src="https://www.pandasecurity.com/en/mediacenter/src/uploads/2014/03/candycrush-1024x736.jpg"
            alt=""
            className="w-96 h-full"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default App;
