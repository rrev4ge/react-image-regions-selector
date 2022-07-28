import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './pages/Home/HomePage'

export const Routes = () => {
  return (
    <Router>
      <Route exact path='/' component={HomePage} />
    </Router>
  )
}
