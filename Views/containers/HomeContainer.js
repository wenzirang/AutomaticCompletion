import React from 'react'
import {Link} from 'react-router'
import { Table, Input, Icon, Button, Popconfirm,Switch,Form, Select} from 'antd';
import AutoCompompleteInput from '../components/AutoCompompleteInput'

export default class TaxonomyContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      filtered: false,
      tData : [],
      loading : true,
      constData : []
    }
    this.fetchFn();
  }
    fetchFn = () => {
            fetch('http://smsonedev.marketplacesupport.com:100/api/Taxonomy')
            .then(response => response.json())
            .then(data =>  this.setState({tData:data, loading:false, constData : data}))
            .catch(e => console.log("Oops, error", e))
  }

  onInputChange = (e) => {
     this.setState({ searchText: e.target.value });
   }

  onSearch = (searchText) => {    
     const reg =searchText.replace(/\s/ig,'').toLowerCase();
     
     this.setState({
       filtered: !!searchText,
       tData: this.state.constData.map((record) => {
         const match = record.name.replace(/\s/ig,'').toLowerCase().match(reg);
         if (!match) {
           return null;
         }
         return {
           ...record,
           name: (
             <span>
               {record.name.split(reg).map((text, i) => (
                 i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
               ))}
             </span>
           ),
         };
       }).filter(record => !!record),
     });
   }


  render() {
    const columns = [
      {
        title : 'Name',
        dataIndex : 'name',
        key : 'name'
      },
      {
        title : 'Description',
        dataIndex : 'description',
        key : 'description'
      },
      {
        title : 'Entity Name',
        dataIndex : 'entityName',
        key : 'entityName'
      },
      {
        title : 'Status',
        dataIndex : 'status',
        key : 'status'
      }     
    ];
    const inputStyle = {
      width : 300,
      position : 'relative',
      left : '65%'
    }
    const pagination = {
        total: this.state.tData.length,
        showSizeChanger: true,
        onShowSizeChange(current, pageSize) {
             console.log('Current: ', current, '; PageSize: ', pageSize)
         },
        onChange(current) {
             console.log('Current: ', current)
         }
    };
    return(
      <div className='content'>
        <div>
          <div>
            <AutoCompompleteInput onSelectCallBack={this.onSearch} dataSource={this.state.constData} clickSearchCallBack={this.onSearch}/>            
          </div>        
        </div>
        <div className='table'>
            <Table {...this.state} rowKey={record => record.id} dataSource={this.state.tData} columns={columns} pagination={pagination} />
        </div>
      </div>
    );
  }
}
