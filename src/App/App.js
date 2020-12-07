import React from "react";
import Tasklist from './Tasklist'
import Task from './Task'
import Project from "./Project";

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: [],
      tasklists: [],
      tasks: []
    }
  }

  async componentDidMount() {
    const projectsResponse = await fetch('https://app.paymoapp.com/api/projects', {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
      },
    })

    const projects = (await projectsResponse.json()).projects

    const tasklistsResponse = await fetch('https://app.paymoapp.com/api/tasklists', {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
      },
    })

    const tasklists = (await tasklistsResponse.json()).tasklists

    const tasksResponse = await fetch('https://app.paymoapp.com/api/tasks', {
      headers: {
        "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd",
      }, 
    })

    const tasks = (await tasksResponse.json()).tasks
    
    this.setState({
      projects,
      tasks,
      tasklists
    })
  }
  
  render() {
    const {projects, tasklists, tasks} = this.state;
      return projects.map( project => {
        const tasklistsCmp = tasklists
          .filter( tasklist => tasklist.project_id === project.id )
          .map( tasklist => <Tasklist key={tasklist.id} customData={tasklist.name} >
              {
                tasks
                  .filter( task => task.tasklist_id === tasklist.id )
                  .map( task => <Task key={task.id} customData={task.name} />)
              }
            </Tasklist> )
          return <Project key={project.id} customData={project.name}>
            {
              tasklistsCmp
            }
          </Project>
      })
  }
}
export default App;
