import { useState, useEffect } from "react";
import { SERVER } from "../../../../config/api-path";

import axios from "axios";

const RandomFoodMenu = () => {
    const [randomFoodMenuName, setRandomFoodMenuName] = useState(null);
    const [randomFoodMenuPhoto, setRandomFoodMenuPhoto] = useState(null);
    const RandomFoodMenuPhotos = async () => {
        await axios
            .get(`${SERVER}/RandomFoodMenuPhotos/Api`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((result) => {
                setRandomFoodMenuName(result.data.RandomResult.menu_name);
                setRandomFoodMenuPhoto(result.data.RandomResult.menu_photo);
            });
    };
    useEffect(() => {
        RandomFoodMenuPhotos();
    }, []);
    return (
        <>
            <div className="RandomFoodMenuBox">
                <div className="RandomFoodMenuTitle">{randomFoodMenuName}</div>
                <div className="RandomFoodMenuIMG">
                    <img
                        src={`${SERVER}/images/food/${randomFoodMenuPhoto}`}
                        alt=""
                    />
                </div>
            </div>
        </>
    );
};

export default RandomFoodMenu;
