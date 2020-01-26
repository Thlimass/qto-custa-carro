import React, {Component} from "react";
import api from "../../services/api";

export default class Main extends Component {
    state = {
        brands: [],
        models: [],
    };

    componentDidMount() {
        this.loadBrands();
    }

    loadBrands = async () => {
        const response = await api.get('/brands');
        console.log(response);
        this.setState({brands: response.data});
    };


    loadModels = async (event) => {
        const parametro = event.target.value;
        const response = await api.get('/brands/' + parametro + '/models');
        console.log(response);
        this.setState({models: response.data});
    };

    loadYears = async (event) => {

    };


    render() {
        return (
            <div className="formulario-marca">

                {/*Função e componente que seleciona o marca*/}
                <h3>Selecione a marca</h3>
                <select onChange={this.loadModels} className="brands-list">{this.state.brands.map(brand => (
                    <option id={"selecao-marca"} key={brand}>{brand}</option>
                ))}
                </select>
                <br/>

                {/*Função e componente que seleciona o modelo*/}
                <h3>Selecione a modelo</h3>
                <select className="models-list">{this.state.models.map(model => (
                    <option key={model}>{model}</option>
                ))}
                </select>

                {/*Função e componente que seleciona o ano*/}
            </div>
        )
    }
}