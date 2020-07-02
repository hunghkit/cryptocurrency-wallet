import React from 'react';
import moment from 'moment';
import { Card, CardHeader, CardBody } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { useHistory } from '../hooks/useHistory';

import { Loading } from '../../../components/Loading';

const columns = [
  {
    dataField: 'time',
    text: 'Date',
    formatter: (cell, record) => {
      const time = moment(cell, 'X').calendar();

      return record.href ? (
        <a rel="noopener noreferrer" href={record.href} target="_blank">
          {time}
        </a>
      ) : (
        time
      );
    },
  },
  {
    dataField: 'result',
    text: 'Amount',
    style: {
      textAlign: 'right',
    },
    headerStyle: {
      width: 110,
      textAlign: 'right',
    },
    formatter: (cell) => cell / 1e8,
  },
];

export const History = () => {
  const { nodes, loading, error } = useHistory();

  return (
    <Card>
      <CardHeader>BTC HISTORY</CardHeader>
      <CardBody>
        {loading && <Loading />}
        {!!error && <p className="text-danger">{error}</p>}
        {nodes && !loading && (
          <BootstrapTable
            bordered={false}
            keyField="txid"
            data={nodes}
            columns={columns}
            noDataIndication="No history"
          />
        )}
      </CardBody>
    </Card>
  );
};
