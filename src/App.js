import './App.css';
import FieldView  from "./components/Field";
import React, {useState} from 'react'
import GameTableStructure from "./resources/GameTableStructure";
import GameSystemStructure from "./resources/GameSystemStructure";

const App = () => {

    const [gameField, setGameField] = useState(GameTableStructure);
    const [gameMark, setGameMark] = useState(true);
    const [winner, setWinner] = useState('No one');

    const getCurrentMark = () => {
        return gameMark ? "X" : "O"
    }

    const updateCurrentMark = () => {
        return setGameMark(!gameMark)
    }

    const resetGameTableAndSetWinner = (winnerName) => {
        setWinner(winnerName)
        return setGameField(GameTableStructure)
    }

    const updateSelectedTile = id => {
        return gameField
            .filter((element) => element.id === id)
            .forEach(object => object.value = getCurrentMark())
    }

    const applyTileToGameTable = ({ id, value }) => {
        value === '' ? updateSelectedTile(id) : console.log("tile is already used")
    }

    const compareGridLine = line => {
        return line.every(
            element => (gameField[element - 1].value === getCurrentMark())
        )
    }

    const checkIfSomeoneWinGame = () => {
        return GameSystemStructure.forEach(
            element => compareGridLine(element)
                ? resetGameTableAndSetWinner(getCurrentMark())
                : ""
        )
    }

    const resetTableIfFull = () => {
        return gameField
            .filter((element) => element.value !== "")
            .length === 9 ? setGameField(GameTableStructure) : ''
    }

    const proceedGame = (field) => {
        applyTileToGameTable(field)
        checkIfSomeoneWinGame()
        resetTableIfFull()
        updateCurrentMark()
    }

    return (
        <div className="App">
            <p>TicTacToe v1.1 - @mihelox21.</p>
            <p>{`Last winner: ${winner}.`}</p>
            <p>To reset Game press F5.</p>
            <div className="main-container">
                {gameField.map( (element) => (
                    <FieldView
                        onClick={proceedGame}
                        key={element.id}
                        tile={element}
                    />
                ))}
            </div>
        </div>
    )
}

export default App;
