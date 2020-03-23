import React from "react";
import ModalDialog from "./ModalDialog"
import {mount} from 'enzyme';

describe('ModalDialg tests', () => {
  it('should render successfully using the passed in child component', () => {
    const modal = (
      <ModalDialog>
        <h1>Hello World</h1>
      </ModalDialog>
    );
    const sut = mount(modal);
    expect(sut.find('.modal')).toBeDefined();
    expect(sut.find('.modal-card-body')).toBeDefined();
    expect(sut).toMatchSnapshot();
  });

  it('should render a header when passed in as prop', () => {
    expect(
      <ModalDialog title='This is a test'>
        <h1>Hello World</h1>
      </ModalDialog>
    ).toMatchSnapshot();
  })
});