
import PropTypes from "prop-types"
import React from "react"
import { DBProvider } from './Data/context'
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle={'GeoProtect'} />
      <div>
        <main><DBProvider>{children}</DBProvider></main>
        <footer></footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
