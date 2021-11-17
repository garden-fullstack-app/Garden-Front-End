import React from "react";
import "./Styles/App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Footer from "./Components/Footer";
import AboutPage from "./Components/pages/AboutPage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import Inventory from "./Components/pages/InventoryPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      garden: [],
      loggedIn: false,
      user: [],

    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER}/crops`)
      .then(infoObj => infoObj.data)
      .then(data => this.setState({
        garden: data,
      }))
      .catch(err => console.log('error: ', err.message));
  }


  updateUser = (info) => {
    if (info) {
      this.setState({ user: info, loggedIn: true });
    }
  };

  render() {
    return (
      <>

        <Container className='text-center'>
          <Header loggedIn={this.state.loggedIn} user={this.state.user} updateUser={this.updateUser} />
          <Routes>
            <Route path='/' element={<Main loggedin={this.state.loggedIn} weather={this.state.weather} />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/inventory' element={<Inventory garden={this.state.garden}/>} />
          </Routes>
          <Footer />
        </Container>
      </>
    );
  }
}

export default withAuth0(App);
