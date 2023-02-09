import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "wicg-inert";

import { Button } from "components/Button";
import { Portal } from "components/Portal";
import { iconList } from "utils/icons/iconsList";

import css from "./Modal.module.scss";

export const Modal = ({ button, addClass, children, onOpen, ...props }) => {
   // Estado que oculta o muestra el modal
   const [hiddenModal, setHiddenModal] = useState(true);
   const refButton = useRef(null);
   const refModal = useRef(null);

   /**
    * Cierra el modal al presionar la tecla Esc
    * @param {event} e - Evento del teclado
    */
   const closeModalOnEsc = (e) => {
      if ((e.keyCode || e.which) === 27) {
         const root = document.querySelector("#root");
         setHiddenModal(true);
         root.inert = false;
         refButton.current.focus();
      }
   };

   /**
    * Cambia el estado del modal entre escondido y visible
    * @param {boolean} state - Estado del modal (false para que se visible, true para que se esconda)
    */
   const toggleModal = (state) => {
      const noModalZones = document.querySelector("#root");
      setHiddenModal(state);
      noModalZones.inert = !state;
   };

   useEffect(() => {
      onOpen && onOpen(!hiddenModal);
      if (hiddenModal) {
         refButton.current.focus();
      } else {
         refModal.current.focus();
      }
   }, [hiddenModal]);

   return (
      <>
         <Button
            ref={refButton}
            label={button.label}
            size={button.size}
            icon={{
               name: button?.icon?.name,
               size: button?.icon?.size,
               position: button?.icon?.position,
            }}
            type={button.type}
            variant={button.variant}
            hasAriaLabel={button.hasAriaLabel}
            disabled={button.disabled}
            // children={button.children}
            addClass={button.addClass}
            onClick={() => toggleModal(false)}
         />
         <Portal id="modal">
            <div className={css["c-layout"]} onClick={() => toggleModal(true)} hidden={hiddenModal}></div>
            <div
               role="dialog"
               tabIndex="-1"
               hidden={hiddenModal}
               aria-label={button.label}
               ref={refModal}
               onKeyDown={closeModalOnEsc}
               aria-modal="true"
               className={`${css["c-modal"]} u-px-3 u-py-3 ${addClass ?? ""}`}
               {...props}
            >
               <div className={`${css["c-modal-container"]} u-flow`}>{children}</div>
               <Button
                  addClass={css["c-close-button"]}
                  label="Cerrar modal"
                  hasAriaLabel={true}
                  icon={{ name: "close" }}
                  onClick={() => toggleModal(true)}
               />
            </div>
         </Portal>
      </>
   );
};

Modal.propTypes = {
   children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.node]),
   button: PropTypes.shape({
      label: PropTypes.string.isRequired,
      size: PropTypes.oneOf(["small", "normal", "big"]),
      variant: PropTypes.oneOf(["primary", "secondary", "no-line"]),
      type: PropTypes.oneOf(["button", "submit", "reset"]),
      hasAriaLabel: PropTypes.bool,
      icon: PropTypes.shape({
         name: PropTypes.oneOf(iconList),
         size: PropTypes.oneOf(["small", "normal", "big"]),
         position: PropTypes.oneOf(["left", "right"]),
      }),
      disabled: PropTypes.bool,
      onClick: PropTypes.func,
      addClass: PropTypes.string,
   }),
   addClass: PropTypes.string,
   onOpen: PropTypes.func,
};

Modal.defaultProps = {
   button: {
      label: "Abrir modal",
   },
};
