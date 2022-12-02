//image
import Back from "../image/back.png";
import title from "../image/eqenroll.png";

import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContract } from "../lib/mycontract";

const EnrollEQ = () => {
    const { account } = useWeb3React();
    const [data, setData] = useState({
        code: '',
        pname: '',
        pstand: '',
        price: '',
        dates: '',
    });
    const [info, setInfo] = useState({
        name: "",
        kind: "",
        depart: ""
    })
    useEffect(() => {
        const INFO = JSON.parse(localStorage.getItem("info"))
        setInfo({
            name: INFO.name,
            kind: INFO.kind,
            depart: INFO.depart
        })
    }, []);
    const navigate = useNavigate();
    const back = () => {
        navigate("/Main");
    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img
                        id={"title"}
                        alt={"비품 등록"}
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
                        alt={"뒤로가기"}
                        onClick={back}
                        src={Back}
                    >
                    </img>
                </li>
            </ul>
            <form onSubmit={(e) => {
                e.preventDefault();
                MyContract.methods.eq_enroll(
                    data.code,
                    data.pname,
                    data.pstand,
                    data.price,
                    data.dates
                ).send({ from: account, gas: 300000 })
                    .then(() => {
                        navigate("/makeqr", { state: data });
                    })
                    .catch((error) => {
                        alert(error);
                    });
                document.getElementsByClassName("input")[0].value = "";
                document.getElementsByClassName("input")[1].value = "";
                document.getElementsByClassName("input")[2].value = "";
                document.getElementsByClassName("input")[3].value = "";
                document.getElementsByClassName("input")[4].value = "";
            }}>
                <table border={1} id={"eqTable"}>
                    <caption>{"비품 데이터 내용"}</caption>
                    <tbody>
                        <tr>
                            <th>{"비품 코드"}</th>
                            <td><input
                                className="input"
                                type="text"
                                placeholder="비품 코드를 입력해주세요."
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        code: e.target.value,
                                    });
                                }}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>{"품명"}</th>
                            <td><input
                                className="input"
                                type="text"
                                placeholder="품명를 입력해주세요."
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        pname: e.target.value,
                                    })
                                }}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>{"규격"}</th>
                            <td><input
                                className="input"
                                type="text"
                                placeholder="규격을 입력해주세요."
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        pstand: e.target.value,
                                    })
                                }}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>{"취득 단가"}</th>
                            <td><input
                                className="input"
                                type="text"
                                placeholder="취득 단가를 입력해주세요."
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        price: e.target.value,
                                    })
                                }}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>{"취득 일자"}</th>
                            <td><input
                                className="input"
                                type="text"
                                placeholder="ex. 2022-10-11"
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        dates: e.target.value,
                                    })
                                }}></input>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <input
                                    className={"input"}
                                    type={"submit"}
                                    value={"등록하기"}
                                >
                                </input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div >);
}

export default EnrollEQ;