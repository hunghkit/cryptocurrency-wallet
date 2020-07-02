import React from 'react';
import { Col, Row, Card, CardHeader, CardBody, Button } from 'reactstrap';

import { Wallet, History, Transaction, ExchangeRate } from './components';

export const Dashboard = () => (
  <Card className="animated fadeIn">
    <CardBody>
      <Row>
        <Col xs="12" md="4">
          <Wallet />
          <Transaction />
          <History />
          <Card>
            <CardHeader>IF YOU HAVE CONCERNS ABOUT PROJECT</CardHeader>
            <CardBody className="text-center">
              <Button color="primary">Contact us</Button>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" md="8">
          <ExchangeRate />
        </Col>
      </Row>
    </CardBody>
  </Card>
);
