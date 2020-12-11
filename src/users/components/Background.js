import React from 'react';
//Local
import './index.css';

function Background({children}) {
    return (
        <div className="background">
            {children}
        </div>
    )
}

export default Background
