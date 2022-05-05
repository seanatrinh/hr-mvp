/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function SummaryView({ setAppView, name }) {
  const [leaderboardData, setLeaderboardData] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [dataStatus, setDataStatus] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    axios.get('/api/leaderboard')
      .then(res => {
        setLeaderboardData(res.data);
        setDataStatus(true);
      })
      .catch(err => console.log(err));
  }, []);
  // useEffect(() => {
  //   axios.get('/api/leaderboard')
  //     .then(res => {
  //       setLeaderboardData(res.data);
  //     })
  //     .then(() => {
  //       axios.get('/api/status')
  //         .then(res => {
  //           setStatusMessage(res.data);
  //           setDataStatus(true);
  //         })
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log('working')
    axios.post('/api/status', { name: name, message: e.target.value })
      .then(() => {
        axios.get('/api/status')
          .then((res) => {
            setStatusMessage(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  return (
    <Container>
      {dataStatus ?
      (
        <>
          <h2>Leaderboard</h2>
          <Table striped bordered hover>
            <thead>
              <th>#</th>
              <th>Name</th>
              <th>Workouts Recorded</th>
            </thead>
            {leaderboardData.map((obj, idx) =>
              <tr key={obj._id}>
                <td>{idx + 1}</td>
                <td>{obj._id}</td>
                <td>{obj.count}</td>
              </tr>
            )}
          </Table>
          <Alert>
            Keep working out cool people!
            written by: Kanye
            <div>
              <Button onClick={() => {
                setShowUpdate(true);
              }}>
                Update
              </Button>
              {showUpdate ? (
                <form onSubmit={(e) => handleSubmitUpdate(e)}>
                  <label>
                    <input name="message"/>
                  </label>
                  <button>Submit Update</button>
                </form>
              ) : (
                null
              )}
              <Button>
                Delete Message
              </Button>
            </div>
          </Alert>
          <Button onClick={() => setAppView('opening-screen')}>
            Go Again!
          </Button>
        </>
      )
      :
      (
        <div>
          loading
        </div>
      )
      }
    </Container>
  )
}

export default SummaryView;