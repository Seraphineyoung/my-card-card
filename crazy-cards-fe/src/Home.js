import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const JumbotronStyle = {
  marginTop: "10rem"
};

const btnStyle = {
  borderRadius: ".8rem"
};

const Home = props => {
  return (
    <Jumbotron style={JumbotronStyle} className=" align-items-center ">
      <h1 className="text-center">Crazy Card - Go Wild!</h1>

      <p>
        <Link to="/form">
          <Button
            variant="secondary"
            size="lg"
            block
            className="btn-round-lg"
            style={btnStyle}
            // onClick={props.showForm}
          >
            Check Eligibility
          </Button>
        </Link>
      </p>
    </Jumbotron>
  );
};

export default Home;
