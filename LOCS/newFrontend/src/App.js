import React, {useState} from "react";

import Header from "./components/header/Header";
import Modal from './components/modal/Modal';
import MainPage from './pages/main/MainPage.js';
import SearchPage from "pages/search/SearchPage";


import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [modalActive, setModalActive] = useState(false);
  const [switchModalComponent,setSwitchModalComponent] = useState('');
  return (
    <div className="App">
     <Header setModalActive={setModalActive} setSwitchModalComponent={setSwitchModalComponent}/>
     
     <Router>
       <Switch>
         <Route exact path="/" component={MainPage}/>
         <Route exact path="/search" component={SearchPage}/>
       </Switch>
     </Router>
     <Modal active={modalActive} setActive={setModalActive} switchModalComponent={switchModalComponent}>

     </Modal>
    </div>
  );
}

export default App;
