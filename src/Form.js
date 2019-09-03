import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap'

class ContactForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      errorName: null,
      errorEmail: null,
      errorPassword: null,
      errorConfirmPassword: null,
      isExactForm: false,
    }
  }

  onChangeName = event => {
    const { value } = event.target;
    const { onChangeUser } = this.props;
    onChangeUser( 'name',value );

    let errorName;
    if (!value.length) errorName ='Please enter your name';
    this.setState({errorName: errorName})
    setTimeout( () => ( 
      this.checkExactForm() 
    ),100)
  }

  onChangeEmail = event => {
    const {value} = event.target;
    const {onChangeUser} = this.props;
    onChangeUser( 'email', value );

    let checkEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let errorEmail ;
    if (!checkEmail) errorEmail = "Email is invaild";
    if (!value.length) errorEmail ='Please enter your Email';
    this.setState({errorEmail: errorEmail,})
    setTimeout(()=>( 
      this.checkExactForm() 
    ),100)
  }

  onChangePassword = event => {
    const { value } = event.target;
    const { onChangeUser } = this.props;
    onChangeUser( 'password', value);

    let errorPassword ;
    if (value.length < 8) errorPassword = 'Password must be more than 8 characters';
    if (!value.length) errorPassword ='Please enter your password';
    this.setState({errorPassword: errorPassword ,})
    setTimeout(()=>( 
      this.checkExactForm() 
    ),100)
  }

  onChangeConfirmPassword = event => {
    const { value } = event.target;
    const { onChangeUser, password } = this.props;
    onChangeUser( 'confirmPassword', value );

    let errorConfirm;
    if (!value.length) errorConfirm = 'Please enter your confirm password';
    if( password !== value ) errorConfirm = 'Password and Confirm Password is not match';
    this.setState({errorConfirmPassword: errorConfirm})
    setTimeout(()=>( 
      this.checkExactForm() 
    ),100)
  }

  handleSubmit = () => {
    if (this.state.isExactForm) this.props.onSubmitForm();
  }

  checkExactForm = () =>{
    const { email, password, name, confirmPassword } = this.props;
    const { errorConfirmPassword, errorEmail, errorPassword } = this.state;
    let isShow ;
    if ( !email || !name|| !password || !confirmPassword || errorConfirmPassword ||
      errorPassword || errorEmail ) isShow =false
      else isShow = true
    this.setState({
      isExactForm: isShow,
    })
  }

  render(){
    const { onCloseForm, name, email, password, confirmPassword} = this.props;
    const { errorName, errorEmail, errorPassword, errorConfirmPassword, isExactForm } = this.state;

    return (
      <div>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title className="">Contact Form</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Name*: </Form.Label>
                <Form.Control 
                  onChange={this.onChangeName}
                  value={name}
                />
                { 
                  errorName &&
                  <div className="error">{errorName}</div>
                }
              </Form.Group>

              <Form.Group>
                <Form.Label>Email*: </Form.Label>
                <Form.Control 
                  onChange={this.onChangeEmail}
                  value={email}
                />
                { 
                  errorEmail &&
                  <div className="error">{errorEmail}</div>
                }
              </Form.Group>

              <Form.Group>
                <Form.Label>Password*: </Form.Label>
                <Form.Control 
                  type="password"
                  onChange={this.onChangePassword}
                  value={password}
                />
                { 
                  errorPassword &&
                  <div className="error">{errorPassword}</div>
                }
              </Form.Group>

              <Form.Group>
                <Form.Label>Confirm Password*: </Form.Label>
                <Form.Control 
                  type="password"
                  onChange={this.onChangeConfirmPassword}
                  value={confirmPassword}
                />
                { 
                  errorConfirmPassword &&
                  <div className="error">{errorConfirmPassword}</div>
                }
              </Form.Group>

            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseForm}>Close</Button>
            <Button variant="primary" type="submit" onClick={this.handleSubmit}
              style={{ opacity: (isExactForm)? 1 : 0.5 }}
            >Submit</Button>
          </Modal.Footer>
        </Modal.Dialog>

      </div>
    )
  }
}

export default  ContactForm