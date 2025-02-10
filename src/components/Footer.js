import React from 'react'

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        &copy; Copyright {new Date().getFullYear()}
      </div>
      <div className="aboutme">
        <button>About</button>
      </div>
    </div>
  )
}

export default Footer