import { Button, Form, Pagination, Table } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { AllLogsCtrl, AllLogsProvider, useAllLogsCtrlStore } from './ctrl';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

const ctrl = new AllLogsCtrl();
const AllLogsPage = () => {
  useEffect(() => {
    ctrl.handleClear();
    ctrl.findIndexes();
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
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="filters">Filtros:</Form.Label>
            <Form.Control
              id="filters"
              as="textarea"
              rows={3}
              value={ctrl.filters}
              onChange={ctrl.handleContains}
              isInvalid={!!ctrl.erros?.document}
            />
          </Form.Group>
        </Col>
        <Col xl={3}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="country">Índices:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={ctrl.handleIndex}>
              <option>Selecione um índice</option>
              {ctrl.indexes.map((index, idx) => (
                <option key={idx} value={index.name}>
                  {index.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="button" className="mb-2 float-end" disabled={!!ctrl.waiting} onClick={ctrl.handleSearch}>
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
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th>
              Índice
              <br />
              (Index)
            </th>
            <th>
              Data
              <br />
              (Time)
            </th>
            <th>
              Informações
              <br />
              (Data)
            </th>
          </tr>
        </thead>
        <tbody>
          {ctrl?.response === null && (
            <tr>
              <td colSpan={3}>Selecione um índice e realize uma busca</td>
            </tr>
          )}
          {ctrl?.response?.length === 0 && (
            <tr>
              <td colSpan={3}>Nenhum resultado encontrado</td>
            </tr>
          )}
          {ctrl?.response?.map((log, idx) => (
            <tr key={idx}>
              <td>{log.index}</td>
              <td>{log.time}</td>
              <td>{JSON.stringify(log.data)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="mr-2" size="sm" style={{ marginBottom: 0 }}>
        <Pagination.Prev onClick={ctrl!.handlePreviewsPage} disabled={ctrl.page === 1} id="previews_page" />
        <Pagination.Item>{ctrl!.page}</Pagination.Item>
        <Pagination.Next onClick={ctrl!.handleNextPage} id="next_page" />
      </Pagination>
    </>
  );
});

export default AllLogsPage;
