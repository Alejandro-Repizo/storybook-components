import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";

import { TextArea } from "components/TextArea";

export default {
   title: "ui-components/TextArea",
   component: TextArea,
   decorators: [
      (story) => (
         <Row justify-content="center" align-items="center">
            <Col xs="11" mm="10" md="9" lg="5" hd="4">
               {story()}
            </Col>
         </Row>
      ),
   ],
};

const Template = (args) => <TextArea {...args} value="value" />;

export const Default = Template.bind({});

Default.storyName = "default";
