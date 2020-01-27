import React, {Component} from "react";
import api from "../../services/api";
import {number, string} from "prop-types";

export default class Main extends Component {
    state = {
        brands: [],
        models: [],
        years: [],
        versions: [],
        carro: {},
        versionId: string,

        marcaSelecionada: string,
        modeloSelecionado: number,
        anoSelecionado: number,
        versaoSelecionada: string,

        valorFipe: number
    };

    componentDidMount() {
        this.loadBrands();
    }

    loadBrands = async () => {
        // Chamada HTTP para a API volanty
        const response = await api.get('/brands');
        this.setState({brands: response.data});
    };


    loadModels = async (event) => {
        //Coloca o valor do evento na variavel do state marca selecionada para acessar de forma global
        this.state.marcaSelecionada = event.target.value;
        const response = await api.get('/brands/' + this.state.marcaSelecionada + '/models');
        this.setState({models: response.data});
    };

    loadYears = async (event) => {
        this.state.modeloSelecionado = event.target.value;
        const response = await api.get('/brands/' + this.state.marcaSelecionada + '/models/' + this.state.modeloSelecionado + '/years');
        this.setState({years: response.data});
    };

    loadVersions = async (event) => {
        this.state.anoSelecionado = event.target.value;
        const response = await api.get('/brands/' + this.state.marcaSelecionada + '/models/' + this.state.modeloSelecionado + '/years/' + this.state.anoSelecionado + '/versions');
        this.setState({versions: response.data});
    };

    loadCarro = async (event) => {
        const versionString = event.target.value;
        this.state.versionId = versionString.substring(versionString.indexOf("-") + 2);
        const response = await api.get('/brands/' + this.state.marcaSelecionada + '/models/' + this.state.modeloSelecionado + '/years/' + this.state.anoSelecionado + '/versions/' + this.state.versionId);
        this.setState({carro: response.data});
    };

    render() {
        return (
            <div className="formulario-marca">

                {/*Componente que seleciona o marca*/}
                <div className="titulo-formulario">Selecione a marca</div>
                <select onChange={this.loadModels} className="brands-list">{this.state.brands.map(brand => (
                    <option key={brand}>{brand}</option>
                ))}
                </select>
                <br/>

                {/*Componente que seleciona o modelo*/}
                <div className="titulo-formulario">Selecione o modelo</div>
                <select onClick={this.loadYears} className="models-list">{this.state.models.map(model => (
                    <option key={model}>{model}</option>
                ))}
                </select>
                <br/>

                {/*Componente que seleciona o ano*/}
                <div className="titulo-formulario">Selecione o ano</div>
                <select onChange={this.loadVersions} className="years-list">{this.state.years.map((year, index) => (
                    <option key={index}>{year}</option>
                ))}
                </select>
                <br/>

                {/*Componente que seleciona a versao*/}
                <div className="titulo-formulario">Selecione a versão</div>

                <select onClick={this.loadCarro} className="versions-list">{this.state.versions.map(version => (
                    <option>{version.version} - {version.versionId}</option>
                ))}
                </select>
                <br/>
                <br/>
                <div className="resultado-pesquisa">
                    <h3>Resultado da pesquisa</h3>
                    <div>VALOR FIPE : {this.state.carro.precoFipe}</div>
                    <div>VALOR MÍNIMO : {this.state.carro.precoMinimo}</div>
                    <div>VALOR MÁXIMO : {this.state.carro.precoMaximo}</div>
                </div>
            </div>
        )
    }
}