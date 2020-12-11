import React from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
//Local
import Cat from "../../../assets/characters/Cat.png";
import Boxy from "../../../assets/characters/Boxy.png";
import Alligator from "../../../assets/characters/Alligator.png";
import Dracula from "../../../assets/characters/Dracula.png";
import Ghost from "../../../assets/characters/Ghost.png";
import Racoon from "../../../assets/characters/Racoon.png";
import Octopus from "../../../assets/characters/Octopus.png";
import Kevin from "../../../assets/characters/Kevin.png";
import Mouse from "../../../assets/characters/Mouse.png";


const AvatarWrapper = styled.div`
     display: flex;
     color: var(--black-color);
     align-items: center;
`

const Span = styled.span`
    margin-left: 10px;
`

//Select Options
const avatars = [
    {
      value: "cat",
      label: (
        <AvatarWrapper>
          <Avatar src={Cat} alt="cat" />
          <Span>Cat</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "boxy",
      label: (
        <AvatarWrapper>
          <Avatar src={Boxy} alt="Boxy" />
          <Span>Boxy</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "alligator",
      label: (
        <AvatarWrapper>
          <Avatar src={Alligator} alt="Alligator" />
          <Span>Alligator</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "dracula",
      label: (
        <AvatarWrapper>
          <Avatar src={Dracula} alt="Dracula" />
          <Span>Dracula</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "ghost",
      label: (
        <AvatarWrapper>
          <Avatar src={Ghost} alt="Ghost" />
          <Span>Ghost</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "racoon",
      label: (
        <AvatarWrapper>
          <Avatar src={Racoon} alt="Racoon" />
          <Span>Racoon</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "octopus",
      label: (
        <AvatarWrapper>
          <Avatar src={Octopus} alt="Octopus" />
          <Span>Octopus</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "kevin",
      label: (
        <AvatarWrapper>
          <Avatar src={Kevin} alt="Kevin" />
          <Span>Kevin</Span>
        </AvatarWrapper>
      )
    },
    {
      value: "mouse",
      label: (
        <AvatarWrapper>
          <Avatar src={Mouse} alt="Mouse" />
          <Span>Mouse</Span>
        </AvatarWrapper>
      )
    },
  ];

  export default avatars;