import React from 'react';
import RestaurantPage from './routes/RestaurantPage';
import UpdatePage from './routes/UpdatePage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './routes/Home';
import { RestaurantContextProvider }from './context/RestaurantContext'
const App = () => {
  return (
    <RestaurantContextProvider>
    <div className="container">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/restaurants/:id/update" component={UpdatePage} />
        <Route exact path="/restaurants/:id" component={RestaurantPage} />
    </Switch>
    </Router>
    </div>
  </RestaurantContextProvider>
  
  )
}

export default App;