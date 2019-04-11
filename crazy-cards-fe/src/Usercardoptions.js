import React, { Component } from "../node_modules/react";
import {
  Button,
  Card,
  Row,
  Col,
  Container
} from "../node_modules/react-bootstrap";
import { withRouter } from "../node_modules/react-router-dom";
import { Link } from "../node_modules/react-router-dom";

const rowStyle = {
  padding: "1rem"
};

const BackGrdStyle = {
  backgroundColor: "#f7f7f7"
};

const fontStyle = {
  fontWeight: "700"
};

const conStyle = {
  height: "100vh"
};

const colStyle = {
  borderRadius: "70px 20px",
  backgroundColor: "white"
};

const nameStyle = {
  fontWeight: "700",
  fontSize: "3rem"
};

class Usercardoptions extends Component {
  showCardsShowingCards = () => {
    this.props.showCards();

    return this.props.history.push("/card-details");
  };

  render() {
    return (
      <div style={BackGrdStyle}>
        <Container style={conStyle}>
          <Link to="/">
            <Button variant="dark" size="lg" block>
              Home
            </Button>
          </Link>

          {this.props.postData.map((data, index) => {
            return (
              <Row style={rowStyle}>
                <Col xs={8} style={colStyle}>
                  <div
                    key={index}
                    style={{
                      margin: "1rem",
                      width: "25rem"
                    }}
                  >
                    <div>
                      <p style={nameStyle}>{data.name}</p>
                      <p>{data.DOB}</p>

                      <p className="float-left mr-5">{data.jobtype}</p>

                      <p>
                        House Number:{" "}
                        <span style={fontStyle}>{data.houseNum}</span>
                      </p>
                      <p className="float-left mr-5">
                        Postcode :{" "}
                        <span style={fontStyle}>{data.postcode}</span>
                      </p>

                      <p>
                        Annual Income:{" "}
                        <span style={fontStyle}>£ {data.annualIncome}</span>
                      </p>
                    </div>
                  </div>
                </Col>

                <Col>
                  <ul>
                    <p style={fontStyle}>Eligible for: </p>
                    <li className="text-muted"> Anywhere</li>
                    {data.studentLife === true ? (
                      <li className="text-muted">Student Life</li>
                    ) : null}

                    {data.liquidCard === true && (
                      <li className="text-muted"> Liquid Card </li>
                    )}
                  </ul>
                  <p>
                    <Button
                      variant="secondary"
                      size="lg"
                      active
                      onClick={this.showCardsShowingCards}
                      block
                    >
                      View Card Details
                    </Button>
                  </p>
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default withRouter(Usercardoptions);
