import PropTypes from "prop-types";
import { typeValidation } from "utils/validations/typeValidation";
import css from "./Accordion.module.scss";

export const AccordionButton = ({ children, onExpanded, isExpanded, expanded, addClass, icon, __TYPE, ...props }) => {
   return (
      <button
         data-type={__TYPE}
         onClick={onExpanded}
         className={`${css["c-accordion__button"]} u-flex ${addClass ?? ""} ${isExpanded && expanded && expanded}`}
         aria-expanded={isExpanded}
         {...props}
      >
         {children}
         {icon && icon(isExpanded)}
      </button>
   );
};

AccordionButton.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   onExpanded: PropTypes.func,
   isExpanded: PropTypes.bool,
   expanded: PropTypes.string,
   addClass: PropTypes.string,
   icon: PropTypes.func,
   __TYPE: typeValidation("AccordionButton"),
};

AccordionButton.defaultProps = {
   __TYPE: "AccordionButton",
};
