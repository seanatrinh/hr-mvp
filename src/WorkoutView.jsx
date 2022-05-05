/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert';

const NumbersContainer = styled.div`
  font-size: 10em;
  margin: auto;
  text-align: center;
`
const TopContainer = styled.div`
  height: 20%;
`
const MiddleContainer = styled.div`
  height: 50%;
`
const BottomContainer = styled.div`
  height: 20%;
`
const FinishedContainer = styled.div`
  font-size: 3em;
  margin-top: 2em;
  text-align: center;
`

function WorkoutView({ workout, setAppView }) {
  const [currentView, setCurrentView] = useState('not-started');
  const [currentSet, setCurrentSet] = useState(0);
  const [repCountdown, setRepCountdown] = useState(workout.reps);
  const [isWorkingOut, setIsWorkingOut] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const saveWorkout = (workoutObj) => {
    axios.post('/api/save', workoutObj)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    if(isWorkingOut) {
      const id = setInterval(() => {
        setRepCountdown(reps => {
          if (reps !== 0) {
            return reps - 1;
          }
        });
      }, 2000);
      return () => clearInterval(id);
    }
  }, [isWorkingOut]);

  useEffect(() => {
    if(isRunning) {
      const id = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [isRunning]);

  useEffect(() => {
    if (repCountdown == 0 && workout.sets - currentSet === 0) {
      setCurrentView('completed');
      setRepCountdown(workout.reps);
      setIsRunning(false);
      setIsWorkingOut(false);
      saveWorkout({
        ...workout,
        restTime: seconds,
      })
    } else if (repCountdown === 0) {
      setCurrentView('resting');
      setRepCountdown(workout.reps);
      setIsRunning(true);
      setIsWorkingOut(false);
    }
  }, [repCountdown]);

  if (currentView === 'not-started') {
    return (
      <>
        <TopContainer>
          <Alert>
            Sets Completed: {currentSet}
          </Alert>
          <Alert>
            Sets Reminaing: {workout.sets - currentSet}
          </Alert>

        </TopContainer>

        <MiddleContainer>
          <NumbersContainer>
            {repCountdown}
          </NumbersContainer>
          <Alert>
            reps per set
          </Alert>
        </MiddleContainer>

        <BottomContainer>
          <Button
            onClick={() => {
              setCurrentView('active');
              setCurrentSet(currentSet + 1);
              setIsWorkingOut(true);
            }}
          >
            Start Workout
          </Button>
        </BottomContainer>
      </>
    )
  } else if (currentView === 'active') {
    return (
      <>
      <TopContainer>
        <ProgressBar animated now={((workout.reps - repCountdown)/workout.reps) * 100} />
      </TopContainer>

      <MiddleContainer>
          <NumbersContainer>
            {repCountdown}
          </NumbersContainer>
          <Alert>
            reps left
          </Alert>
      </MiddleContainer>

      <BottomContainer>

      </BottomContainer>
      </>
    )
  } else if (currentView === 'resting') {
    return (
      <>
        <TopContainer>
          <Alert>
            Sets Completed: {currentSet}
          </Alert>
          <Alert>
            Sets Reminaing: {workout.sets - currentSet}
          </Alert>

        </TopContainer>

        <MiddleContainer>
          <NumbersContainer>
            {seconds}
          </NumbersContainer>
          <Alert>
            seconds of rest elapsed
          </Alert>
        </MiddleContainer>

        <BottomContainer>
          <Button
            onClick={() => {
              setCurrentSet(currentSet + 1);
              setIsWorkingOut(true);
              setIsRunning(false);
              setCurrentView('active');
            }}
          >
            Start Next Set
          </Button>
        </BottomContainer>
      </>
    )
  } else if (currentView === 'completed') {
    return (
      <>
        <TopContainer>
          <Alert variant="success">
            Sets Completed: {currentSet}
          </Alert>
          <Alert>
            Sets Reminaing: {workout.sets - currentSet}
          </Alert>

        </TopContainer>

        <MiddleContainer>
          <FinishedContainer>
            Workout Complete!
          </FinishedContainer>
        </MiddleContainer>

        <BottomContainer>
          <Button
            onClick={() => {
              setAppView('summary');
            }}
          >
            View Leaderboard
          </Button>
        </BottomContainer>
      </>
    )
  }
}

export default WorkoutView;
