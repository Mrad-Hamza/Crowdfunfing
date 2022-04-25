import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {userActions} from '../actions'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { userService } from '../_services';
import { users } from '../_reducers/users.reducer';

export default class Login extends React.Component {



  constructor(props) {
        super(props);

        // reset login status
//        this.props.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            userService.login(username, password);
        }
    }


    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className='box'>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                    <div className="field">
                                    <label htmlFor="username">Username</label>
                                    <InputText id="username" type="text" name="username" value={username} onChange={this.handleChange} />
                                    {submitted && !username &&
                                    <div className="help-block">Username is required</div>
                                    }
                                    </div>
                                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                    <div className='field'>
                                        <label htmlFor="password">Password</label>
                                        <InputText id="age1" type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                                        {submitted && !password &&
                                        <div className="help-block">Password is required</div>
                                        }
                                        </div>
                                    </div>
                                <div class="d-flex flex-row">
                                    <div class="p-2"><Button label="Login" className="mr-2 mb-2"/> {loggingIn } </div>
                                    <div class="p-2"><Button label="Register" className="p-button-outlined mr-2 mb-2"/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators);
export { connectedLoginPage as LoginPage };
