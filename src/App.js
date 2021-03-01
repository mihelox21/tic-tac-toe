import './App.css';
import FieldView  from "./components/Field";
import React, {useState} from 'react'

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


function App() {
    const [Field, setField] = useState(gameTable);
    const [Mark, setMark] = useState(0);
    const [LastWinner, setLastWinner] = useState('None');

    const replaceElement = (arr, before, now) => {
        const result = arr.filter(element => element.id !== before)
        result.splice(before - 1, 0, {id: before, value: now})
        return result
    }

    const getWinningLine = (array) => {
        const options = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7]
        ]
        const subArray = []
        for (let x = 0; x < array.length; x++){
            subArray.push(array[x].id)
        }
        if (subArray.length >= 3)
            for (let y = 0; y < options.length; y++) {
                const line = options[y].sort()
                const isValid = subArray.every(i => line.includes(i))
                if (isValid)
                    return  1
        }
        return 0
    }

    const getWinner = (gameField) => {
        const xArray = gameField.filter(element => element.value === 'X')
        const yArray = gameField.filter(element => element.value === 'O')
        if (getWinningLine(xArray.sort())){
            setLastWinner('X!')
            setField(gameTable)
        }
        if (getWinningLine(yArray.sort())){
            setLastWinner('O!')
            setField(gameTable)
        }
        return [false, '']
    }

    const updateField = (position) => {
        if (position.value === '') {
            // define updated table
            const NewArray = replaceElement(Field, position.id, (Mark === 0) ? 'X' : 'O')
            const CleanField = NewArray.filter(e => e.value === '')
            // finish game if table is full
            if (CleanField.length === 0){
                setLastWinner('None')
                setField(gameTable)
                return
            }
            // update table
            setField(NewArray)
            setMark((Mark === 0) ? 1 : 0)
            getWinner(NewArray)
        }
    }



    return (
        <div className="App">
            <p> Tic Tac Toe, v: 1.0, author: Mihelox</p>
            <p> Last winner: {LastWinner}</p>
            <div className="main-container">
                {Field.map((e) => (
                    <FieldView tile={e} onClick={updateField} key={e.id}/>
                ))}
            </div>
        </div>
    );
}

export default App;
