import { Key, useEffect, useRef, useState } from "react";
import { fetchApiData } from "../../api/API-fetch";
import "./arsenal.css";

export const ArsenalPage = () => {

    const [arsenal, setAresenal] = useState<any>(null);
    const [categories, setCategories] = useState<any>(null);
    const [categoryClicked, setCategoryClicked] = useState<any>(null);
    const [skins, setSkins] = useState<any>(null);
    const scrollElement = useRef<HTMLInputElement>(null);
    const [selectedChromaIndex, setSelectedChromaIndex] = useState<number | null>(null);
    const [selectedChromaSkinIndex, setSelectedChromaSkinIndex] = useState<number | null>(null);

    const handleCloseSkins = () => {
        setSkins(null);
    }
    
    const handleChromaClicked = (chroma: any, chromaIndex: any, skinIndex: any) => {
        setSelectedChromaSkinIndex(skinIndex);
        setSelectedChromaIndex(chromaIndex);
      };

    const scrollLeft = () => {
        if(scrollElement.current){
            scrollElement.current.scrollLeft -= 600
        }
    }

    const scrollRight = () => {
        if(scrollElement.current){
            scrollElement.current.scrollLeft += 600
        }
    }

    const handleGunClicked = (displayName: any) => {
        const gunIndex = arsenal.findIndex((gun:any) => gun.displayName === displayName);
        if (gunIndex !== -1) {
            const skinsArray = arsenal[gunIndex].skins;
            setSkins(skinsArray);
          }
    }

    const handleCategoryClicked = (index: any) => {
        const category = "EEquippableCategory::" + categories[index].category;
        setCategoryClicked(category);
        console.log(index);
        console.log("Category clicked:", category);
    }
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchApiData
            ('https://valorant-api.com/v1/weapons');
            setAresenal(data.data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (arsenal !== null) {
           const categories = Array.from(new Set(arsenal.map((weapon: any) => weapon.category.replace("EEquippableCategory::", ""))));
           setCategories(categories.map(category => ({ category })));
           console.log(arsenal);
        }
    }, [arsenal]);

    useEffect(() => {
        if(categories !== null){
            console.log(categories)
        }
    }, [categories])


    return(
        <div className="arsenal-page">
            <div className="category-selection-container">
                {categories !== null && categories?.map(
                    (category: {category: any;},
                        index: number) => {
                            return (  
                                <div  key={index} className="category">
                                    <h1 className="category-name" onClick={() => handleCategoryClicked(index)}> {category.category}  </h1>
                                </div>                                       
                            );
                        }
                    )}
            </div>
                {categoryClicked !== null && (
                    <div className="chosen-category">
                        {arsenal !== null && arsenal.filter((weapon: any) => weapon.category === categoryClicked).map(
                            (weapon: 
                                {
                                    category: any, 
                                    displayIcon: any, 
                                    displayName: any, 
                                    shopData: any, 
                                    weaponStats: any
                            }, index: Key | null | undefined) => {
                                return (    
                                   <div className="gun-info-container" key={index}>                            
                                        <div className="gun-and-description">
                                            <div className="image-and-title">
                                                <img className= "gun-image" src={weapon.displayIcon}/>
                                                <h2 className="gun-title"> {weapon.displayName} </h2>
                                            </div>
                                            <div className="description">
                                               {weapon.shopData !== null &&
                                                <h3 className="attribute"> <div className="attb-title">Cost:</div> {weapon.shopData?.cost} credits</h3>}
                                                {weapon.weaponStats !== null &&
                                                <h3 className="attribute"> <div className="attb-title">Fire Rate:</div> {weapon.weaponStats?.fireRate} rds/sec</h3>}
                                                {weapon.weaponStats !== null &&
                                                <h3 className="attribute"> <div className="attb-title">Magazine:</div> {weapon.weaponStats?.magazineSize} rounds</h3>}
                                                {weapon.weaponStats !== null &&
                                                <h3 className="attribute"> <div className="attb-title">Reload Time:</div> {weapon.weaponStats?.reloadTimeSeconds} seconds</h3>}
                                                {weapon.weaponStats !== null &&
                                                <h3 className="attribute"> <div className="attb-title">Equip Time: </div>{weapon.weaponStats?.equipTimeSeconds} seconds</h3>}
                                                {weapon.weaponStats !== null &&
                                                <h3 className="attribute"> <div className="attb-title">First bullet accuracy:</div> {weapon.weaponStats?.firstBulletAccuracy}</h3>}
                                            </div>
                                        </div>  
                                    
                                        <button onClick={() => handleGunClicked(weapon.displayName)} className="skins-button">
                                           <div className="button-text">  View all {weapon.displayName} skins </div> 
                                        </button>
                                </div>                     
                                )}
                        )}
                    </div>
                )}
                {skins !== null && (
                    <div className="skins-container">
                        <button className="close-skins" onClick={handleCloseSkins}> close skins </button>
                        <button onClick={scrollLeft} className="left arrow-button">&#60;</button>

                        <div ref={scrollElement} className="skins-display-container">
                            {skins?.map((skin: any, skinIndex: any) => {
                                if (
                                    skin.contentTierUuid !== null &&
                                    skin.displayIcon !== null
                                ) {
                                    return skin.chromas.length > 1 ? (
                                        <div key={skinIndex} className="skin-image-container">
                                            <h1 className="skin-name"> {skin.displayName} </h1>
                                            <img
                                                className="skin-image"
                                                src={
                                                    selectedChromaIndex !== null  &&
                                                    selectedChromaSkinIndex === skinIndex
                                                        ? skin.chromas[selectedChromaIndex].fullRender
                                                        : skin.displayIcon
                                                }
                                                alt="Skin Icon"
                                            />
                                            <div className="chromas-container">
                                                {skin.chromas?.map(
                                                    (chroma: any, chromaIndex: any) => {
                                                        return (
                                                            <img
                                                                key={chromaIndex}
                                                                onClick={() => handleChromaClicked(chroma, chromaIndex, skinIndex)}
                                                                src={chroma.swatch}
                                                                alt="Skin Icon"
                                                                className="chroma-image"
                                                            />
                                                );})}
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={skinIndex} className="skin-image-container">
                                            <h1 className="skin-name"> {skin.displayName} </h1>
                                            <img
                                                className="skin-image"
                                                src={skin.displayIcon}
                                                alt="Skin Icon"
                                            />
                                        </div>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        <button onClick={scrollRight} className="right arrow-button">&#62;</button>
                    </div>
                )}
        </div>
    )}