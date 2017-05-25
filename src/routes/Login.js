import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Row, Form, Input } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Login.css';
import { login } from '../actions';

const FormItem = Form.Item;

class Login extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.login) {
      const { dispatch } = this.props;
      dispatch(routerRedux.push({
        pathname: '/'
      }));
    }
  }

  onSubmit = () => {
    const { dispatch, form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) return;
      const { username, password } = values;
      dispatch(login(username, password));
    })
  }

  render() {
    const { 
      form: { 
        getFieldDecorator        
      },
      errorMessage
    } = this.props;

    return (
      <div className={styles.form}>
        <form>
          <FormItem hasFeedback>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input size="large" onPressEnter={this.onSubmit} placeholder="Username" />)}
          </FormItem>
          <FormItem hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true
                }
              ]
            })(<Input size="large" type="password" onPressEnter={this.onSubmit} placeholder="Password" />)}
          </FormItem>
          <Row>
            <Button type="primary" size="large" onClick={this.onSubmit}>
              Sign in
            </Button>
            <p> {errorMessage ? errorMessage : ''} </p>
          </Row>
        </form>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  login: state.user.login,
  errorMessage: state.user.errorMessage
});

export default connect(mapStateToProps)(Form.create()(Login));
