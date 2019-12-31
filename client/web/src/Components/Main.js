import React from 'react';

// images
import spices from '../Images/anise-aroma-art-bazaar-277253.jpg';

const Main = () => {
  return (
    <div className="grid">
      <div>
        <h2>Your meal planning and grocery list helper.</h2>
        <p>"What's for Dinner?" is a web and mobile app designed to help make your food planning life easier.</p>
        <p>Features:</p>
        <ul>
          <li>Meal Planner</li>
          <li>Recipe Book</li>
          <li>Grocery List Builder</li>
        </ul>
      </div>
      <img className="spices" src={spices} alt="Spices"/>
    </div>
  )
}

export default Main;