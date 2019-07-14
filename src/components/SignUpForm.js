import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Field, Control, Input, Title, Hero, Container } from 'reactbulma'

class SignUpForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    errors: []
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    fetch("https://task-academy-api.herokuapp.com/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user: {
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password
        }
      })
    })
    .then(res => res.json())
    .then(user => {
      if(user.errors){
        // console.log(user.errors)
        this.setState({
          errors: user.errors
        })
        // alert(user.errors)
      }
      else{
        this.props.signUp(user)
        this.props.history.push("/home")
      }
    })
  }

  handleRemoveNotification = () => {
    this.setState({
      errors: []
    })
  }

  render() {
    // console.log(this.props.history)
    return (
      <div>
      <Hero>
        <Hero.Body>
          <Container>
            <Title>Sign Up</Title>
            <Field groupedCentered>
              <Control>
                <Input
                onChange={this.handleChange}
                name="first_name"
                value={this.state.first_name}
                type="text"
                placeholder="first name" />
              </Control>

              <Control>
              <Input
              onChange={this.handleChange}
              name="last_name"
              value={this.state.last_name}
              type="text"
              placeholder="last name"/>
              </Control>

              <Control>
              <Input
              onChange={this.handleChange}
              name="email"
              value={this.state.email}
              type="text"
              placeholder="email"/>
              </Control>

              <Control>
              <Input
              onChange={this.handleChange}
              name="password"
              value={this.state.password}
              type="password"
              placeholder="password"/>
              </Control>

              <Control>
              <Input
              onChange={this.handleChange}
              name="bio"
              value={this.state.bio}
              type="text"
              placeholder="bio"/>
              </Control>

              <Control>
              <Input
              onChange={this.handleChange}
              name="img_url"
              value={this.state.img_url}
              type="text"
              placeholder="image url"/>
              </Control>

              <Button onClick={this.handleSubmit}primary>Sign Up</Button>
            </Field>
          </Container>
        </Hero.Body>
      </Hero>

      {
        this.state.errors.length !== 0 ?
        <article className="message is-danger">
          <div className="message-header">
            <p>Error!</p>
            <button onClick={this.handleRemoveNotification} className="delete" aria-label="delete"></button>
          </div>
          <div className="message-body">
             <ul>
               {this.state.errors.map(error => {
                 return <li>{error}</li>
               })}
             </ul>
          </div>
        </article>
        :
        null
      }
      </div>
    );
  }

}

export default SignUpForm;

