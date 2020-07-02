import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Card, CardHeader, CardBody } from 'reactstrap';

import { useRate } from '../hooks/useRate';
import { Loading } from '../../../components/Loading';

const columns = [
  {
    dataField: 'currency',
    text: 'Currency',
  },
  {
    dataField: 'sell',
    text: 'Sell',
    formatter: (cell, record) =>
      cell.toLocaleString(undefined, {
        style: 'currency',
        currency: record.currency,
      }),
  },
  {
    dataField: 'buy',
    text: 'Buy',
  },
  {
    dataField: 'last',
    text: 'Martket',
  },
];

export const ExchangeRate = () => {
  const { loading, error, rates } = useRate();

  return (
    <Card>
      <CardHeader>BTC EXCHANGE RATE</CardHeader>
      <CardBody>
        {loading && <Loading />}
        {!!error && <p className="text-danger">{error}</p>}
        {rates && !loading && (
          <BootstrapTable
            bordered={false}
            keyField="currency"
            data={rates}
            columns={columns}
            noDataIndication="No Exchange Rate"
          />
        )}
      </CardBody>
    </Card>
  );
};
