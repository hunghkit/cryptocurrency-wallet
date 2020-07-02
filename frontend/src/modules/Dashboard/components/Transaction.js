import React from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { Form, Row, Col, Button, Card, CardHeader, CardBody } from 'reactstrap';

import { useTransaction } from '../hooks/useTransaction';
import { FormField } from '../../../components/Form';

yup.addMethod(yup.number, 'delocalize', function () {
  return this.transform(function (currentValue, originalValue) {
    return parseFloat(originalValue.replace(',', '.'));
  });
});

const validationSchema = yup.object().shape({
  recipient: yup.string().required('Address is a required'),
  amount: yup
    .number()
    .default(0)
    .required('Amount is a required')
    .delocalize()
    .min(0.00001),
});

export const Transaction = () => {
  const { control, errors, handleSubmit, reset } = useForm({
    validationSchema,
  });
  const { loading, error, onSubmit } = useTransaction(reset);

  return (
    <Card>
      <CardHeader>BTC Transaction</CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)} disabled={loading}>
          <Controller
            control={control}
            name="recipient"
            errors={errors}
            placeholder="Address"
            disabled={loading}
            as={<FormField addonType="prepend" icon="icon-user" />}
          />
          <Controller
            control={control}
            name="amount"
            errors={errors}
            placeholder="Amount"
            disabled={loading}
            as={
              <FormField addonType="prepend" icon="icon-credit-card" isNumber />
            }
          />
          <Row>
            <Col xs="12">
              <Button
                disabled={loading}
                color="primary"
                className="px-4 btn-block"
              >
                {`Send `}
                {loading && <i className="fa fa-spinner fa-spin" />}
              </Button>
            </Col>
            {!!error && (
              <Col xs="12">
                <p className="text-danger mt-3">{error}</p>
              </Col>
            )}
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};
