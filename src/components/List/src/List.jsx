import PropTypes from "prop-types";
import { getChildrenByType } from "utils/validations/getChildrenType";

export const List = ({ children, addClass, ...props }) => {
   return (
      <ul role="list" {...(addClass && { className: `${addClass}` })} {...props}>
         {getChildrenByType(children, ["ListItem"])}
      </ul>
   );
};

List.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
   addClass: PropTypes.string,
};
