import React, { Component } from "react";
import { Button, Card, P } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Checkbox from "./Checkbox";

const cardsShown = ["Student_Life", "Anywhere_Card", "Liquid_Card"];

const creditStyle = {
  marginTop: "2rem",
  textAlign: "center",
  fontSize: "2rem"
};

const homebtnStyle = {
  marginTop: "2rem",
  fontSize: "2rem"
};

class CardDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxes: cardsShown.reduce(
        (cards, data) => ({
          ...cards,
          [data]: false
        }),
        {}
      ),
      totalCreditAvailable: null
    };
  }

  handleCheckboxChange = changeEvent => {
    // console.log(changeEvent.target);
    const { name } = changeEvent.target;
    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));

    this.increaseCreditAvailable(changeEvent);
  };

  increaseCreditAvailable = changeEvent => {
    const { name, id } = changeEvent.target;

    let selectedIndexObjectValue = this.props.cardsShown[id];
    console.log(selectedIndexObjectValue);

    let credit_available = 0;
    for (const key of Object.keys(selectedIndexObjectValue)) {
      if (key === "Credit_Available") {
        credit_available = selectedIndexObjectValue[key];
      }
    }
    if (this.state.checkboxes[name] === true) {
      // console.log(this.state.checkboxes[name], "true state");
      this.setState(prevState => {
        return {
          totalCreditAvailable:
            prevState.totalCreditAvailable - credit_available
        };
      });
    } else {
      this.setState(prevState => {
        // console.log(this.state.checkboxes[name], "false state");
        return {
          totalCreditAvailable:
            prevState.totalCreditAvailable + credit_available
        };
      });
    }
  };

  loadHomePage = () => {
    this.props.emptyStatecardsShown();
    return this.props.history.push("/");
  };

  render() {
    // console.log(this.state.checkboxes[name], "renderstate");
    return (
      <div>
        <Button
          variant="dark"
          size="lg"
          onClick={this.loadHomePage}
          style={homebtnStyle}
          block
        >
          Home
        </Button>

        <p style={creditStyle}>{this.state.totalCreditAvailable}</p>

        <div>
          {this.props.cardsShown.map((data, index) => {
            return (
              <Card
                key={index}
                style={{
                  margin: "auto",
                  width: "27rem",
                  marginBottom: "2rem",
                  border: "3px solid #FFFF9E"
                }}
                bg="light"
              >
                <Card.Body>
                  <Card.Header bg="warning" className="text-center">
                    {data.CardsName}
                  </Card.Header>
                  <div>
                    <Checkbox
                      label={data.Cards}
                      isSelected={this.state.checkboxes[data]}
                      onCheckboxChange={this.handleCheckboxChange}
                      key={data.id}
                      id={index}
                    />
                  </div>
                  <Card.Text className="">
                    Apr:
                    {data.Apr}
                  </Card.Text>
                  <Card.Text>
                    Balance Transfer Offer Duration:
                    {data.Balance_Transfer_Offer_Duration}
                  </Card.Text>

                  <Card.Text>
                    Purchase Offer Duration:
                    {data.Purchase_Offer_Duration}
                  </Card.Text>
                  <Card.Text>
                    Credit Available: £{data.Credit_Available}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
}
export default withRouter(CardDetails);
