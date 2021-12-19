import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import Message from "../components/Message";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdate = useSelector((state) => state.userUpdate);

  const { success } = userUpdate;

  const { loading, user, error } = userDetails;

  const { userInfo } = userLogin;

  console.log(success);

  // console.log(userLogin);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!userInfo) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(userInfo.name);
        setEmail(userInfo.email);
      }
    }
  }, [dispatch, navigate, user, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    } else {
      dispatch(updateUser({ id: userInfo._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Update Profile</h1>
        {message && <Message>{message}</Message>}
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
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>My Orders</Col>
    </Row>
  );
};

export default ProfileScreen;
