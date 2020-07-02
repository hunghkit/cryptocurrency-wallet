import React from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import {
  Col,
  Row,
  Card,
  Form,
  Button,
  CardBody,
  CardGroup,
  Container,
} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

import { FormField } from '../../components/Form';
import { useRegister } from './useRegister';

const validationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  password: yup.string().required('Password is a required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Confirm password must match'),
  email: yup
    .string()
    .required('Email is a required')
    .email('Email is not valid'),
});

export const Register = () => {
  const { onRegister, error } = useRegister();
  const { handleSubmit, errors, control } = useForm({ validationSchema });

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit(onRegister)}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
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
                      placeholder="********"
                      as={<FormField addonType="prepend" icon="icon-lock" />}
                    />
                    <Controller
                      control={control}
                      type="password"
                      name="confirmPassword"
                      errors={errors}
                      placeholder="********"
                      as={<FormField addonType="prepend" icon="icon-lock" />}
                    />
                    <Row>
                      <Col md="6">
                        <Controller
                          control={control}
                          name="firstName"
                          errors={errors}
                          placeholder="First name"
                          as={
                            <FormField addonType="prepend" icon="icon-user" />
                          }
                        />
                      </Col>
                      <Col md="6">
                        <Controller
                          control={control}
                          name="lastName"
                          errors={errors}
                          placeholder="Last name"
                          as={
                            <FormField addonType="prepend" icon="icon-user" />
                          }
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12">
                        <Button color="primary" className="btn-block">
                          Create Account
                        </Button>
                      </Col>
                      {!!error && (
                        <Col xs={12}>
                          <p className="text-danger mt-3">{error}</p>
                        </Col>
                      )}
                      <Col xs="12" className="mt-3">
                        <div className="d-flex align-items-center justify-content-center border-top">
                          <span>Have an account? </span>
                          <Link to="/sign-in">
                            <Button color="link" className="px-0">
                              Login
                            </Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
