import React from 'react';
import ContactForm from './Form'
import './index.css'
import { Button } from 'react-bootstrap'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isShowForm: false,
      isCompletedForm: false,

      user : {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }
  }

  handleClickButton = () =>{
    this.setState({
      isShowForm: true,
    })
  }
  
  onCloseForm = () =>{
    this.setState({
      isShowForm: false,
    })
  } 

  onSubmitForm = () =>{
    this.setState({
      isShowForm: false,
      isCompletedForm: true,
    })
  }

  onChangeUser = ( field, value ) => {
    this.setState((state) => ({
      ...state,
      user:{
        name: (field==='name')? value: state.user.name,
        email: (field==='email')? value: state.user.email,
        password: (field==='password')? value: state.user.password,
        confirmPassword: (field==='confirmPassword')? value: state.user.confirmPassword,
      }
    }))
  }

  render(){
    const {
      isCompletedForm, isShowForm,
      user,
    } = this.state;
  
    return (
      <div>
        <div className="center">
          <Button 
            onClick={this.handleClickButton}
          >
            Click here!
          </Button>
          <h2>----------</h2>
        </div>

        {
          isShowForm &&
          <ContactForm
          onCloseForm={this.onCloseForm}
          onSubmitForm={this.onSubmitForm}
  
          onChangeUser={this.onChangeUser}
  
          name={user.name}
          email={user.email}
          password={user.password}
          confirmPassword={user.confirmPassword}
        />
        }
        {
          isCompletedForm &&
          <div className="center">
            <h2>Welcome!</h2>
            <ol>User: {user.name}</ol>
            <ol>Email :{user.email}</ol>
            <ol>Password: {user.password}</ol>
          </div>
        }
      </div>
    ) 
  }
}

export default App