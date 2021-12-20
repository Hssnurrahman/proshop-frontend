import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { default as Loading, default as Message } from "../components/Message";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAY_RESET } from "../constants/orderConstants";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { id } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;

  // const addDecimals = (num) => {
  //   return (Math.round(num * 100) / 100).toFixed(2);
  // };

  // order.itemsPrice = addDecimals(
  //   order.orders.reduce((a, c) => a + c.price * c.quantity, 0)
  // );

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

    if (!order || successPay) {
      dispatch(getOrderDetails(id));
      dispatch({ type: ORDER_PAY_RESET });
    } else {
      setSdkReady(true);
    }
  }, [dispatch, id, order, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(id, paymentResult));
  };

  return loading ? (
    <Loading />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
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
              <Message variant="sucess">
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
              <Message variant="sucess">Paid On {order.paidAt} </Message>
            )}
            {!order.isPaid && <Message variant="danger">Not Paid</Message>}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orders.length === 0 ? (
              <Message>Order Is Empty</Message>
            ) : (
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
                        {cartItem.quantity * cartItem.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
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
                  <PayPalButton amount="5" onSuccess={successPaymentHandler} />
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
