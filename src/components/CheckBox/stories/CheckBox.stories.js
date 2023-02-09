import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";

import { CheckBox } from "components/CheckBox";

export default {
   title: "ui-components/CheckBox",
   component: CheckBox,
   decorators: [
      (story) => (
         <Row justify-content="center" align-items="center">
            <Col xs="11" mm="10" md="9" lg="5" hd="4">
               <Row justify-content="center" align-items="center">
                  {story()}
               </Row>
            </Col>
         </Row>
      ),
   ],
};

const Template = (args) => <CheckBox {...args} />;

export const radio = Template.bind({});

radio.storyName = "radio";
radio.args = {
   label: "Opción 1",
   type: "radio",
   state: "normal",
   name: "option1",
};

export const checkbox = Template.bind({});

checkbox.storyName = "checkbox";
checkbox.args = {
   label: "Opción 1",
   type: "checkbox",
   state: "normal",
   name: "option1",
};
