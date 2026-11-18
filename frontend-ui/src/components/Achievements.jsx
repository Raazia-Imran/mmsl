import React from "react";
import Icon from "./Icon.jsx";
export default function Achievements({ data }) {
  return <div className="news-grid">{data.map((item,index) => (
    <article className="news-card" key={item._id}>
      <Icon name={["layers","book","file","grid"][index % 4]} size={28} />
      <h3>{item.title}</h3>
      {item.description && <p>{item.description}</p>}
    </article>
  ))}</div>;
}
