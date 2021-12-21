import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { deleteUser, listUsers, registerUser } from "../actions/userActions";
import Loading from "../components/Loading";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";

const UserListScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);

  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);

  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      <h1>Users</h1>
      {loading && <Loading />}
      {error && <Message variant="danger">{error}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin && (
                      <i className="fas fa-check" style={{ color: "green" }} />
                    )}
                    {!user.isAdmin && (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/user/${user._id}/edit`}>
                      <Button variant="primary" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;
