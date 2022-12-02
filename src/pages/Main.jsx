//image
import title from "../image/title.png";
import back from "../image/logout.png";
import eqenroll from "../image/eqenroll.png";
import seeq from "../image/searcheq.png";
import qrse from "../image/qrsearch.png";

import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { MyContract } from "../lib/mycontract";
import { useNavigate, Link } from "react-router-dom";
const Main = () => {
    const navagate = useNavigate();
    const { account, deactivate } = useWeb3React();
    const [info, setInfo] = useState({
        name: "",
        kind: "",
        depart: "",
    });
    useEffect(() => {
        MyContract.methods.getInfo(account).call({ from: account }).then((data) => {
            setInfo({
                ...info,
                name: data.name,
                kind: data.kind,
                depart: data.depart,
            })
            localStorage.setItem("info", JSON.stringify(info));
        })
    }, [info, account]);
    const logout = () => {
        deactivate();
        alert("로그아웃!");
        navagate("/");

    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img
                        id={"title"}
                        alt="title"
                        src={title}
                    >
                    </img>
                </li>
                <li>
                    <h3>{"접속자: "}{info.name}</h3>
                </li>
                <li>
                    <h3>{"구분: "}{info.kind}</h3>
                </li>
                <li>
                    <h3>{"부서: "}{info.depart}</h3>
                </li>
            </ul>
            <ul>
                <li>
                    <img
                        id={"back"}
                        alt={"로그아웃"}
                        onClick={logout}
                        src={back}
                    >
                    </img>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/enroleq">
                        <img
                            id="login"
                            alt="비품등록"
                            src={eqenroll}
                        >
                        </img>
                    </Link>
                </li>
                <li>
                    <Link to="/search">
                        <img
                            id="login"
                            alt="비품검색"
                            src={seeq}
                        >
                        </img>
                    </Link>
                </li>
                <li>
                    <Link to="/lookupqr">
                        <img
                            id="login"
                            alt="QR 조회"
                            src={qrse}
                        >
                        </img>
                    </Link>
                </li>
            </ul>
        </div >)
}
export default Main;