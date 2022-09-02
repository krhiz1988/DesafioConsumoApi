import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const MiApi = () => {
  useEffect(() => {
    dataAnimales();
  }, []);

  const [animales, setAnimales] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const dataAnimales = async () => {
    const data = await fetch(
      "https://zoo-animal-api.herokuapp.com/animals/rand/10"
    );
    const animalesData = await data.json();
    setAnimales(animalesData);
    setTableData(animalesData);
  };

  const changeBusqueda = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (value) => {
    let resultadoBusqueda = tableData.filter((e) => {
      if (
        e.name.toString().toLowerCase().includes(value.toLowerCase()) ||
        e.animal_type.toString().toLowerCase().includes(value.toLowerCase())
      ) {
        return e;
      }
    });
    setAnimales(resultadoBusqueda);
  };

  const ordenarTabla = () => {
    const orderAnimales = [...animales].sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
    setAnimales(orderAnimales);
  };

  return (
    <Container>
      <Row className="justify-content-md-end">
        <Col xs lg="6" className="mt-4">
          <input
            className="form-control"
            value={busqueda}
            placeholder="Buscar por nombre o tipo"
            onChange={changeBusqueda}
          />
        </Col>
        <Col xs lg="4" className="mt-4">
          <Button variant="primary" onClick={ordenarTabla}>
            Ordernar A-Z
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="10" className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Nombre Animal</th>
                <th>Nombre Científico</th>
                <th>Tipo</th>
                <th>Habitat</th>
                <th>Imágen</th>
              </tr>
            </thead>
            <tbody>
              {animales.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.latin_name}</td>
                  <td>{animal.animal_type}</td>
                  <td>{animal.habitat}</td>
                  <td>
                    <Image
                      src={animal.image_link}
                      style={{ display: "block", width: 100, height: 100 }}
                      fluid
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default MiApi;
