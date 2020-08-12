import React, { Component } from 'react'
import update from 'immutability-helper'
import './App.css'
import Display from './Display'
import Button from './Button'
import Buttons from './Buttons'
import { create, all } from 'mathjs'
import axios from 'axios';

const math = create(all)
const REST_API = process.env.REACT_APP_REST_API || 'http://backend.yash-chauhan.xyz:3001/calculator';

class App extends Component {
    constructor() {
        super()
        this.state = {
            history: [],
            operations: []
        }
    }

    componentDidMount() {
        setInterval(_ => {
            axios.get(REST_API)
                .then(res => {
                    const HISTORY = res.data;
                    this.setState({ history: [...HISTORY] }, _ => console.log(this.state));
                })
            console.log(this.state, "This is the state")
        }, 2000)
    }

    calculateOperations = () => {
        let result = this.state.operations.join('')
        if (result) {
            result = eval(result)
            result = math.format(result, { precision: 14 })

            var equation = this.state.operations.join('') + " = " + result
            axios.post(REST_API, { 'equation': equation })
                .then(_ => {
                    this.setState({
                        operations: [result],
                    })
                })
                .catch(err => {
                    console.error(err);
                });

        };
    }


    handleClick = e => {
        const value = e.target.getAttribute('data-value')
        switch (value) {
            case 'clear':
                this.setState({
                    operations: [],
                })
                break
            case 'equal':
                this.calculateOperations()
                break
            default:
                const newOperations = update(this.state.operations, {
                    $push: [value],
                })
                this.setState({
                    operations: newOperations,
                })
                break
        }
    }
    onKeyPress = e => {
        const value = e.key;

        const allowed = [
            '1', '2', '3', '4',
            '5', '6', '7', '8',
            '9', '0', '+', '-', '*', '/', '=', '.',
            'Enter', 'equal', 'Escape', 'C',
            'Backspace'
        ];

        if (allowed.includes(value)) {
            switch (value) {
                case 'Escape':
                    this.setState({
                        operations: [],
                    })
                    break
                case 'Backspace':
                    const backSpaceOperations = this.state.operations;
                    backSpaceOperations.pop()
                    this.setState({
                        operations: backSpaceOperations,
                    })
                    break
                case '=':
                case 'Enter':
                    this.calculateOperations()
                    break
                default:
                    const newOperations = update(this.state.operations, {
                        $push: [value],
                    })
                    this.setState({
                        operations: newOperations,
                    })
                    break
            }
        }
    }

    componentWillMount = (e) => {
        document.addEventListener("keydown", this.onKeyPress.bind(this));
    }

    render() {
        return ( <
            div >
            <
            div className = "App" >

            <
            Display data = { this.state.operations }
            /> <
            Buttons >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "C"
            value = "clear" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "7"
            value = "7" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "4"
            value = "4" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "1"
            value = "1" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "0"
            value = "0" / >

            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "/"
            value = "/" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "8"
            value = "8" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "5"
            value = "5" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "2"
            value = "2" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "."
            value = "." / >

            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "x"
            value = "*" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "9"
            value = "9" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "6"
            value = "6" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "3"
            value = "3" / >
            <
            Button label = ""
            value = "null" / >

            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "-"
            value = "-" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "+"
            size = "2"
            value = "+" / >
            <
            Button onClick = { this.handleClick }
            onKeyPress = { this.onKeyPress }
            label = "="
            size = "2"
            value = "equal" / >
            <
            /Buttons> < /
            div > <
            div >
            <
            ul > {
                this.state.history.map(hist =>
                    <
                    li key = { hist.id } > { hist.calc } < /li>
                )
            } <
            /ul> < /
            div > <
            /div>
        )
    }
}

export default App;