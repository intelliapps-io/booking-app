import * as React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import "./account.less";
import { Button, Input, Form, Icon, Card, Alert } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { withLogin, LoginProps, MeDocument } from "../../lib/codegen";
import { allowFormSubmit } from "../../lib/helpers/helpers";
import { getOrganizationUrlName } from "../../lib/helpers/AppContext";

interface IState {
  error: string | null
}

enum MessageName {
  EMAIL_CONFIRMED = 'EMAIL_CONFIRMED'
}

type IProps = FormComponentProps & LoginProps & RouteComponentProps<{ message?: MessageName }>;

class Login extends React.Component<IProps, IState> {
  fieldNames = ["email", "password"]

  constructor(props: IProps) {
    super(props);
    this.state = {
      error: null
    }
  }

  onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { email, password } = this.props.form.getFieldsValue(this.fieldNames) as { email: string, password: string };
    this.props.mutate!({
      variables: { email, password, organizationUrlName: getOrganizationUrlName()! },
      refetchQueries: [{ query: MeDocument }],
      awaitRefetchQueries: true
    }).then(() => { this.props.history.push("/account") }).catch(() => this.setState({ error: "Email or password is incorrect" }));
  }

  renderMessage(): React.ReactNode {
    if (this.props.match.params.message === MessageName['EMAIL_CONFIRMED']) {
      return <Alert type='success' message="Your email was confirmed successfully."/> 
    }
    return <div />
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{padding: '5% 3%',}}>
        <Card className="login">
        <h2>Login</h2>
        {this.renderMessage()}
        <Form onSubmit={(event) => this.onSubmit(event)}>
          <Form.Item>
            {getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required!' }] })(
              <Input
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="email"
                placeholder="Email"
                className="input"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required!' }] })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                className="input"
              />
            )}
          </Form.Item>
          
          <div className="form-error">{this.state.error ? <div className="error">{this.state.error}</div> : null}</div>
          <div className="form-footer">
            <Button className="form-submit" htmlType="submit" disabled={allowFormSubmit(this.fieldNames, this.props.form)}>Login</Button>
            <Link to="/signup" style={{ float: "right" }}>No account? Signup Here</Link>
          </div>
        </Form>
      </Card>
      </div>
    );
  };
}

export default Form.create({ name: 'login' })(
  withLogin<FormComponentProps>()(withRouter(Login))
);