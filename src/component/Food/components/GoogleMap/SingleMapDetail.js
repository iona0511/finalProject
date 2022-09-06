import React, { useState, useEffect } from "react";
import "./GoogleMap.scss";
import LoadScriptOnlyIfNeeded from "./LoadScriptOnlyIfNeeded";
import {
    GoogleMap,
    DistanceMatrixService,
    Marker,
} from "@react-google-maps/api";

const shopsDummy = [
    {
        storeSid: 1,
        key: 1,
        storeName: "0+B 光復店",
        storeRoad: "光復南路300號",
        storeBlock: "台北市大安區",
        center: { lat: 25.03962792142701, lng: 121.55742720101652 },
    },
    {
        storeSid: 2,
        key: 2,
        storeName: "0+B 復興店",
        storeRoad: "復興南路一段323號",
        storeBlock: "台北市大安區",
        center: { lat: 25.034820954178888, lng: 121.54072221899777 },
    },
    {
        storeSid: 3,
        key: 3,
        storeName: "0+B 龍門店",
        storeRoad: "忠孝東路四段134號",
        storeBlock: "台北市大安區",
        center: { lat: 25.041947238558986, lng: 121.54824003860637 },
    },
    {
        storeSid: 4,
        key: 4,
        storeName: "0+B 永康店",
        storeRoad: "永康街2號2樓",
        storeBlock: "台北市大安區",
        center: {
            lat: 25.03475717724878,
            lng: 121.52959140047166,
        },
    },
    {
        storeSid: 5,
        key: 5,
        storeName: "0+B 敦和店",
        storeRoad: "敦化南路二段263號",
        storeBlock: "台北市大安區",
        center: { lat: 25.027059214520953, lng: 121.54864470715766 },
    },
    {
        storeSid: 6,
        key: 6,
        storeName: "0+B 微風南京店",
        storeRoad: "南京東路三段337號",
        storeBlock: "台北市松山區",
        center: { lat: 25.05377904290978, lng: 121.54832427510259 },
    },
    {
        storeSid: 7,
        key: 7,
        storeName: "0+B 南京建國店",
        storeRoad: "南京東路三段1號",
        storeBlock: "台北市中山區",
        center: { lat: 25.054012307531703, lng: 121.53708045485325 },
    },
    {
        storeSid: 8,
        key: 8,
        storeName: "0+B 南京三民店",
        storeRoad: "南京東路五段171號",
        storeBlock: "台北市松山區",
        center: { lat: 25.05323475716153, lng: 121.56325881561968 },
    },
];

// 我的位置
const SingleMapDetail = (props) => {
    const containerStyle = {
        width: "100%",
        height: "70vh",
    };

    const [shops, setShops] = useState(shopsDummy);
    const [initial, setInitial] = useState(false);
    const [myPosition, setMyPosition] = useState(props.center); // 讀取後會呈現 {lat: 25.042061, lng: 121.5414114}
    const { storeInfo, setStoreInfo } = props;

    // 預設位置
    const [icon, setIcon] = useState({});
    const getMyPosition = () => {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                setMyPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setInitial(true);
            },
            function (positionError) {
                setInitial(true);
            }
        );
    };

    useEffect(() => {
        getMyPosition();
    }, []);

    const branchs = shops.map(({ center }) => center);

    const getDistance = (response) => {
        const shopsWithDistance = shops
            .map((item, idx) => {
                return {
                    ...item,
                    distance: response.rows[0].elements[idx].distance,
                };
            })
            .sort((x, y) => x.distance.value - y.distance.value);
        setShops(shopsWithDistance);
    };
    return (
        <div className="mapSection">
            <div className="mapDetail">
                <LoadScriptOnlyIfNeeded googleMapsApiKey="AIzaSyAQ313cuqnG1Q1MPRDhP-k-EQOANPo__PQ">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={myPosition}
                        zoom={14}
                        clickableIcons={false}
                    >
                        {myPosition.lat !== 25.034320914178288 && (
                            <Marker
                                position={myPosition}
                                icon="/food/happy.png"
                                animation={1}
                            />
                        )}

                        {shops.map(
                            ({
                                center,
                                key,
                                storeName,
                                storeBlock,
                                storeRoad,
                                storeSid,
                            }) => {
                                return (
                                    <Marker
                                        key={key}
                                        position={center}
                                        icon="/food/hot-coffee.png"
                                        animation={center === icon ? 1 : 4}
                                        value={storeSid}
                                        onClick={() => {
                                            setStoreInfo({
                                                storeName,
                                                storeBlock,
                                                storeRoad,
                                                storeSid,
                                            });
                                        }}
                                    />
                                );
                            }
                        )}

                        <DistanceMatrixService
                            options={{
                                destinations: branchs,
                                origins: [myPosition],
                                travelMode: "WALKING",
                            }}
                            callback={getDistance}
                        />
                    </GoogleMap>
                </LoadScriptOnlyIfNeeded>

                <div className="mapShowArea">
                    {shops.map(
                        ({
                            storeName,
                            storeBlock,
                            storeRoad,
                            distance,
                            storeSid,
                            center,
                        }) => {
                            return (
                                <div
                                    className={
                                        center.lat === icon.lat &&
                                            center.lng === icon.lng
                                            ? "mapShow selected"
                                            : "mapShow"
                                    }
                                    key={storeSid}
                                    value={storeSid}
                                    onClick={() => {
                                        setIcon(center);
                                        setStoreInfo({
                                            storeName,
                                            storeBlock,
                                            storeRoad,
                                            storeSid,
                                            center,
                                        });
                                    }}
                                >
                                    <div className="branchInput">
                                        <div className="maptxt">
                                            <h6> {storeName}</h6>
                                            <div className="txt">
                                                <div className="txt1">
                                                    {storeBlock}
                                                    {storeRoad}
                                                </div>

                                                <div
                                                    className={
                                                        myPosition.lat ===
                                                            25.034320914178288
                                                            ? "distance disabled"
                                                            : "distance"
                                                    }
                                                >
                                                    {distance && distance.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};
// 由於改寫成 functional component，故另外設定 defaultProps
SingleMapDetail.defaultProps = {
    center: {
        lat: 25.034320914178288,
        lng: 121.54372226899777,
    },
    zoom: 13,
};

export default SingleMapDetail;
