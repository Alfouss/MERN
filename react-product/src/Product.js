import React from 'react';
import axios from "axios";
import { isNumber, isString } from 'util';

export default class Product extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            list: []
        }

        this.sendForm = this.sendForm.bind(this);
        this.modeEditList = this.modeEditList.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.deleteValue = this.deleteValue.bind(this);
    }

    async componentDidMount(){
        let items = await axios.get("http://localhost:1234/products/read");
        this.loadList(items.data);
    }

    loadList(items){

       let list = items.map((res, index) => {
            return (
                <div key={index}>
                    <p>{res.name}</p>
                    <p>{res.price}</p>
                </div>
            );
        });
        this.setState({items: items, list: list});
    }
    
    async sendForm(e){
        e.preventDefault();
        let integer = parseInt(this.refs.price.value) ;

        console.log(integer)
        if(integer && isString(this.refs.name.value)){
            let data = {
                name: this.refs.name.value,
                price: this.refs.price.value
            }

            await axios.post("http://localhost:1234/products/create", data);
            let items = await axios.get("http://localhost:1234/products/read");
            this.loadList(items.data);
        }
    }

    async updateValue(e){
        e.preventDefault();

        let integer = parseInt(e.target.price.value) ;
        if(integer && isString(e.target.id.value)){
            let data = {
                id: e.target.id.value,
                name: e.target.name.value,
                price: e.target.price.value
            }
            await axios.put("http://localhost:1234/products/update", data);
            let items = await axios.get("http://localhost:1234/products/read");
            this.loadList(items.data);
        }
    }

    async deleteValue(res){
        let data = {
            id: res._id
        }
        await axios.delete("http://localhost:1234/products/delete", {data});
        let items = await axios.get("http://localhost:1234/products/read");
        this.loadList(items.data);
    }


    modeEditList(bool){
        let list = this.state.items.map((res, index) => {
            
            if(bool){
                return (
                    <div key={index}>
                    <p>{res.name}</p>
                    <p>{res.price}</p>
                    <button onClick={() => {this.modeEditList(false)}}>Edit</button>
                    <button onClick={() => {this.deleteValue(res)}}>Delete</button>
                </div>
                );
            }else{
                return (
                    <div key={index}>
                        <form onSubmit={this.updateValue}>
                            <input defaultValue={res._id} name="id" type="hidden"/>
                            <input defaultValue={res.name} name="name" type="text"/>
                            <input defaultValue={res.price} name="price" type="number"/>
                            <button>Edit</button>
                        </form>
                    </div>
                );
            }
            
            
        });

        this.setState({list: list});
    }

    render(){
        return(
            <div>
                <button onClick={() => this.modeEditList(true)}>Edit</button>
                <form onSubmit={this.sendForm}>
                    <input name="name" ref="name" type="text" />
                    <input name="price" ref="price" type="text"/>
                    <button>Add</button>
                </form>
                <div>{this.state.list}</div>
            </div>
        )
    }
}