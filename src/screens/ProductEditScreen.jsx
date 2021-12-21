import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "axios";

const ProductEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);

  const { loading, product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productList");
    } else {
      if (!product || product._id !== id) {
        dispatch(getProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, id, navigate, product, successUpdate]);

  const uploadFileHandler = async (event) => {
    const file = event.target.files[0];
    const formData = FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  return (
    <div>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading && <Loading />}
        {error && <Message>{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            {/* <Form.File></Form.File> */}
          </Form.Group>
          {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={uploadFileHandler} />
            {uploading && <Loading />}
          </Form.Group> */}
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>s
            <Form.Control
              type="text"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;
