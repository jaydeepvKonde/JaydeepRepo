import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderActions";
import formatCurrency from "../util";
import DataTable, { defaultThemes } from 'react-data-table-component';
import styled from 'styled-components';
import { Fade } from "reactstrap";
import  CheckBox  from '../Controls/CheckBox';

const SampleStyle = styled.div`
  padding: 5px;
  display: center;
  width: 100%;

  p {
    font-size: 16px;
    font-weight: 700;
    word-break: break-all;
  }
`;
const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

const columns = [
  
  {
    name: 'ID',
    selector: 'OrderID',
    sortable: true,
  },
  {
    name: 'NAME',
    selector: 'CustomerName',
    sortable: true,
    left: true,
  },
  {
    name: 'EMAIL',
    selector: 'CustomerEmailAddress',
    sortable: true,
    left: true,
  },
  {
    name: 'ADDRESS',
    selector: 'CustomerAddress',
    sortable: true,
    left: true,
  },
  {
    name: 'DATE',
    selector: 'OrderDate',
    sortable: true,
    left: true,
  },
  {
    name: 'TOTAL',
    selector: 'TotalPaid',
    sortable: true,
    right: true,
  },
  
];
const ExpanableComponent = ({ data }) => 
<SampleStyle>
  <table width="50%">
  <tbody>
  <tr>
    <td>
        <table>
          <tbody>{data.lstCartItems.map((item) => (

          <tr><td>{item.ItemCount} {" x "} {item.ProductTitle}</td><td><img style={{width:100}} src={item.ProductImagePath} alt={item.ProductTitle}></img></td></tr>
      
            ))}
          </tbody>
        </table>
    </td>
<td valign="top">
  
{
          data.lstOrderStatusDetails.map((fruite) => {
              // return (<CheckBox {...fruite}/>)
              console.log("fruite"+JSON.stringify(fruite.id));
              return(<input key={fruite.id} type="checkbox" defaultChecked={fruite.isChecked} value={fruite.value} />)
            })
 }</td></tr></tbody></table></SampleStyle>;
 
class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fruites: [
        {id: 1, value: "banana", isChecked: true},
        {id: 2, value: "apple", isChecked: false},
        {id: 3, value: "mango", isChecked: false},
        {id: 4, value: "grap", isChecked: false}
      ]
    }
  }
  
  handleCheckChieldElement = (event) => {
    let fruites = this.state.fruites
    fruites.forEach(fruite => {
       if (fruite.value === event.target.value)
          fruite.isChecked =  event.target.checked
    })
    this.setState({fruites: fruites})
    console.log("fruites:"+fruites);
  }
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const { orders } = this.props;
    const data = orders;
    console.log();
    return (
      <DataTable
        title="Order Received"
        columns={columns}
        data={data}
        highlightOnHover
        pointerOnHover
        expandableRows
        expandableRowsComponent={<ExpanableComponent></ExpanableComponent>}
        pagination
        customStyles={customStyles}
        dense
      />
    )
  }
  
}
export default connect(
  (state) => ({
    orders: state.order.orders,
  }),
  {
    fetchOrders,
  }
)(Orders);
