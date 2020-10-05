import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import Divider from '@material-ui/core/Divider';

function Header(props) {
    return (
        <div className="row mt-100">
            <div className="" >
                <h1>MY EXPENSES</h1>
            </div>

            <div className="ml-auto">
                <h3>Total  {props.totalExp}</h3>
            </div>
        </div>
    );
}

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            amount: 0,
            note: "",
            date: "",
            total: 100,
            expenses: []

        };
        this.submitHandler = this.submitHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.deleteExp = this.deleteExp.bind(this);
    }

    async componentDidMount() {
        await axios.get('http://localhost:3001/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        expenses: response.data,
                    })
                    console.log(this.state.expenses);
                    let T = 0;
                    this.expenses.forEach(element => { 
                        T += element.amount     
                    });
                    this.setState({total: T})
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteExp(id) {
        axios.delete('http://localhost:3001/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            expenses: this.state.expenses.filter(el => el._id !== id)
        })
    }

    expensesList() {
        return this.state.expenses.map(currentExp => {
            return (
                <div className="list-group pt-2">
                    <a href="#" className="list-group-item list-group-item-action">
                        <Button color="#7c00ee" className=""><i className="fa fa-pencil fa-sm" /><br />Edit</Button>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1 cardtitle">{currentExp.title}</h5>
                            <small>{currentExp.date}</small>
                            <h3>{currentExp.amount} </h3>
                        </div>
                        <p className="mb-1"><b>NOTE </b>{currentExp.note}</p>
                        <Button color="#7c00ee" onClick={() => this.deleteExp(currentExp._id)}><i className="fa fa-times-circle fa-lg" /><br />Remove</Button>
                    </a>
                </div>
            );
        })
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val })
    }

    submitHandler = (event) => {
        const exp = {
            title: this.state.title,
            amount: this.state.amount,
            note: this.state.note,
            date: this.state.date
        }

        console.log(exp);

        axios.post('http://localhost:3001/', exp)
            .then(res => console.log(res.data));

        this.setState({
            title: "",
            amount: 0,
            note: "",
            date: ""
        })
    }

    render() {
        return (
            <div className="container">
                <div className="mt-5">
                    <div className="pb-3">
                        <Header totalExp={this.state.total}/>
                    </div>
                    <Divider variant="middle" />
                    <div className="mt-5">
                        <div className="row">
                            <div className="col-sm-5">
                                <Form className="" onSubmit={this.submitHandler}>
                                    <FormGroup className="w-75 p-1">
                                        <Input type="text" name='title' onChange={this.changeHandler} placeholder="Title" />
                                    </FormGroup>
                                    <FormGroup className="w-75 p-1">
                                        <Input type="text" name='amount' onChange={this.changeHandler} placeholder="Amount" />
                                    </FormGroup>
                                    <FormGroup className="w-75 p-1">
                                        <Input type="text" name='note' onChange={this.changeHandler} placeholder="Note" />
                                    </FormGroup>
                                    <FormGroup className="w-75 p-1">
                                        <Input type="date" name='date' onChange={this.changeHandler} placeholder="Date" />
                                    </FormGroup>
                                    <Button className="rounded-pill" color="primary" type="submit">+  ADD EXPENSE</Button>
                                </Form>

                            </div>
                            <div className="col-sm-5">
                                {this.expensesList()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;