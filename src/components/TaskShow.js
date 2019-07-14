import React from 'react';
import { Image, Hero, Title, Container, SubTitle, Message, Section } from 'reactbulma'

class TaskShow extends React.Component {

  state = {
    currentTask: {
      title: "",
      description: "",
      video_url: ""
    }
  }

  render() {
    return(
      <div>
        <Hero primary>
          <Hero.Body>
            <Container>
              <Title>
                {this.state.currentTask.title}
              </Title>
              <SubTitle>
                {this.state.currentTask.description}
              </SubTitle>
            </Container>
          </Hero.Body>
        </Hero>
        <div style={{width: "100%", height: "600px"}}>
            <iframe
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
              }}
                src={`https://www.youtube.com/embed/${this.state.currentTask.video_url}`}
                frameBorder="0"
              />
        </div>
      </div>

  )}

  componentDidMount(){
    fetch(`https://task-academy-api.herokuapp.com/api/v1${this.props.routerProps.location.pathname}`)
    .then(res => res.json())
    .then(task => {
      console.log(task)
      this.setState({currentTask: task})
    })

  }
}
export default TaskShow;
