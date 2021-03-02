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

// initialize history-of-moves
const movesHistory = []

function App() {
    // declare hooks to apply values
    const [Field, setField] = useState(gameTable);
    const [Mark, setMark] = useState(0);
    const [LastWinner, setLastWinner] = useState('None');
    const [Moves, setMoves] = useState(movesHistory);

    // replace element and apply it in specific index
    const replaceElement = (arr, before, now) => {
        const result = arr.filter(element => element.id !== before)
        result.splice(before - 1, 0, {id: before, value: now})
        return result
    }

    // check if player wins by checking his moves
    const getWinningLine = (array) => {
        // store all winning moves to array
        const options = [
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
        // create array to separate player moves
        const subArray = []
        for (let x = 0; x < array.length; x++){
            subArray.push(array[x].id)
        }
        // check there is enough moves to execute loop
        if (subArray.length >= 3)
            for (let y = 0; y < options.length; y++) {
                // sort to get clear values ( sort function isn not needed because numbers are < 10 )
                const line = options[y].sort()
                // check that player have every fields of any winning lines
                const isValid = line.every(i => subArray.includes(i))
                if (isValid)
                    // return true ( win )
                    return  1
        }
        // return false ( lose )
        return 0
    }

    const getWinner = (gameField) => {
        // separate arrays to check marks
        const xArray = gameField.filter(element => element.value === 'X')
        const yArray = gameField.filter(element => element.value === 'O')
        // sort player array and check for win
        if (getWinningLine(xArray.sort())){
            // update fields and set winner
            setLastWinner('X!')
            setField(gameTable)
            // return true ( to get winner and break main function )
            return 1
        }
        // same as before but for second mark
        if (getWinningLine(yArray.sort())){
            setLastWinner('O!')
            setField(gameTable)
            return 1
        }
        return 0
    }

    const updateField = (position) => {
        // execute only if tile is empty
        if (position.value === '') {

            // pick mark
            const targetMark = (Mark === 0) ? 'X' : 'O'
            // replace old array with new updated fields
            const NewArray = replaceElement(Field, position.id, targetMark)
            const CleanField = NewArray.filter(e => e.value === '')
            // register moves to store it into array
            const newMovesArray = Moves.concat({
                id: (Moves.length === 0) ? 1 : Moves.length + 1,
                tile: position.id,
                mark: targetMark
            })

            // insert new arrays & variables with hooks
            setField(NewArray)
            setMoves(newMovesArray)
            setMark((Mark === 0) ? 1 : 0)

            // check for winner and break functions
            if (getWinner(NewArray))
                // clear movesHistory after breaking game
                return setMoves(movesHistory);

            // finish game if game field is full and no one wins
            if (CleanField.length === 0){
                setLastWinner('None')
                setField(gameTable)
                // clear movesHistory after breaking game
                return setMoves(movesHistory);
            }
        }
    }

    return ( // fill jsx code to combine react components or js code with html tags.
        <div className="App">
            <p> Tic Tac Toe, v: 1.0, author: Mihelox</p>
            <p> Next Move: {Mark === 0 ? 'X' : 'O'}</p>
            <p> Last winner: {LastWinner}</p>
            <div className="main-container">
                {Field.map((e) => (
                    <FieldView tile={e} onClick={updateField} key={e.id}/>
                ))}
            </div>
            <div className="movesHistory-container">
                <p>GameHistory: </p>
                {Moves.map((e) => (
                    <p key={e.id}>#{e.id} Mark: {e.mark}, Tile: {e.tile}</p>
                ))}
            </div>
        </div>
    );
}

export default App;
