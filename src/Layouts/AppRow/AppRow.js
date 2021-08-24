import React from 'react'

function AppRow(props) {
    const {children}=props
    return (
        <div  className="row">
            {children}
        </div>
    )
}

export default AppRow
