import React, { Component } from 'react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

import 'bootstrap/dist/css/bootstrap.min.css';
//import uuid from 'uuid/';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
  state = {
    items:[],
    id:uuidv4(),
    item:'',
    done:false,
    editItem:false
  };

  handleChange = (e)=>{
    this.setState({
      item:e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id:this.state.id,
      title:this.state.item,
    };

    const updateItems = [...this.state.items,newItem];
    
    this.setState({
      items:updateItems,
      item:'',
      id:uuidv4(),
      editItem: false
    });
  };

  clearList = ()=>{
    this.setState({
      items:[]
    })
  };

  handleCheck = (id)=>{
    const filteredItems = this.state.items;
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem,
      done:true,
      id:id
    });
    console.log(this.state.done);
  };

  handleDelete = (id)=>{
    const filteredItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items: filteredItems
    });
  };

  handleEdit = (id) => {
    const filteredItems = this.state.items.filter(item => item.id !== id);
    const selectedItem = this.state.items.find(item => item.id === id);
    console.log(selectedItem);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id:id
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">
              Todo Input</h3>
            <TodoInput 
              item={this.state.item} 
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}  
              editItem={this.state.editItem}
            />
            <TodoList 
              items={this.state.items} 
              clearList={this.clearList}
              handleDelete = {this.handleDelete}
              handleEdit = {this.handleEdit}
              handleCheck = {this.handleCheck}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
