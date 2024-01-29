import { Button, Form, Table } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AllLogsCtrl, AllLogsProvider, useAllLogsCtrlStore } from './ctrl';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const ctrl = new AllLogsCtrl();
const AllLogsPage = () => {
  useEffect(() => {
    ctrl.findIndexes();
    ctrl.search();
  }, [ctrl]);

  return (
    <AllLogsProvider value={ctrl}>
      <AllLogs />
    </AllLogsProvider>
  );
};

const AllLogs = () => {
  return (
    <>
      <h1>Todos os logs</h1>
      <p>Listagem com todos os registros de logs</p>

      <SearchBar />
      <LogsTable />
    </>
  );
};

const SearchBar = observer(() => {
  const ctrl = useAllLogsCtrlStore();
  return (
    <Form>
      <Row className="align-items-center">
        <Col xl={2}>
          <Form.Label htmlFor="country" visuallyHidden>
            Índices:
          </Form.Label>
          <Form.Select aria-label="Default select example">
            <option value={'*'}>Todos os indices</option>
            {ctrl.indexes.map((index, idx) => (
              <option key={idx} value={index.name}>
                {index.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <Form.Label htmlFor="document" visuallyHidden>
            Log contém:
          </Form.Label>
          <Form.Control id="document" value={ctrl.filterContains} onChange={ctrl.handleContains} isInvalid={!!ctrl.erros?.document} />
        </Col>
        <Col xl={3}>
          <Button type="button" className="mb-2 float-end" disabled={!!ctrl.waiting} onClick={ctrl.search}>
            Buscar
          </Button>

          <Button type="button" className="mb-2" variant="outline-secondary" disabled={!!ctrl.waiting} onClick={ctrl.handleClear}>
            Limpar
          </Button>
        </Col>
      </Row>
    </Form>
  );
});

const LogsTable = observer(() => {
  const ctrl = useAllLogsCtrlStore();
  return (
    <Table>
      <thead>
        <tr>
          <td>Índice</td>
          <td>Data</td>
          <td>Informações</td>
        </tr>
      </thead>
      <tbody>
        {ctrl?.response?.map((log, idx) => (
          <tr key={idx}>
            <td>{log.index}</td>
            <td>{log.time}</td>
            <td>{JSON.stringify(log.data)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default AllLogsPage;
