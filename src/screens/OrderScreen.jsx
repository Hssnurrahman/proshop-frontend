import { useEffect } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  listOrders,
} from "../actions/orderActions";
import { default as Loading, default as Message } from "../components/Message";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";
import useTitle from "../hooks/useTitle";

const OrderScreen = () => {
  // const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);

  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);

  const { orders } = orderList;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  order &&
    (order.itemsPrice = addDecimals(
      order.orders.reduce((a, c) => a + c.price * c.quantity, 0)
    ));
  order &&
    (order.taxPrice = addDecimals(
      addDecimals(Number((order.itemsPrice * 0.15).toFixed(2)))
    ));

  useEffect(() => {
    // const addPaypalScript = async () => {
    //   const { data: clientId } = await axios.get("/api/config/paypal");
    //   const script = document.createElement("script");
    //   script.type = "text/javascript";
    //   script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;

    //   script.onload = () => {
    //     setSdkReady(true);
    //   };
    //   document.body.appendChild(script);
    // };

    // addPaypalScript();

    // await axios.post("/api/config/paypal");
    dispatch(listOrders());

    if (!order || successPay || successDeliver) {
      dispatch(getOrderDetails(id));
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, id, order, successDeliver, successPay]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  useTitle("Order Screen | ProShop");

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order # {orders && orders.length}</h1>
      <Row>
        <Col md={8}>
          <ListGroup.Item>
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong> {order.user.name}
            </p>
            <p>
              <strong>Email:</strong>&nbsp;
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},
              &nbsp;{order.shippingAddress.postalCode}, &nbsp;
              {order.shippingAddress.country}
            </p>
            {order.isDelivered && (
              <Message variant="success">
                Delivered On {order.deliveredAt}
              </Message>
            )}
            {!order.isDelivered && (
              <Message variant="danger">Not Delivered</Message>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p>
              <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid && (
              <Message variant="success">Paid On {order.paidAt} </Message>
            )}
            {!order.isPaid && <Message variant="danger">Not Paid</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            <ListGroup variant="flush">
              {order.orders.map((cartItem, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col>
                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>
                    <Col md={4}>
                      {cartItem.quantity} x ${cartItem.price} = $
                      {(cartItem.quantity * cartItem.price).toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                </ListGroup.Item>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn rounded"
                    onClick={deliverHandler}
                    style={{ width: "100%" }}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
