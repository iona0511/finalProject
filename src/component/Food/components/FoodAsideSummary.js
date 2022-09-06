import "./FoodAsideSummary.css";
import "./FoodAsideCount";
import FoodAsideCount from "./FoodAsideCount";
import axios from "axios";
import { useContext, useState } from "react";
import { foodData } from "../../../config/api-path";
import AuthContext from "../../Member/AuthContext";
import { useNavigate } from "react-router-dom";
import { useNav } from "../../../Contexts/NavProvider";
import { AiFillEdit } from "react-icons/ai";
// function FoodAsideSummary({ setIsShowAside, dataFromFoodDetail }) {
function FoodAsideSummary({
    dataFromFoodDetail,
    show,
    setDataFromSummary,
    dataFromDateTime,
    dataFromDate,
    setShowMap,
    selectedAddress,
    setDataFromFoodDetail,
    setIsOpen,
}) {
    const asideClass = show ? "aside" : "aside hide";
    const [remind, setRemind] = useState(false);

    const navigate = useNavigate();
    const totalPrice = dataFromFoodDetail.reduce(
        (accumulator, { menu_price_m, foodCount }) =>
            accumulator + menu_price_m * foodCount,
        0
    );
    const { getCount } = useNav();
    const Auth = useContext(AuthContext);
    const { storeName, storeBlock, storeRoad, storeSid } = selectedAddress;
    const standardTime = dataFromDate + " " + dataFromDateTime + ":00";
    //
    const checkOut =
        storeName && dataFromDate && dataFromDateTime
            ? "pay "
            : "pay disabled";
    const handleSubmission = (e) => {
        if (!storeSid || !standardTime) {
            setRemind(true);
            return false;
        }

        try {
            if (Auth.sid)
                axios({
                    method: "post",
                    url: foodData,
                    data: {
                        dataFromFoodDetail,
                        standardTime,
                        storeSid,
                        member: Auth ? Auth : "沒東西",
                    },
                    "content-type": "application/json",
                }).then((response) => {
                    localStorage.removeItem("foodData");
                    navigate("/cart");
                    getCount();
                });
            else {
                setIsOpen(true);
            }
        } catch (error) {
            // console.log("error");
        }
    };
    return (
        <>
            <div className={asideClass}>
                <div className="top">
                    <h6 className="myDetail">你的餐點詳細</h6>
                </div>
                <div className="middle">
                    <div className="txt">
                        <div className="takeOut">
                            <h6>自取門市</h6>
                            {!storeSid && remind && (
                                <p className="lg-field-err ">尚未填寫</p>
                            )}
                            <div
                                onClick={() => {
                                    setShowMap(true);
                                }}
                            >
                                <AiFillEdit size={"1.45rem"} />
                            </div>
                        </div>
                        <div className="edit">
                            <p>{storeName}</p>
                            <p className="bottom">
                                {storeBlock} {storeRoad}
                            </p>
                        </div>
                    </div>
                    <div className="txt">
                        <div className="takeOut">
                            <h6>自取時間</h6>
                        </div>
                        <div className="edit">
                            <p>{dataFromDate}</p>
                            <p className="bottom">{dataFromDateTime}</p>
                        </div>
                    </div>
                    <div className="wrapper">
                        {dataFromFoodDetail.map((item) => (
                            <FoodAsideCount
                                item={item}
                                key={item.timeID}
                                dataFromFoodDetail={dataFromFoodDetail}
                                setDataFromCount={setDataFromSummary}
                                removeItem={() => {
                                    const newOrder = dataFromFoodDetail.filter(
                                        (val) => {
                                            return item.timeID !== val.timeID;
                                        }
                                    );
                                    setDataFromFoodDetail(newOrder);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="payArea">
                    <div className="payArea1">
                        <h6 className="finalTotal">合計</h6>
                        <h6>${totalPrice}</h6>
                    </div>
                    <div className={checkOut} onClick={handleSubmission}>
                        去結帳
                    </div>
                </div>
                {/* </div> */}
            </div>
        </>
    );
}
export default FoodAsideSummary;
