import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
//Local Files
import Backdrop from "./Backdrop";

const WrappedModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${({ opened }) =>
    opened ? "translate(-50%, -50%)" : "translate(-50%, -150%)"};
  display: flex;
  border-radius: ${({ small }) => (small ? "5px" : "none")};
  z-index: 150;
  justify-content: center;
  opacity: ${({ opened }) => (opened ? "1" : "0")};
  visibility: ${({ opened }) => (opened ? "visible" : "hidden")};
  width: ${({ small }) => (small ? "400px" : "100%")};
  min-height: ${({ small }) => (small ? "197px" : "100vh")};
  box-shadow: 0 0.5rem 3.5em black;
  background-color: white;
  transition: all 0.1s;
  max-height: calc(100vh - 210px);
  max-height: -webkit-calc(100vh - 210px);
  max-height: -moz-calc(100vh - 210px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;


  
`;

const InsideWrapper = styled.div`
  position: relative;
  width: 100%;
  display: ${({ padded }) => (padded ? "block" : "flex")};
  padding: ${({ padded }) => (padded ? "20px 30px 10px 30px" : "none")};
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

//.memo and props are used to only render if modal is opened
const Modal = React.memo(
  ({ opened, close, children, padded, small }) => {
    return ReactDOM.createPortal(
      //first argument is what you want to render, the second you pass in your selector
      <>
        <Backdrop close={close} opened={opened} />
        <WrappedModal opened={opened} small={small}>
          <InsideWrapper padded={padded}>{children}</InsideWrapper>
        </WrappedModal>
      </>,
      document.getElementById("root-modal") //id: root-modal is also added to index.html
    );
  },
  (prevProps, nextProps) => {
    return prevProps.opened === nextProps.opened;
  }
);

export default Modal;