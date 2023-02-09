import { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { typeValidation } from "utils/validations/typeValidation";
import { PanelContext } from "components/Panel";

import css from "./Panel.module.scss";

import _uniquedId from "lodash/uniqueId";

export const Section = ({ children, addClass, __TYPE, ...props }) => {
   // Obtenemos la función validation del contexto
   const { validation, addNewIdToSection } = useContext(PanelContext);

   const storageId = useRef(null);

   /**
    * Devuelve "true" o "false" apartir de evaluar
    * el Id de la sección con el que está en el estado.
    *
    * @returns {(Boolean)}
    */
   const isSelected = validation(storageId.current);

   useEffect(() => {
      if (!storageId.current) {
         storageId.current = parseInt(_uniquedId());
         addNewIdToSection(storageId.current);
      }
   }, [storageId]);

   return (
      <section
         role="tabpanel"
         tabIndex={-1}
         hidden={!isSelected}
         data-type={__TYPE}
         aria-hidden={!isSelected}
         aria-labelledby={`section-${storageId.current}`}
         className={`${css["c-section"]} ${isSelected && "animate__animated animate__fadeInDown animate__faster"} ${addClass ?? ""}`}
         {...props}
      >
         <span id={`section-${storageId.current}`} className="u-sr-only">
            Sección {storageId.current}
         </span>
         {children}
      </section>
   );
};

Section.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   id: PropTypes.number,
   addClass: PropTypes.string,
   __TYPE: typeValidation("Section"),
};

Section.defaultProps = {
   __TYPE: "Section",
};
