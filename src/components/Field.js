import React from 'react'

function FieldView({ tile, onClick }){
    return (
        <div className="field"
             onClick={() => onClick(tile)}>
            {tile.value}
        </div>
    )
}

export default FieldView;