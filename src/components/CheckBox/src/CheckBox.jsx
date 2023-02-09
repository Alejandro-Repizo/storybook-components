import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import _uniqueId from "lodash/uniqueId";

import { Icon } from "components/Icon";
import { typeValidation } from "utils/validations/typeValidation";

import css from "./CheckBox.module.scss";

export const CheckBox = ({ type, label, state, name, onClick, addClass, __TYPE, ...args }) => {
   // Utilizado para controlar el valor del input.
   const [value, SetValue] = useState(name);

   /**
    * Se crea un ID para identificar el input y además
    * para pasarlo dentro la función onClick proveniente
    * de los props.
    */
   const id = useMemo(() => _uniqueId(`ui-${type}`), []);

   /**
    * Detecta cuando el input tiene un cambio así actualizamos
    * el estado y si existe la propiedad onClick le pasamos
    * los parámetros id y value del input.
    *
    * @param { target } - Nodo del DOM.
    */
   const onChange = ({ target }) => {
      if (onClick) {
         onClick({ id: target.id, value: target.value });
      }
      SetValue(target.value);
   };

   // Objeto con la lista de iconos que dependen del la propiedad state.
   const ICON_STATE = Object.freeze({
      right: "done_all",
      wrong: "close",
      normal: type === "checkbox" ? "check" : null,
   });

   return (
      <label
         htmlFor={id}
         className={`${css["c-input"]} u-flex ${addClass ?? ""}`}
         data-state={state}
         data-type={type}
         data-element={__TYPE}
         {...args}
      >
         <div className={css["c-input__box"]}>
            <input id={id} type={type} name={name} value={value} data-state={state} className={css["c-input__check"]} onChange={onChange} />
            <div className={css["c-input__icon"]}>{ICON_STATE[state] && <Icon name={ICON_STATE[state]} />}</div>
         </div>
         <span className={css["c-input__label"]}>{label}</span>
      </label>
   );
};

CheckBox.propTypes = {
   label: PropTypes.string.isRequired,
   state: PropTypes.oneOf(["normal", "right", "wrong"]),
   type: PropTypes.oneOf(["radio", "checkbox"]),
   name: PropTypes.string,
   addClass: PropTypes.string,
   onClick: PropTypes.func,
   __TYPE: typeValidation("CheckBox"),
};

CheckBox.defaultProps = {
   label: "Label",
   state: "normal",
   type: "radio",
   name: "option1",
   __TYPE: "CheckBox",
};
