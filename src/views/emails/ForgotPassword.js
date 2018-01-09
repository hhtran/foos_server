import React, { Component } from "react";
import Oy from "oy-vey";
const { Table, TBody, TR, TD } = Oy;

const MAX_WIDTH = 600;

export default class ForgotPassword extends Component {
  render() {
    const { resetUrl } = this.props;
    return (
      <Table width={MAX_WIDTH}>
        <TBody>
          <TR>
            <TD align="center">Hello world!!! You forgot your password</TD>
            <TD align="center">Reset your password here: {resetUrl}</TD>T
          </TR>
        </TBody>
      </Table>
    );
  }
}
