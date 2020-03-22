import Image from "./image"
import PropTypes from "prop-types"
import React from "react"

const Header = () => (
  <header
    style={{ background: `#38B6FF`, height: '10vh' }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Image/>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
