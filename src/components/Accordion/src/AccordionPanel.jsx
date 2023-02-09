import PropTypes from "prop-types";
import { typeValidation } from "utils/validations/typeValidation";
import css from "./Accordion.module.scss";

export const AccordionPanel = ({ children, isExpanded, addClass, __TYPE, ...props }) => {
   return (
      <div
         data-type={__TYPE}
         className={`${isExpanded ? css["c-accordion__panel--active"] : css["c-accordion__panel"]} ${css["c-accordion-animated"]}`}
         {...props}
      >
         <div className={`${css["c-accordion__panel-content"]} ${addClass ?? ""}`} aria-hidden={isExpanded}>
            {children}
         </div>
      </div>
   );
};

AccordionPanel.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   isExpanded: PropTypes.bool,
   addClass: PropTypes.string,
   __TYPE: typeValidation("AccordionPanel"),
};

AccordionPanel.defaultProps = {
   __TYPE: "AccordionPanel",
};
