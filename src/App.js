import './App.css';
import Square  from "./components/HeaderComponent";
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

    const replaceElement = (arr, before, now) => {
        const result = arr.filter(element => element.id !== before)
        result.splice(before - 1, 0, {id: before, value: now})
        return result
    }

    const getWinner = (gameField) => {
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
        for (let i = 0; i < options.length; i++){
            const line = options[i]
            for (let j = 0; j < line.length; j++) {
                if (gameField.id - 1 === options[i][j] && (gameField.value === 'X' || gameField.value === 'O')){
                    return [true, gameField.value]
                }
            }
        }
        return [false, '']
    }

    const updateField = (position) => {
        console.log(getWinner(Field))
        if (position.value === '') {
            const NewArray = replaceElement(Field, position.id, (Mark === 0) ? 'X' : 'O')
            setField(NewArray)
            setMark((Mark === 0) ? 1 : 0)
            //console.log('Field status: ', Field)
        }else{
            console.log('tile is updated..')
            //console.log(Field)
        }
    }

    return (
        <div className="App">
            <div className="main-container">
                {Field.map((e) => (
                    <Square tile={e} onClick={updateField} key={e.id}/>
                ))}
            </div>
        </div>
    );
}

export default App;
