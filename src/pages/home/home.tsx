import { Link } from 'react-router-dom';
import './home.css';
import { useEffect, useState } from 'react';
import { fetchApiData } from '../../api/API-fetch';
import { Image } from 'semantic-ui-react';

export const HomePage = () => {
    const valDownload = "https://playvalorant.com/en-us/download/";
    const [agents, setAgents] = useState<any>(null);
    const [maps, setMaps] = useState<any>(null);
    const [arsenal, setArsenal] = useState<any>(null);

    const getAgent = (agentName: string) => {
        if(agents !== null){
            console.log(agents.findIndex((agent: { displayName: string; }) => agent.displayName === agentName))
            return agents.findIndex((agent: { displayName: string; }) => agent.displayName === agentName)
        }
    }

    const getDisplayIcon = (skinName: string, gunName: string) => {
        if(arsenal !== null){
           const weapon = arsenal.find((weapon: {displayName: string}) => weapon.displayName === gunName);
           const skin = weapon.skins.find((skin:{displayName: string}) => skin.displayName === skinName);
           return skin.displayIcon;
        }
    }


    useEffect(() => {
        const fetchData = async () => {
          const agentsData = await fetchApiData('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
          setAgents(agentsData.data);
      
          const mapsData = await fetchApiData('https://valorant-api.com/v1/maps');
          setMaps(mapsData.data);

          const arsenalData = await fetchApiData('https://valorant-api.com/v1/weapons');
          setArsenal(arsenalData.data);
      
          console.log(agentsData.data);
          console.log(mapsData.data);
          console.log(arsenalData.data);
        };
      
        fetchData();
      }, []);

    
    return (
        <div className="home-page">
            <div className="page-header">
                <img className='val-gif' src={require('./val.gif')} alt="loading..." />
                <div className="game-info">
                    <div className="game-description">A 5v5 character-based tactical shooter</div>
                    <div className="game-title">VALORANT</div>
                    <Link to={valDownload} target="_blank" className='download-link'>
                        Download Valorant
                    </Link>
                </div>
            </div>
            <>
                {agents !== null &&
                    <div className='agents-section-wrapper'> 
                    <div className='agents-info-container'>
                        <div className='for-centering'>
                            <h1 className='agents-header'> YOUR AGENTS </h1>
                            <h2 className='create'> Unleash the power of your creativity </h2>
                            <p className='agents-description'> 
                                Beyond mere guns and bullets, 
                                you have the privilege<br />to select an extraordinary agent equipped with adaptive, <br />
                                lightning-fast, and deadly abilities. 
                                These remarkable skills<br /> pave the way for thrilling opportunities, 
                                allowing your <br /> gunplay to truly shine.
                                </p>
                            <Link to='/agents' className='agents-link'>
                                View All Agents
                            </Link>
                        </div>
                    </div>
                        <div className='image-container'>
                                <Image className="sage-image" src={agents[getAgent('Sage')].bustPortrait} />                            
                                <Image className="viper-image" src={agents[getAgent('Viper')].bustPortrait} />
                                <Image className="reyna-image" src={agents[getAgent('Reyna')].bustPortrait} />
                        </div>   
                    </div> 
                }
            </>
            <>
            {maps !== null &&
                <div className='maps-section-wrapper'>
                    <div className='maps-info-container'>
                        <div className='for-centering'>
                            <h1 className='maps-header'> YOUR MAPS</h1>
                            <h2 className='create'>Unleash your skills and<br /> conquer the globe!</h2>
                            <p className='maps-description'>
                            The battlegrounds are your canvas, ready to witness your<br /> boundless creativity. 
                            These meticulously crafted maps serve<br /> as the ultimate playground, where team strategies soar,<br /> 
                            and breathtaking moments unfold.
                            </p>
                            <Link to='/maps' className='agents-link'>View all maps</Link>
                        </div>
                    </div>
                    <div className='breeze-image-container'>
                        <Image className='breeze-image' src={maps[4].splash} />
                    </div>
                </div>
            }
            </>
            <>
            {arsenal !== null &&
                <div className='arsenal-section-wrapper'>
                    <div className='arsenal-info-container'>
                        <div className='for-centering'>
                            <h1 className='arsenal-header'> YOUR ARSENAL</h1>
                            <h2 className='create'>Unleash unerring precision and<br />ascend to the pinnacle of tactical mastery</h2>
                            <p className='arsenal-description'>
                            Your arsenal is a symphony of destruction, meticulously designed to empower<br /> your strategic brilliance. 
                            Each weapon is a testament to precision, power,<br /> and adaptability, offering a wealth of possibilities 
                            to explore your creativity. 
                            </p>
                            <Link to='/arsenal' className='agents-link'>View aresenal</Link>
                        </div>
                    </div>
                    <div className='guns-image-container'>
                        <Image className="gun-image" src={getDisplayIcon("Ion Operator", "Operator")} />
                        <Image className="gun-image" src={getDisplayIcon("Glitchpop Odin", "Odin")} />
                        <Image className="gun-image" src={getDisplayIcon("Reaver Vandal", "Vandal")} />                       
                        <Image className="gun-image" src={getDisplayIcon("RGX 11z Pro Spectre", "Spectre")} />
                    </div>
                </div>
            }
            </>
        </div>
    )
}