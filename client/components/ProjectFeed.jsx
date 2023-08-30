import React from "react";
import Project from "./Project.jsx";
export default function ProjectFeed() {
    const getProjects = async () => {
        const response = await fetch('/')
        const res = await response.json;
    }
    const displayProjects = (feed) => {
        feed.forEach(element => {
            <div id= {element.id}><Project/></div>
        });
    }
  return (
    <div className="projectFeed">
      <h1>Project Feed</h1>
      <div><Project/></div>
    </div>
  );
}
