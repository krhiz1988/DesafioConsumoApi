import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MiApi from './components/MiApi';

function App() {
  return (
    <Container>
      <Row className='justify-content-md-center mt-5'>
        <Col md="auto"><h1>Buscador de Animales</h1></Col>
        <MiApi />
      </Row>
    </Container>
   
  );
}

export default App;
