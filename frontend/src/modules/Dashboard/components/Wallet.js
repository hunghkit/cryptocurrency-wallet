import React from 'react';
import { Col, Row, Card, CardHeader, CardBody } from 'reactstrap';

import { useWallet } from '../hooks/useWallet';
import { Loading } from '../../../components/Loading';

export const Wallet = () => {
  const { loading, error, btc } = useWallet();

  return (
    <Card>
      <CardHeader>BALANCE</CardHeader>
      <CardBody>
        {loading && <Loading />}
        {!!error && <p className="text-danger">{error}</p>}
        {btc && !loading && (
          <Row>
            <Col xs="12">
              <div className="callout callout-info">
                <small className="text-muted text-capitalize">
                  {btc.network} Wallet
                </small>
                <br />
                <strong className="h4">{btc.balance} BTC</strong>
                <br />
                <small className="text-muted">{btc.address}</small>
              </div>
            </Col>
          </Row>
        )}
      </CardBody>
    </Card>
  );
};
