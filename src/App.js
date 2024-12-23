import React from 'react';
import './App.css';
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";


function App() {
  return (
    <React.Fragment className="App">
      <Header>
        <Nav></Nav>
      </Header>
      <Main></Main>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default App;
