import { useEffect } from "react";
import { Carousel, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchTopProducts } from "../actions/productActions";
import Loading from "./Loading";
import Message from "./Message";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTop = useSelector((state) => state.productTop);

  const { products, error, loading } = productTop;

  console.log(products);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return (
    <div>
      {error && <Message variant="danger">{error}</Message>}
      <Carousel pause="hover" className="bg-dark">
        {products.map((product) => {
          return (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h2>
                    {product.name} ${product.price}
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
