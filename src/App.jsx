import React, { useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

import WorkoutView from './WorkoutView.jsx';
import UserForm from './UserForm.jsx';
import OpeningScreen from './OpeningScreen.jsx';
import SummaryView from './SummaryView.jsx';

const AppContainer = styled.div`
  width: 20em;
  height: 100vh;
  min-height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function App() {
  const [appView, setAppView] = useState('summary');
  const [returningUser, setReturningUser] = useState(false);
  const [workout, setWorkout] = useState({
    name: 'Chuck Norris',
    sets: 0,
    reps: 0,
    restTime: 0,
  });

  if (appView === 'opening-screen') {
    return (
      <AppContainer>
        <OpeningScreen
          setReturningUser={setReturningUser}
          setAppView={setAppView}
        />
      </AppContainer>
    )
  } else if (appView === 'user-form') {
    return (
      <AppContainer>
        <UserForm
          returningUser={returningUser}
          workout={workout}
          setWorkout={setWorkout}
          setAppView={setAppView}
        />
      </AppContainer>
    )
  } else if (appView === 'workout') {
    return (
      <AppContainer>
        <WorkoutView
          workout={workout}
          setAppView={setAppView}
        />
      </AppContainer>
    )
  } else if (appView === 'summary') {
    return (
      <AppContainer>
        <SummaryView
          setAppView={setAppView}
          name={workout.name}
        />
      </AppContainer>
    )
  }
}

export default App
