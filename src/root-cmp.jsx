import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'
import Header from './cmps/Header'

function RootCmp() {

  return (
    <div>
      <Header />
      <main className='content'>
        <Routes>
          {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
        </Routes>
      </main>
    </div>
  )
}

export default RootCmp