import React from 'react'
import './HeaderComponent.css'

function Square({tile, onClick}){

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

export default Square;