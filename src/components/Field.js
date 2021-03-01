import React from 'react'
import './Field.css'

function FieldView({tile, onClick}){

    const handleClick = (e) => {
        onClick(e)
    }

    return (
        <div className="field"
             key={tile.id}
             onClick={() => handleClick(tile)}>
            {tile.value}
        </div>
    )
}

export default FieldView;