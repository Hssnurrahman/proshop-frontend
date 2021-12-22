import { Helmet } from "react-helmet";

const Meta = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "ProShop",
};

export default Meta;
