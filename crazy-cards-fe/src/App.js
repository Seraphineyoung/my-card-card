import React, { Component } from "react";
import { Container } from "react-bootstrap";
import UserForm from "./UserForm";
import Home from "./Home";
import CardDetails from "./CardDetails";
import Usercardoptions from "./Usercardoptions";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// import CardTypes from "./CardTypes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allCards: [],
      cardsShown: [],
      showuserDetailspage: false,
      displayCards: " ",
      postData: [],
      name: "",
      jobtype: "",
      DOB: "",
      houseNum: "",
      postcode: "",
      annualIncome: "",
      liquidCard: false,
      studentLife: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadCards();
  }

  loadCards = () => {
    fetch("https://www.mocky.io/v2/5c9bfe94360000c128d96edf")
      .then(response => response.json())
      .then(data => {
        this.setState({
          allCards: data
        });
      });
  };

  identifyStudent = () => {
    if (this.state.jobtype === "Student") {
      // this.setState({
      //   studentLife: true
      // });
      return true;
    } else {
      return false;
    }
  };

  identifyEarning = () => {
    if (this.state.annualIncome > 16000) {
      this.setState({
        liquidCard: true
      });
      return true;
    } else {
      return false;
    }
  };

  componentDidUpdate() {
    if (this.state.showuserDetailspage) {
      this.setState({
        showuserDetailspage: false
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/usercards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        jobtype: this.state.jobtype,
        DOB: this.state.DOB,
        houseNum: this.state.houseNum,
        postcode: this.state.postcode,
        annualIncome: this.state.annualIncome,
        anywhereCard: true,
        studentLife: this.identifyStudent(),
        liquidCard: this.identifyEarning()
      })
    });
    const body = await response.text();
    var bodyParse = JSON.parse(body);

    this.setState({
      postData: bodyParse
    });

    this.setState({
      name: "",
      jobtype: "",
      DOB: "",
      houseNum: "",
      postcode: "",
      annualIncome: "",
      showuserDetailspage: true
    });
  };

  emptyStatecardsShown = () => {
    this.setState({
      cardsShown: [],
      studentLife: false,
      liquidCard: false
    });
  };

  setStudentLifeState = () => {
    if (this.state.jobtype === "Student") {
      this.setState({
        studentLife: true
      });
    }
  };

  showCards = () => {
    if (this.state.studentLife && this.state.liquidCard) {
      let customerCardOptions = this.state.allCards.filter(function(
        card,
        index
      ) {
        return (
          card["Cards"] === "Student_Life" ||
          card["Cards"] === "Anywhere_Card" ||
          card["Cards"] === "Liquid_Card"
        );
      });
      this.setState({
        cardsShown: customerCardOptions
      });
    }

    if (this.state.studentLife && this.state.liquidCard === false) {
      // console.log(this.state.studentLife && this.state.liquidCard === false);
      let customerCardOptions = this.state.allCards.filter(function(
        card,
        index
      ) {
        return (
          card["Cards"] === "Student_Life" || card["Cards"] === "Anywhere_Card"
        );
      });

      this.setState({
        cardsShown: customerCardOptions
      });
    }

    if (this.state.liquidCard && this.state.studentLife === false) {
      let customerCardOptions = this.state.allCards.filter(function(
        card,
        index
      ) {
        return (
          card["Cards"] === "Liquid_Card" || card["Cards"] === "Anywhere_Card"
        );
      });

      this.setState({
        cardsShown: customerCardOptions
      });
    }

    if (this.state.liquidCard === false && this.state.studentLife === false) {
      let customerCardOptions = this.state.allCards.filter(function(
        card,
        index
      ) {
        return card["Cards"] === "Anywhere_Card";
      });

      this.setState({
        cardsShown: customerCardOptions
      });
    }
  };

  render() {
    return (
      <Router>
        <Route
          path="/"
          exact
          component={() => (
            <Container>
              <Home />
            </Container>
          )}
        />

        <Route
          path="/form"
          render={props => {
            if (!this.state.showuserDetailspage)
              return (
                <Container>
                  <UserForm
                    handleChange={this.handleChange}
                    name={this.state.name}
                    jobtype={this.state.jobtype}
                    DOB={this.state.DOB}
                    houseNum={this.state.houseNum}
                    postcode={this.state.postcode}
                    annualIncome={this.state.annualIncome}
                    handleSubmit={this.handleSubmit}
                    setStudentLifeState={this.setStudentLifeState}
                    {...props}
                  />
                </Container>
              );
            else return <Redirect to="/usercardoptions" />;
          }}
        />

        <Route
          path="/usercardoptions"
          exact
          render={props => (
            <Usercardoptions
              showCards={this.showCards}
              postData={this.state.postData}
              {...props}
            />
          )}
        />

        <Route
          path="/card-details"
          exact
          render={props => (
            <Container>
              <CardDetails
                emptyStatecardsShown={this.emptyStatecardsShown}
                cardsShown={this.state.cardsShown}
                {...props}
              />
            </Container>
          )}
        />
      </Router>
    );
  }
}

export default App;
