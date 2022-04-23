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
class Doc_T extends React.Component  {
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
                        <img src={about} className="himg svg"></img> Vous êtes sur la version basé sur les données de <strong>Train Empire</strong> et de votre compagnie <strong>MyLines</strong>. 
                            <br/><br/>
                        Pour les Infogare utilisant les données de la SNCF, rendez-vous <a href="https://embed.mylines.fr/doc">ici</a> :
                            <br/>
                        → <a href="https://embed.mylines.fr/doc">https://embed.mylines.fr/doc</a>
                    </div>
                    <p>
                        MyLines Embed propose des Infogare basé sur vos trains sur le jeux Train Empire.
                    </p>
                
                    <br/>
                <h2>Licence</h2>
                    <br/>

                <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"> 
                    <img alt="Licence Creative Commons" src="https://i.creativecommons.org/l/by/4.0/88x31.png" ></img>
                </a>
                    <br/>
                Cette œuvre est mise à disposition selon les termes de la <a rel="license" href="http://creativecommons.org/licenses/by/4.0/"> Licence Creative Commons Attribution 4.0 International</a>.
        
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
                    <br/><br/>

                <div>
                    <b>→ https://mylines.fr/embed/&lt;style&gt;/&lt;type&gt;/&lt;code_gare&gt;/&lt;auth&gt;</b>
                        <br/><br/>
                    <iframe src="https://mylines.fr/embed/SNCF/departure/29/WhyLines" width="640" height="360"></iframe> <iframe src="https://mylines.fr/embed/IENA/arrival/40/WhyLines" width="640" height="360"></iframe>
                        <br/><br/>
                </div>
                <div>
                    <h2>Exemples</h2>
                        <br/>
                        Tableau SNCF au départ de Nantes.
                        <br/>
                        → <b className="linkblue">https://mylines.fr/embed/SNCF/departure/65/WhyLines</b>

                        <br/><br/>
                        Intégration du tableau SNCF des arrivées à Briançon
                        <br/>
                        → <b className="linkblue"><span>&lt;</span><span>iframe</span> <span>src=</span><span>"https://mylines.fr/embed/SNCF/arrival/549/WhyLines"</span> <span>width="1200"</span> <span>height="675"</span><span>&gt;&lt;</span><span>/iframe&gt;</span></b>

                        <br/><br/>
                        Tableau SNCF des départs de Granville. L'interface utilisateur est affiché et la mise à jour désactivé.
                        <br/>
                        → <b className="linkblue">https://mylines.fr/embed/SNCF/departure/388/RFEO?gui&amp;update=0</b>

                        <br/><br/>
                        Intégration du tableau IENA des arrivées à Versailles Chantiers
                        <br/>
                        → <b className="linkblue"><span>&lt;</span><span>iframe</span> <span>src=</span><span>"https://mylines.fr/embed/IENA/arrival/29/&lt;clé_api&gt;"</span> <span>width="1200"</span> <span>height="675"</span><span>&gt;&lt;</span><span>/iframe&gt;</span></b>

                        <br/><br/>
                        Tableau des départs de Champs de Mars Tour Eiffel. L'interface utilisateur est masqué et la mise à jour automatique porté a 2min.
                        <br/>
                        → <b className="linkblue">https://mylines.fr/embed/IENA/departure/301/&lt;clé_api&gt;?update=120</b>
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
                                        <strong>SNCF</strong> ou <strong>IENA</strong> 
                                    </td>
                                </tr>
                                <tr>
                                    <td> <i>type</i> </td>
                                    <td> Oui</td>
                                    <td className="detail"> 
                                        Type d'affichage <br/> 
                                        <strong>departure</strong> ou <strong>arrival</strong> 
                                    </td>
                                </tr>
                                <tr className="table2">
                                    <td> <i>code_gare</i> </td>
                                    <td> Oui</td>
                                    <td className="detail"> 
                                        Code Gare
                                            <br/>
                                        Liste des gares disponible <a href="https://train-empire.com/api/doc/stationsCodes.php"><u>ici</u></a>.
                                    </td>
                                </tr>
                                <tr>
                                    <td> <i>auth</i> </td>
                                    <td> Oui</td>
                                    <td className="detail"> 
                                        Clé Api de Train Empire ou nom d'une compagnie MyLines
                                    </td>
                                </tr>
                                <tr className="table2">
                                    <td> <i>gui</i> </td>
                                    <td> Non</td>
                                    <td className="detail"> 
                                        Si présent, affiche l'interface utilsateur
                                    </td>
                                </tr>
                                <tr>
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
                </div>
                <br/><br/>
                <span className="space"></span>
            </div>
        )
    }
}

// ------------------------------------

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

export default Doc_T;