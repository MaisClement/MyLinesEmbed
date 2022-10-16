import React from "react";

import "./assets/css/main.css";
import "./assets/css/color.css";
import "./assets/css/main_m.css";
import logo_lite from "./assets/img/Logo_lite.png";

import home from "./assets/img/home.svg";
import about from "./assets/img/about.svg";

import Footer from "./footer";

class Head extends React.Component {
    render(){
        return (
            <header className="navc">
                <div className="nav-head">
                    <a href="../../index">
                        <img src={logo_lite} className="icone"></img>
                    </a>
                    <span> MyLines Embed</span>
                </div>
            </header>
        )
    }
}
class Doc_S extends React.Component  {
    constructor(props) {
		super(props);
		this.state = {
            open: 'home',
        };

        this.show = this.show.bind(this);
	}

    show = value => () => {
        this.setState({
            open : value
        })
    }

    render(){
        return (
            <>
                <div className="doc">
                    <Head />
                    
                    <Scroll
                        open = {this.state.open}
                        show = {this.show}
                    />
                    
                    <Main
                        open = {this.state.open}
                        show = {this.show}
                    />
                </div>
            </>
        );
    }
}

class Scroll extends React.Component {
    render(){
        return (
            <div className="settings-scroll" id="settings-scroll">
                <h2 onClick={this.props.show}>Documentation</h2>
                <div className="scroll">
                    <Scroll_btn
                        img = {home}
                        name = 'Introduction'
                        open = {this.props.open}
                        show = {this.props.show}
                        value={'home'}
                    />
                </div>
            </div>
        )
    }
}


class Home extends React.Component {
    render(){
        return(
            
            <div className="options">
                <img src={home} className="himg svg"></img> <h2>Introduction</h2>
                    <br/>

                    <div className="warning">
                        <img src={about} className="himg svg"></img> Vous êtes sur la version basé sur les données de la <strong>SNCF</strong>. 
                            <br/><br/>
                        Pour les Infogare utilisant les données de Train Empire et de votre compagnie MyLines, rendez-vous <a href="https://mylines.fr/embed/doc">ici</a> :
                            <br/>
                        → <a href="https://mylines.fr/embed/doc">https://mylines.fr/embed/doc</a>
                    </div>
                    <p>
                        MyLines Embed propose des Infogare basé sur les données SNCF, en temps réel et implémentable sur n'importe quel site web.
                    </p>
                
                    <br/>
                <h2>Licence</h2>
                    <br/>

                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"> 
                    <img alt="Licence Creative Commons" src="https://i.creativecommons.org/l/by/4.0/88x31.png" ></img>
                </a>
                    <br/>
                Cette œuvre est mise à disposition selon les termes de la 
                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                    Licence Creative Commons Attribution 4.0 International
                </a>.
        
                <br/><br/><br/>
                <span className="space"></span>
                <br/>
            </div>
        )
    }
}
class CATI extends React.Component {
    render(){
        return(
            <div className="options">
                <h2>Infogare</h2>
                    <br/>

                <div>
                    <h3 className="url">→ https://embed.mylines.fr/&lt;style&gt;/&lt;type&gt;/&lt;code_gare&gt;</h3>
                        <br/><br/>
                    <iframe src="../SNCF/departure/87481002" width="640" height="360"></iframe> <iframe src="../RENFE/arrival/87481002" width="640" height="360"></iframe>
                        <br/><br/>
                </div>
                <div>
                <br/>
                <h2>Paramètres</h2>
                    <div className="about">
                        
                        <table>
                            <tbody>
                                <tr>
                                    <th> Paramètres </th>
                                    <th> Obligatoire </th>
                                    <th> Détails</th> 
                                </tr>
                                <tr className="table2">
                                    <td> <i>style</i> </td>
                                    <td> Oui</td>
                                    <td className="detail">
                                        Style de l'Infogare <br/>
                                        <i>Parmis les choix possible :</i>
                                            <br/>
                                        <b>- SNCF</b> <br/>
                                        <b>- IENA</b> <br/>
                                        <b>- RENFE</b> <br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td> <i>type</i> </td>
                                    <td> Oui</td>
                                    <td className="detail"> 
                                        Type d'affichage <br/> 
                                        <i>Parmis les choix possible :</i>
                                            <br/>
                                        <b>- departure</b> <br/>
                                        <b>- arrival</b> <br/>
                                    </td>
                                </tr>
                                <tr className="table2">
                                    <td> <i>code_gare</i> </td>
                                    <td> Oui</td>
                                    <td className="detail"> 
                                        Identifiant du point d'arrêt.
                                            <br/>
                                        Liste des gares disponible <a href="https://data.sncf.com/explore/dataset/referentiel-gares-voyageurs"><u>ici</u></a>.
                                    </td>
                                </tr>
                                <tr>
                                    <td> <i>gui</i> </td>
                                    <td> Non</td>
                                    <td className="detail"> 
                                        Si présent, affiche l'interface utilsateur
                                    </td>
                                </tr>
                                <tr className="table2">
                                    <td> <i>update</i> </td>
                                    <td> Non </td>
                                    <td className="detail"> 
                                        Défini le delai en secondes entre chaque actualisation.
                                            <br/>
                                        Défaut : <strong>50</strong>
                                            <br/>
                                        Désactivé : <strong>0</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br/>
                    <h2>Exemples</h2>
                        <br/>
                        Tableau SNCF au départ de Nantes.
                        <br/>
                        → <b className="linkblue">https://embed.mylines.fr/SNCF/departure/87481002</b>

                        <br/><br/>
                        Tableau SNCF des arrivées à Briançon.
                        <br/>
                        → <b className="linkblue">https://embed.mylines.fr/SNCF/departure/87763607</b>

                        <br/><br/>
                        Tableau SNCF des départs de Granville. <br/>
                        <i>L'interface utilisateur est affiché et la mise à jour désactivé.</i>
                        <br/>
                        → <b className="linkblue">https://embed.mylines.fr/SNCF/departure/87447680?gui&amp;update=0</b>

                        <br/><br/>
                        Tableau IENA des arrivées à Versailles Chantiers.
                        <br/>
                        → <b className="linkblue">https://embed.mylines.fr/IENA/arrival/87393009</b>

                        <br/><br/>
                        Tableau des départs de Champs de Mars Tour Eiffel. <br/>
                        <i>La Mise à jour automatique est défini a 2min (120 secondes).</i>
                        <br/>
                        → <b className="linkblue">https://embed.mylines.fr/IENA/departure/87393058?update=120</b>
                    <br/>
                    
                </div>
                <br/><br/>
                <span className="space"></span>
            </div>
        )
    }
}

// ------------------------------------

class Create extends React.Component {
    render(){
        return(
            
            <div className="options">
                <img src={home} className="himg svg"></img> <h2>Introduction</h2>
                    <br/>

                    <div className="warning">
                        <img src={about} className="himg svg"></img> Vous êtes sur la version basé sur les données de la <strong>SNCF</strong>. 
                            <br/><br/>
                        Pour les Infogare utilisant les données de Train Empire et de votre compagnie MyLines, rendez-vous <a href="https://mylines.fr/embed/doc">ici</a> :
                            <br/>
                        → <a href="https://mylines.fr/embed/doc">https://mylines.fr/embed/doc</a>
                    </div>
                    <p>
                        MyLines Embed propose des Infogare basé sur les données SNCF, en temps réel et implémentable sur n'importe quel site web.
                    </p>
                
                    <br/>
                <h2>Licence</h2>
                    <br/>

                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"> 
                    <img alt="Licence Creative Commons" src="https://i.creativecommons.org/l/by/4.0/88x31.png" ></img>
                </a>
                    <br/>
                Cette œuvre est mise à disposition selon les termes de la 
                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
                    Licence Creative Commons Attribution 4.0 International
                </a>.
        
                <br/><br/><br/>
                <span className="space"></span>
                <br/>
            </div>
        )
    }
}

class Scroll_btn extends React.Component {
    render(){
        return (
            <div 
                className={this.props.open == this.props.value ? "selected small_fluent_btn2" : "small_fluent_btn2"}
                onClick={this.props.show(this.props.value)}
            >
                {this.props.img ? 
                    <>
                        <img className="svg" src={this.props.img}></img>
                        <span>{this.props.name}</span>
                    </>
                    :
                    <span className="toper">{this.props.name}</span>
                }   
            </div>
        )
    }
}

class Main extends React.Component {
    render(){
        return (
            <div className="settings-options" id="settings-options">
                {this.props.open == 'home' ? 
                    <>
                        <Home/>
                        <CATI/>
                        <Footer/>
                    </>
                    :
                    <></>
                }
            </div>
        )
    }
}

export default Doc_S;