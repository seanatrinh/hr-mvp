/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';

const Header = styled.h1`
  text-align: center;
`;

function OpeningScreen({ setReturningUser, setAppView }) {
  return (
    <>
      <Header>Are you a returning user?</Header>
      <Button
        className="mt-5"
        variant="primary"
        onClick={() => {
          setReturningUser(true);
          setAppView('user-form');
        }}
      >
        Yes
      </Button>

      <Button
        className="mt-5"
        variant="primary"
        onClick={() => {
          setAppView('user-form');
        }}
      >
        No
      </Button>
    </>
  )
}

export default OpeningScreen;