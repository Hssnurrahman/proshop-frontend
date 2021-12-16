import { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Rating from "../components/Rating";

const ProductScreen = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const result = await response.json();
      setProduct(result);
    };

    fetchProduct();
  }, [id]);

  return (
    <div>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col sm={12} md={6}>
          <Image src={product.image} fluid />
        </Col>
        <Col sm={12} md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>{product.name}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                reviews={`${product.numReviews} Reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  disabled={product.countInStock === 0}
                  style={{ width: "100%" }}
                  className="rounded"
                  type="button"
                >
                  {product.countInStock > 0 ? "Add to Cart" : "Sold Out"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
