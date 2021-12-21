import { useEffect } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  fetchProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);

  const { products, loading, error } = productList;

  const productDelete = useSelector((state) => state.productDelete);

  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);

  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo.isAdmin) {
      navigate("/login");
      //   dispatch(fetchProducts());
    } else {
      dispatch(fetchProducts());
    }

    if (successCreate || createdProduct !== undefined) {
      navigate(`/product/${createdProduct._id}/edit`);
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
    // navigate(`/products`);
  };

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={createProductHandler}>
            <i className="fas fa-plus" />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loading />}
      {errorCreate && <Message variant="danger">{error}</Message>}
      {loading && <Loading />}
      {error && <Message variant="danger">{error}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}/edit`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductListScreen;
