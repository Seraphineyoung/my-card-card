import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const formStyle = {
  margin: "4rem auto",
  width: "50%"
};

class UserForm extends Component {
  //     this.props.history.push("/usercardoptions");

  render() {
    return (
      <div>
        <Link to="/">
          <Button variant="dark" size="lg" className="float-right">
            Home
          </Button>
        </Link>

        <Form style={formStyle} onSubmit={this.props.handleSubmit}>
          <Form.Text className="text-muted">
            <h2>Register</h2>
          </Form.Text>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={this.props.name}
                onChange={this.props.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                as="select"
                name="jobtype"
                jobtype={this.props.jobype}
                onChange={this.props.handleChange}
              >
                <option />
                <option>Student</option>
                <option>Full time</option>
                <option>Part time</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                placeholder="Enter DOB"
                value={this.props.DOB}
                onChange={this.props.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>House Number</Form.Label>
              <Form.Control
                type="number"
                name="houseNum"
                placeholder="House Number"
                value={this.props.houseNum}
                onChange={this.props.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                name="postcode"
                placeholder="Enter Postcode"
                value={this.props.postcode}
                onChange={this.props.handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Annual Income</Form.Label>
              <Form.Control
                type="number"
                name="annualIncome"
                placeholder="Enter your Annual Income"
                value={this.props.annualIncome}
                onChange={this.props.handleChange}
              />
            </Form.Group>
          </Form.Row>
          <Button
            variant="secondary"
            size="lg"
            block
            type="submit"
            onClick={this.props.setStudentLifeState}
          >
            Check Eligibility
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(UserForm);
