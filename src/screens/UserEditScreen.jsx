import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);

  const { loading, user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userList");
    } else {
      if (!user || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, id, navigate, successUpdate, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser({ _id: id, name, email, isAdmin }));
  };

  return (
    <div>
      <Link to="/admin/userList" className="btn btn-light my-3">
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
          <Form.Group controlId="isAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
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

export default UserEditScreen;
