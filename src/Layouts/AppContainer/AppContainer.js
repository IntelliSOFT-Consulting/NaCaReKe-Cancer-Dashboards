import React from 'react'

function AppContainer(props) {
    const {children,style}=props

    const styles={
        ...style,
        marginTop:0
    }

    return (
        <div  className="container-fluid" style={styles}>
            {children}
        </div>
    )
}

export default AppContainer
