import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../actions/productActions";

import Rating from "../components/Rating";
import Loading from "../components/Loading";

const ProductScreen = () => {
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.productDetail);

  const { loading, error, product } = productDetail;

  const { id } = useParams();

  useEffect(() => {
    dispatch(productDetails(id));
  }, [id, dispatch]);

  return (
    <div>
      <Link to="/" className="btn btn-dark my-3">
        Go Back
      </Link>
      {loading && <Loading />}
      {!loading && !error && (
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
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
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
      )}
    </div>
  );
};

export default ProductScreen;
