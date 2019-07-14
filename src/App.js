import React from 'react';
import './App.css';
import './App.sass'
import { Switch, Route } from 'react-router-dom';
import NavBar from './containers/NavBar'
import MainContainer from './containers/MainContainer'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import ListContainer from './containers/ListContainer'
import Profile from './components/Profile'
import HomeTab from './components/HomeTab'
import TaskShow from './components/TaskShow'

class App extends React.Component {
  state = {
    activeUser: null,
    courses: [],
    enrolled: [],
    currentTask: null,
    doneTasks: [],
    draggedTask: null
  }

  signUp = (userObj) => {
    // this.setState({activeUser: userObj.user})

    let listsWithCompleteTask = []
    userObj.user.lists.map(list => {
      list.tasks.filter(task => {
        if(task.status === 'complete'){
          listsWithCompleteTask = [...listsWithCompleteTask, task]
        }
      })
    })

    let coursesWithIncompleteTask = userObj.user.lists.map(list => 
      {
        // debugger
      let filteredList = list.tasks.filter(task => {
        return task.status === "static"
      })
      list.tasks = filteredList
      return list
    })
    // debugger

    
    // debugger
    this.setState({
      activeUser: userObj.user,
      // enrolled: response.lists,
      enrolled: coursesWithIncompleteTask,
      doneTasks: listsWithCompleteTask
    })

    localStorage.setItem("token", userObj.token)

  }

  handleOnDragEnd= (result) => {
    console.log(result)
    if(result.destination === null) {
      return
    }

    if(result.destination.droppableId === 99){
      let finishedtask = null
      const newEnrolled = this.state.enrolled.filter(list => {
        if(list.id === result.source.droppableId){
          let removeTask = list.tasks.filter(task => {
            if(task.id === result.draggableId){
              finishedtask = task
            }
            return task.id !== result.draggableId
            })
          list.tasks = removeTask
          return list
        }
        return list
      })

      fetch(`https://task-academy-api.herokuapp.com/api/v1/task/${result.draggableId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          status: "complete"
        })
      })
      .then(res => res.json())
      .then(response => {
        // console.log(response)
        this.setState({
          enrolled: newEnrolled,
          doneTasks: [...this.state.doneTasks, finishedtask]
        })
      })
    }

  }


  login = (userObj) => {
    console.log(userObj)
    // let listsWithIncompleteTask = userObj.user.lists.map(list => {
    //   return list.tasks.filter(task => task.status === 'static')
    // })

    // let listsWithCompleteTask = userObj.user.lists.map(list => {
    //   return list.tasks.filter(task => task.status !== 'static')
    // })

    // this.setState({
    //   activeUser: userObj.user,
    //   doneTasks: listsWithCompleteTask,
    //   enrolled: listsWithIncompleteTask
    // })

    let listsWithCompleteTask = []
    userObj.user.lists.map(list => {
      list.tasks.filter(task => {
        if(task.status === 'complete'){
          listsWithCompleteTask = [...listsWithCompleteTask, task]
        }
      })
    })

    let coursesWithIncompleteTask = userObj.user.lists.map(list => 
      {
        // debugger
      let filteredList = list.tasks.filter(task => {
        return task.status === "static"
      })
      list.tasks = filteredList
      return list
    })
    // debugger

    
    // debugger
    this.setState({
      activeUser: userObj.user,
      // enrolled: response.lists,
      enrolled: coursesWithIncompleteTask,
      doneTasks: listsWithCompleteTask
    })
    localStorage.setItem("token", userObj.token)
  }

  logout = () => {
    this.setState({
      activeUser: null,
      enrolled: []
    })
    localStorage.removeItem("token")
  }

  renderTaskShow = (task) => {
    this.setState({currentTask: task})
  }

  enroll = (course) => {
    fetch("https://task-academy-api.herokuapp.com/api/v1/lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        course_id: course.id,
        user_id: this.state.activeUser.id
      })
    })
    .then(res => res.json())
    .then(response => this.setState((prevState) => {
      return({
        enrolled: [...prevState.enrolled, response]
      })
    }))
  }

  handleProfileChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    // console.log('enrolled initial',this.state.enrolled)
    // console.log('tasks initial', this.state.doneTasks)
    return (
      <div className="App">
      <NavBar activeUser={this.state.activeUser} logout={this.logout}/>
      <br />
      <br />
      <MainContainer activeUser={this.state.activeUser}/>

      <Switch>
        <Route path='/login' render={(routerProps) => { return <LoginForm login={this.login} {...routerProps}/> }}/>

        <Route path='/sign-up' render={(routerProps) => { return <SignUpForm signUp={this.signUp} {...routerProps}/> }}/>

        <Route path='/courses' render={(routerProps) => { return <ListContainer enroll={this.enroll} activeUser={this.state.activeUser} browse={true} courses={this.state.courses} routerProps={routerProps}/> }}/>

        <Route path="/profile" render={(routerProps) => { return <Profile handleProfileChange={this.handleChange} activeUser={this.state.activeUser}/> }} />

        <Route path="/home" render={(routerProps) => { return(<HomeTab handleOnDragEnd={this.handleOnDragEnd} doneTasks={this.state.doneTasks} renderTaskShow={this.renderTaskShow} courses={this.state.enrolled} activeUser={this.props.activeUser} routerProps={routerProps} />)}}/>

        <Route path="/task/:id" render={(routerProps) => { return(<TaskShow currentTask={this.state.currentTask} routerProps={routerProps}/>)}}/>
      </Switch>
      </div>
    )
  }


  componentDidMount = () => {
    const token = localStorage.getItem("token")
    if(token){
      fetch("https://task-academy-api.herokuapp.com/api/v1/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then (response => {
        if (response.errors) {
          localStorage.removeItem("token")
          alert(response.errors)
        } else {

          let listsWithCompleteTask = []
          response.lists.map(list => {
            list.tasks.filter(task => {
              if(task.status === 'complete'){
                listsWithCompleteTask = [...listsWithCompleteTask, task]
              }
            })
          })

          let coursesWithIncompleteTask = response.lists.map(list => 
            {
              // debugger
            let filteredList = list.tasks.filter(task => {
              return task.status === "static"
            })
            list.tasks = filteredList
            return list
          })
          // debugger

          
          // debugger
          this.setState({
            activeUser: response,
            // enrolled: response.lists,
            enrolled: coursesWithIncompleteTask,
            doneTasks: listsWithCompleteTask
          })
        }
      })
    }

    fetch(`https://task-academy-api.herokuapp.com/api/v1/courses`)
    .then(resp => resp.json())
    .then(fetchedCourses => this.setState({
      courses: fetchedCourses
    }))
  }
}
export default App;
