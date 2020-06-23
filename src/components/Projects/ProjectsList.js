import React from 'react'
import ProjectItem from './ProjectItem/ProjectItem'
import './ProjectsList.css'

const ProjectsList = (props) => {
  const projects = props.projects.map((project, index) => {
    return (
      <ProjectItem
        key={project._id}
        onSelect={props.onSelectRoute}
        index={index}
        {...project}

      />
    )
  })
  return <ul className="project__list">{projects}</ul>
}

export default ProjectsList