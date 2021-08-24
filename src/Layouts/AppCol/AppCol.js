import React from 'react'

function AppCol(props) {

    return (
        <div style={{padding:0}} className={`col-sm-${props.size}`}>
            {props.children}
        </div>
    )
}

export default AppCol
