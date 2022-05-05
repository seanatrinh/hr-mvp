/* eslint-disable react/prop-types */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserForm({ returningUser, workout, setWorkout, setAppView }) {
  const submitForm = (e) => {
    e.preventDefault();
    setAppView('workout');
  }

  const handleChange = (e) => {
    e.preventDefault();
    setWorkout({...workout, [e.target.name]: e.target.value});
  }

  return (
    <Form onSubmit={(e) => submitForm(e)}>
      {returningUser ? (
        <div>yayeet</div>
      )
      :
      (
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter name" onChange={(e) => handleChange(e)} />
      </Form.Group>
      )
      }

      <Form.Group className="mb-3" controlId="formSets">
        <Form.Label>Enter your sets:</Form.Label>
        <Form.Control name="sets" type="number" placeholder="5" onChange={(e) => handleChange(e)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formReps">
        <Form.Label>Enter your reps:</Form.Label>
        <Form.Control name="reps" type="number" placeholder="8" onChange={(e) => handleChange(e)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Next
      </Button>
    </Form>
  )
}

export default UserForm;