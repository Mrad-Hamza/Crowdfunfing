import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import userService from '../_services'

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                username: '',
                mailAddress :'',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstname && user.lastname && user.username && user.password && user.mailAddress) {
            userActions.register(user)
        }
    }

  render() {
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (

      <div className='grid'>
        <div className="col-md-6 col-md-offset-3">
            <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <div>
                                <div className={'field' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <InputText id="username" type="text" name="username" value={user.username} onChange={this.handleChange} />
                                    {
                                        submitted && !user.username &&
                                        <div className="help-block">Username is required.</div>
                                    }
                                </div>
                                <div>
                                    <div className={'field' + (submitted && !user.firstname ? ' has-error' : '')}>
                                        <label htmlFor="name"> First Name</label>
                                        <InputText id="firstname" type="text"  name="firstname" value={user.firstname} onChange={this.handleChange}  />
                                        {
                                        submitted && !user.firstname &&
                                        <div className="help-block">Firstname is required.</div>
                                        }
                                    </div>
                                    <div className={'field' + (submitted && !user.lastname ? ' has-error' : '')}>
                                        <label htmlFor="name">Lastname</label>
                                        <InputText id="lastname" type="text" className="form-control" name="lastname" value={user.lastname} onChange={this.handleChange}/>
                                        {
                                        submitted && !user.lastname &&
                                        <div className="help-block">Lastname is required.</div>
                                        }
                                    </div>
                                    <div className={'field' + (submitted && !user.mailAddress ? ' has-error' : '')}>
                                        <label htmlFor="mailAddress">E-mail</label>
                                        <InputText id="mailAddress" type="text" name="mailAddress" value={user.mailAddress} onChange={this.handleChange}/>
                                        {
                                        submitted && !user.mailAddress &&
                                        <div className="help-block">Mail address is required.</div>
                                        }
                                    </div>
                                    <div className={'field' + (submitted && !user.password ? ' has-error' : '')}>
                                        <label htmlFor="name">Password</label>
                                        <InputText id="password" type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange}/>
                                        {
                                        submitted && !user.password &&
                                        <div className="help-block">Password is required.</div>
                                        }
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="p-2"><Button label="Confirm" className="mr-2 mb-2"/> </div>
                                    <div class="p-2"><Button label="Cancel" className="p-button-outlined mr-2 mb-2"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}
function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}
const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export default Register

