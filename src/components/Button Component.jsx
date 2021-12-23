import { Button } from "react-bootstrap";

const ButtonComponent = ({ type, text }) => {
  return (
    <Button
      type={type}
      style={{ marginTop: "1.5rem", borderRadius: "0.35rem" }}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
