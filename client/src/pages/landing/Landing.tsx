import "./Landing.less"
import React from "react"

interface LandingProps {

}

export const Landing: React.FC<LandingProps> = props => {
  return(
    <div>
      <h1>Booking App Landing</h1>
      <h4>Vist subdomain to view organization</h4>
    </div>
  )
}