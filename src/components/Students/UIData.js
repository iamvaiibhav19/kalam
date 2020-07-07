import React, { PureComponent } from 'react';
import Partners from '../Partners/PartnersFile';
import TableData from './TableData';

const Uidata = [
  {
    name: 'students',
    initialValues: {
      ListOfData: [],
      isDialogOpen: false,
      RowData: null,
      isAddRow: false,
      isEditRow: false,
      EditableTableRowValues: {},
      ShowingPage: 0,
      StylingForRow: false,
      screenSize: null,
    },
  },
];

class UIData extends PureComponent {
  render() {
    return (
      <Partners Uidata={Uidata} TableData={TableData} properties={this.props} />
    );
  }
}

export default UIData;
