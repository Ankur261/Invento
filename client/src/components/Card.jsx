import { useState } from "react";



const Card = ({ title, value, color }) => (
  <div className={`p-6 text-white rounded shadow ${color}`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export default Card;