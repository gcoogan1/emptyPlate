import React from 'react';
import styled from "styled-components";

const BackgroundDiv = styled.div`
    background-color: ${({ darker }) => (darker ? "#D2D9EA" : "#F4F5F7")};
`

function BackgroundColor({children, darker}) {
    return (
        <BackgroundDiv darker={darker} className="background-color">
            {children}
        </BackgroundDiv>
    )
}

export default BackgroundColor