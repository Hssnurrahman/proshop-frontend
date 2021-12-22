import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../actions/productActions";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams();

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productList);

  const { products, error, loading, page, pages } = productsList;

  useEffect(() => {
    dispatch(fetchProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {!loading && !error && (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword && keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
