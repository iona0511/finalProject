import "./FoodCard.scss";
import "./FoodAdd.scss";
import ScrollWrap from "../../Item/ScrollWrap/ScrollWrap";
function FoodCard({ setShowFoodDetail, setIsShow, allfood, handleCakeCount }) {
    const {
        menu_name,
        menu_nutrition,
        menu_price_m,
        menu_sid,
        menu_categories,
        menu_photo,
    } = allfood;
    return (
        <ScrollWrap
            start="coffee-cardaniwrapbf"
            end="coffee-cardaniwrapat"
            offset={150}
            //   backAgain={true}
            //   backOffset={-5}
        >
            <div className="foodCard" key={menu_sid}>
                <div className="foodCardTop">
                    <img
                        className="photo"
                        src={`http://localhost:3500/images/food/${menu_photo}`}
                        alt="logo"
                    />
                    <div className="foodCardLevel">{menu_categories}</div>
                </div>
                <div className="foodCardDown">
                    <div className="foodCardTxt">
                        <span className="menu_name">{menu_name}</span>
                        <p className="fontMin1">{menu_nutrition}</p>
                        <div className="fontMin2">
                            <p className="menu_price_m">NT${menu_price_m}</p>
                            <div
                                className="foodAdd"
                                onClick={() => {
                                    if (
                                        menu_categories === "1" ||
                                        menu_categories === "2"
                                    ) {
                                        setShowFoodDetail(allfood);
                                        setIsShow(true);
                                    }
                                    if (
                                        menu_categories === "3" ||
                                        menu_categories === "4"
                                    ) {
                                        handleCakeCount(allfood);
                                    }
                                }}
                            >
                                加入
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ScrollWrap>
    );
}

export default FoodCard;
