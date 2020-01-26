import React, {Component} from "react";
import api from "../../services/api";

export default class Main extends Component {
    componentDidMount() {
        this.loadBrands();
    }

    loadBrands = async () => {
        const response = await api.get('/brands');
        console.log(response);
    };

    render() {
        return <h1>Quanto custa meu carro?</h1>;
    }


}