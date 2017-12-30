const React = require("react");
const { Table, TBody, TR, TD, BodyText } = require("oy-vey");

const MAX_WIDTH = 600;

const ForgotPassword = () => {
  return (
    <Table width={MAX_WIDTH}>
      <TBody>
        <TR>
          <TD align="center">
            <BodyText>Hello world!!! You forgot your password</BodyText>
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};

module.exports = {
  template: ForgotPassword,
  title: "Forgot password request",
  previewText: "Hello world! You forgot..."
};
