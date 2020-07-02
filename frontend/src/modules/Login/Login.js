import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  CardBody,
  Container,
  CardGroup,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

import { useLogin } from './useLogin';
import { FormField } from '../../components/Form';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is a required')
    .email('Email format is not valid'),
  password: yup.string().required('Password is a required'),
});

export const Login = () => {
  const { onLogin, error } = useLogin();
  const { handleSubmit, errors, control } = useForm({ validationSchema });

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit(onLogin)}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <Controller
                      control={control}
                      name="email"
                      errors={errors}
                      placeholder="yourname@example.com"
                      as={
                        <FormField addonType="prepend" icon="icon-envelope" />
                      }
                    />
                    <Controller
                      control={control}
                      name="password"
                      type="password"
                      errors={errors}
                      placeholder="*******"
                      as={<FormField addonType="prepend" icon="icon-lock" />}
                    />
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">
                          Login
                        </Button>
                      </Col>
                      {!!error && (
                        <Col xs={12}>
                          <p className="text-danger mt-3">{error}</p>
                        </Col>
                      )}
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: '44%' }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Don&apos;t have an account?</p>
                    <Link to="/sign-up">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
