import React from "react";

import { Col } from "components/Col";
import { Row } from "components/Row";

import { Input, InputStyle, InputLeftAddon, InputRightAddon } from "components/Input";
import { Icon } from "components/Icon";

export default {
   title: "ui-components/Input",
   component: Input,
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

export const Default = () => <Input />;

Default.storyName = "default";

export const WithLeftAddon = () => (
   <InputStyle>
      <InputLeftAddon>
         <Icon name="check" />
      </InputLeftAddon>
      <Input placeholder="welcome" />
   </InputStyle>
);

WithLeftAddon.storyName = "with left addon";

export const WithRightAddon = () => (
   <InputStyle>
      <Input placeholder="welcome" />
      <InputRightAddon>
         <Icon name="check" />
      </InputRightAddon>
   </InputStyle>
);

WithRightAddon.storyName = "with right addon";

export const AllAddon = () => (
   <InputStyle>
      <InputLeftAddon>
         <Icon name="play" />
      </InputLeftAddon>
      <Input placeholder="welcome" />
      <InputRightAddon>
         <Icon name="check" />
      </InputRightAddon>
   </InputStyle>
);

AllAddon.storyName = "with left and right addon";
