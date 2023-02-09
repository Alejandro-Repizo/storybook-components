import { useState, useEffect, createContext, useRef } from "react";
import PropTypes from "prop-types";

import css from "./Panel.module.scss";

/**
 * Creamos un contexto para proveer a ciertos
 * componentes hijos las funcionalidades creadas
 * acá en el componente padre.
 */
export const PanelContext = createContext();

export const Panel = ({ children, defaultIndex, addClass }) => {
   // Controla el estado de abierto / cerrado de las secciones.
   const [isOpen, setIsOpen] = useState(null);

   /**
    * Objeto para almacenar el valor de los ID
    * de cada sección y el contador que se utiliza
    * para agregar un ID a cada sección.
    */
   const [IdToSection, setIdToSection] = useState([]);

   const storageRef = useRef([]);

   const addNewIdToSection = (id) => {
      storageRef.current.push(id);

      setIdToSection((prev) => [...prev, id]);

      if (isOpen === null) {
         console.log(storageRef);
         setIsOpen(id);
      }
   };

   /**
    * Se crea la función onToggle para agregar el ID de
    * la sección a mostrar.
    *
    * @param {Number} value - Id proveniente de la sección.
    */
   const onToggle = (value) => setIsOpen(IdToSection[value]);

   /**
    * Devuelve "true" o "false" apartir de comparar
    * el ID de la sección con el ID de la sección
    * que está visible.
    *
    * @returns {(Boolean)}
    */
   const validation = (id) => isOpen === id;

   useEffect(() => {
      // Si existe la propiedad defaultIndex actualiza el estado con ella.
      if (defaultIndex !== undefined && IdToSection.length > 0) onToggle(defaultIndex);
   }, [defaultIndex]);

   return (
      <PanelContext.Provider value={{ validation, onToggle, listId: IdToSection, currentSection: isOpen, addNewIdToSection }}>
         <div className={`${css["c-panel"]} ${addClass ?? ""}`}>{children}</div>
      </PanelContext.Provider>
   );
};

Panel.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
      PropTypes.string,
   ]),
   defaultIndex: PropTypes.number,
   addClass: PropTypes.string,
};
