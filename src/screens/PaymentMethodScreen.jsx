import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import ButtonComponent from "../components/Button Component";
import CheckoutSteps from "../components/ChecoutSteps";
import FormContainer from "../components/FormContainer";
import useTitle from "../hooks/useTitle";

const PaymentMethodScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));

    navigate("/placeorder");
  };

  useTitle("Payment Method Screen | ProShop");

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod">
          <Form.Label as="legend">Payment Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="PayPal Or Credit Card"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(event) => setPaymentMethod(event.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <ButtonComponent type="submit" text="Continue" />
      </Form>
    </FormContainer>
  );
};

export default PaymentMethodScreen;
