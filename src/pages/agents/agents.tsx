import { Key, useEffect, useRef, useState } from "react";
import { fetchApiData } from "../../api/API-fetch";
import "./agents.css"

export const AgentsPage = () => {
    const [agents, setAgents] = useState<any>(null);
    const scrollElement = useRef<HTMLInputElement>(null);
    const [agentSelected, setAgentSelected] = useState<any>(null);
    const [abilities, setAbilities] = useState<any>(null);
    const [abilitySelected, setAbilitySelected] = useState<any>(null);

    const handleAgentClicked = (agent: any, agents: any, index: any) => {
        setAgentSelected(agent)
        setAbilities(agents[index].abilities)
        setAbilitySelected(null);
    }

    const handleAbilityClicked = (ability: any) => {
        setAbilitySelected(ability)
    }
    
    const scrollLeft = () => {
        if(scrollElement.current){
            scrollElement.current.scrollLeft -= 450
        }
    }

    const scrollRight = () => {
        if(scrollElement.current){
            scrollElement.current.scrollLeft += 450
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApiData
            ('https://valorant-api.com/v1/agents?isPlayableCharacter=true');
            setAgents(data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (agents !== null) {
            console.log(agents)
        }
    }, [agents]);

    useEffect(() => {
        if (abilities !== null) {
          console.log(abilities);
        }
      }, [abilities]);

    return (
        <div className="agents-page"> 
            <div className="agents-selection-container">
                <button onClick={scrollLeft} className="left arrow-button">&#60;</button>
                <div ref={scrollElement} className="agents-display-container">
                        {agents !== null && agents?.map(
                            (agent: {displayName: any; displayIcon: any;},
                                index: Key | null | undefined) => {
                                    return (  
                                        <svg 
                                            key={index} 
                                            onClick={() => handleAgentClicked(agent, agents, index)}
                                            className={`agent-icon-container ${agentSelected === agent ? 'selected' : ''}`}
                                        >
                                            <image className = "agent-display-icon" xlinkHref={agent.displayIcon} />
                                        </svg>
                                    );
                                }
                            )}
                </div> 
                <button onClick={scrollRight} className="right arrow-button">&#62;</button>
            </div>                  
            {!agentSelected && (<h1 className="no-selected-agent">Select an agent</h1>)}
            <>
                {agentSelected && (
                    <div className="agent-information-container">
                     
                        <div className="portrait-description-wrapper">
                            <div className="agent-portrait-container">
                                <svg className = "agent-background-container">
                                    <image className="agent-background-image" xlinkHref={agentSelected.background} />
                                </svg>
                                <svg className = "agent-bustPortrait-container">
                                    <image className="agent-bustPortrait-image" xlinkHref = {agentSelected.bustPortrait} />
                                </svg>
                            </div>

                            <div className="agent-description-container">
                                <p className="agent-name">{agentSelected.displayName}</p>
                                <h1 className="header">Bio:</h1>
                                <p className="agent-description">{agentSelected.description}</p>
                                <div className="role-wrapper">
                                    
                                    <h1 className="role-display-name">{agentSelected.role.displayName}</h1>
                                    <svg className="role-icon-container">
                                        <image className="role-icon" xlinkHref={agentSelected.role.displayIcon} />
                                    </svg>
                                </div>
                                <p className="role-description">{agentSelected.role.description}</p>
                            </div> 
                        </div>

                        <div className="abilities-container">
                            <h2 className="abilities-header">Choose an ability:</h2>
                            <div className="ability-icon-wrapper">
                                {abilities != null && abilities?.map(
                                    (ability: {displayName: any; displayIcon: any; description: any; slot: any;},
                                    index: Key | null | undefined) => ( 
                                        ability.slot === 'Passive' ? (
                                            <h1 
                                            className={`ability-icon-container ${abilitySelected === ability ? 'selected' : ''}`} 
                                            key={index}
                                                onClick={() => handleAbilityClicked(ability)}
                                            >
                                            Passive ability
                                            </h1>
                                        ) : (         
                                        <svg 
                                            key={index}
                                            onClick={() => handleAbilityClicked(ability)}
                                            className={`ability-icon-container ${abilitySelected === ability ? 'selected' : ''}`}
                                        >
                                            <image className="ability-display-icon" xlinkHref={ability.displayIcon} />
                                        </svg>
                                        )
                                    )
                                )}
                            </div>
                        </div>
                        {abilitySelected && (
                            <div className="ability-description-container">
                                <h2 className="ability-name">{abilitySelected.slot}: {abilitySelected.displayName}</h2>
                                <p className="ability-description">{abilitySelected.description}</p>
                            </div>
                        )}     
                    </div>
                )}
            </>
        </div>
    )
}