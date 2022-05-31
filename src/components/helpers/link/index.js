import PropTypes from "prop-types";
import Link from "next/link";

const CustomLink = ({ url, as, className, passHref, children }) => {
  return (
    <Link href={url} as={as} passHref={passHref}>
      <a className={className}>{children}</a>
    </Link>
  );
};

export default CustomLink;

CustomLink.propTypes = {
  url: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
};
