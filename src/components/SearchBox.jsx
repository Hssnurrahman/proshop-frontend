import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(keyword);

    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} style={{ display: "flex" }}>
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => {
          setKeyword(event.target.value);
        }}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-5 mr-3"
        style={{ marginRight: "1.5rem " }}
      ></Form.Control>
      <Button
        type="submit"
        variant="outline-success"
        className="p-2"
        style={{ marginRight: "1rem " }}
      >
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
