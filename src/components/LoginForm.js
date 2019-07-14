import React, { Component } from 'react';
import { Button, Field, Control, Input, Title, Hero, Container } from 'reactbulma'

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errors: ""
  }

  handleSubmit = () => {
    fetch("https://task-academy-api.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      if(user.errors){
        // alert(user.errors)
        // console.log(user.errors)
        this.setState({
          errors: user.errors
        })
      }
      else{
        this.props.login(user)
        this.props.history.push("/home")
      }
      
    })


  }
  handleRemoveNotification = () => {
    this.setState({
      errors: ""
    })
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>

      <Hero>
        <Hero.Body>
          <Container>
            <Title>
              Login
            </Title>
              <Field groupedCentered>
                <Control>

                  <Input
                  onChange={this.handleChange}
                  name="email"
                  value={this.state.email}
                  type="text"
                  placeholder="email"
                  required
                  />

              </Control>
              <Control>

                <Input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
                placeholder="password"
                required
                />

              </Control>
              <Button onClick={this.handleSubmit} primary>Login</Button>
              </Field>
          </Container>
        </Hero.Body>
      </Hero>
      {
        this.state.errors ?
        <article className="message is-danger">
          <div className="message-header">
            <p>Error!</p>
            <button onClick={this.handleRemoveNotification} className="delete" aria-label="delete"></button>
          </div>
          <div className="message-body">
             {this.state.errors}
          </div>
        </article>
        :
        null
      }
      
      </div>
    );
  }

}

export default LoginForm;