import './App.css';
import FieldView  from "./components/Field";
import React, {useState} from 'react'

// initialize game-field-structure
const gameTable = [
    {id: 1, value: ''},
    {id: 2, value: ''},
    {id: 3, value: ''},
    {id: 4, value: ''},
    {id: 5, value: ''},
    {id: 6, value: ''},
    {id: 7, value: ''},
    {id: 8, value: ''},
    {id: 9, value: ''},
]

// store all winning-lines into array
const winningLines = [
    // ---
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    // | | |
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    //  / \
    [1, 5, 9],
    [3, 5, 7]
]

// replace element and apply it in specific index
const replaceElement = (arr, before, now) => {
    const result = arr.filter(element => element.id !== before)
    result.splice(before - 1, 0, {id: before, value: now})
    return result
}

// check if player wins by checking his moves
const getWinningLine = (movesArray) => {
    // create array to separate player moves
    const subArray = []
    for (let x of movesArray){
        subArray.push(x.id)
    }
    // check there is enough moves to execute loop
    if (subArray.length >= 3)
        for (let y of winningLines) {
            // sort to get clear values ( sort function isn not needed because numbers are < 10 )
            const line = y.sort()
            // check that player have every fields of any winning lines
            const isValid = line.every(i => subArray.includes(i))
            if (isValid)
                // return true ( win )
                return  1
        }
    // return false ( lose )
    return 0
}

function App() {
    // declare hooks to apply values
    const [field, setField] = useState(gameTable);
    const [mark, setMark] = useState(0);
    const [lastWinner, setLastWinner] = useState('None');
    const [moves, setMoves] = useState([]);

    const getCurrentMark = (inNumber = false) => {
        if (inNumber)
            return (mark === 0) ? 1 : 0
        return (mark === 0) ? 'X' : 'O'
    }

    const getWinner = (gameField) => {
        // pick mark to check
        const targetMark = getCurrentMark()
        const targetArray = gameField.filter(element => element.value === targetMark)
        // sort player array and check for win
        if (getWinningLine(targetArray.sort())) {
            // update fields and set winner
            setLastWinner(targetMark)
            setField(gameTable)
            // return true ( to get winner and break main function )
            return 1
        }
        return 0
    }

    const updateField = (position) => {
        // execute only if tile is empty
        if (position.value !== '') return;

        // pick mark
        const targetMark = getCurrentMark()
        // replace old array with new updated fields
        const NewArray = replaceElement(field, position.id, targetMark)
        const CleanField = NewArray.filter(e => e.value === '')
        // register moves to store it into array
        const newMovesArray = moves.concat({
            id: (moves.length === 0) ? 1 : moves.length + 1,
            tile: position.id,
            mark: targetMark
        })

        // insert new arrays & variables with hooks
        setField(NewArray)
        setMoves(newMovesArray)
        setMark(getCurrentMark(true))

        // check for winner and break functions
        if (getWinner(NewArray))
            // clear movesHistory after breaking game
            return setMoves([]);

        // finish game if game field is full and no one wins
        if (CleanField.length > 0) return;

        setLastWinner('None')
        setField(gameTable)
        // clear movesHistory after breaking game
        return setMoves([]);
    }

    return ( // fill jsx code to combine react components or js code with html tags.
        <div className="App">
            <p> Tic Tac Toe, v: 1.0, author: Mihelox</p>
            <p> Next Move: {getCurrentMark()}</p>
            <p> Last winner: {lastWinner}</p>
            <div className="main-container">
                {field.map((e) => (
                    <FieldView tile={e} onClick={updateField} key={e.id}/>
                ))}
            </div>
            <div className="movesHistory-container">
                <p>GameHistory: </p>
                {moves.map((e) => (
                    <p key={e.id}>#{e.id} Mark: {e.mark}, Tile: {e.tile}</p>
                ))}
            </div>
        </div>
    )
}

export default App;
