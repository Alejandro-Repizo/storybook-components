import { forwardRef, useMemo, useState } from "react";
import PropTypes from "prop-types";
import _uniquedId from "lodash/uniqueId";

import css from "./Input.module.scss";
import { typeValidation } from "utils/validations/typeValidation";

export const Input = forwardRef(({ addClass, label, type, placeholder, isLabelVisible, isDisabled, isRequired, onValue }, ref) => {
   // Utilizado para controlar el valor del input.
   const [value, setValue] = useState("");

   /**
    * Se crea un ID para identificar el input y además
    * para pasarlo dentro la función onValue proveniente
    * de los props.
    */
   const input = useMemo(() => _uniquedId("c-input-"), []);

   /**
    * Detecta cuando el input tiene un cambio así actualizamos
    * el estado y si existe la propiedad onValue le pasamos
    * los parámetros id y value del input.
    *
    * @param {target} target - HTMLInputElement
    */
   const onChange = ({ target }) => {
      if (onValue) onValue({ id: input, value: target.value });
      setValue(target.value);
   };

   /**
    * Comprobamos el tipo de input,
    * si no se encuentra entonces no devolvemos nada.
    */
   if (!["text", "email", "password", "date"].includes(type)) {
      return null;
   }

   return (
      <label htmlFor={input} className={`${css["c-label"]} ${addClass ?? ""}`}>
         <span className={`${!isLabelVisible && "u-sr-only"}`}> {label} </span>

         <input
            id={input}
            ref={ref}
            type={type}
            name={input}
            value={value}
            disabled={isDisabled}
            required={isRequired}
            placeholder={placeholder}
            autoComplete="off"
            onChange={onChange}
            className={css["c-input"]}
         />
      </label>
   );
});

Input.propTypes = {
   addClass: PropTypes.string,
   placeholder: PropTypes.string,
   label: PropTypes.string.isRequired,
   type: PropTypes.oneOf(["text", "email", "password", "date"]),
   isLabelVisible: PropTypes.bool,
   isDisabled: PropTypes.bool,
   isRequired: PropTypes.bool,
   onValue: PropTypes.func,
   __TYPE: typeValidation("Input"),
};

Input.defaultProps = {
   placeholder: "Default placeholder",
   isLabelVisible: false,
   label: "Default input label",
   type: "text",
   __TYPE: "Input",
};
