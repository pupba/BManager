//image
import title_m from "../image/titleM.png";
import logoutI from "../image/logout.png";

import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useNavigate } from "react-router-dom";
import { MyContract } from "../lib/mycontract";
import axios from "axios";

const Manager = () => {
    const { account } = useWeb3React();
    const navigate = useNavigate();
    const { deactivate } = useWeb3React();
    const [addW, setAdd] = useState({
        name: "",
        depart: "",
        wallet: "",
        kind: "관리자"
    });
    const [wallet_, setWallet] = useState("");
    const [code, setCode] = useState("");
    const [manger, setMan] = useState([{}]);
    const [user, setUsr] = useState([{}]);
    useEffect(() => {
        axios.post("http://happylife7805.cafe24.com/bmanager.php",
            { kind: "manager" })
            .then((respon => {
                console.log(respon.data);
                setMan(respon.data);
            }))
            .catch((error) => {
                console.log(error);
            })
        axios.post("http://happylife7805.cafe24.com/bmanager.php",
            { kind: "user" })
            .then((respon => {
                console.log(respon.data);
                setUsr(respon.data);
            }))
            .catch((error) => {
                console.log(error);
            })
    }, [])
    const logout = () => {
        deactivate();
        alert("로그아웃!");
        navigate("/");
    }
    return (
        <div id="container">
            <ul>
                <li>
                    <img id="title" alt="title"
                        src={title_m}>
                    </img>
                </li>
                <li>
                    <img
                        id="back"
                        alt="로그아웃"
                        onClick={logout}
                        src={logoutI}
                    >
                    </img>
                </li>
            </ul>
            <article>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>{"관리자 번호"}</th>
                            <th>{"이름"}</th>
                            <th>{"부서"}</th>
                            <th>{"지갑 주소"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manger.map((item) => {
                            return (
                                <tr key={item.no}>
                                    <td>{item.no}</td>
                                    <td>{item.name}</td>
                                    <td>{item.depart}</td>
                                    <td>{item.wallet}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </article>
            <article>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>{"이용자 번호"}</th>
                            <th>{"이름"}</th>
                            <th>{"부서"}</th>
                            <th>{"지갑 주소"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item) => {
                            return (
                                <tr key={item.no}>
                                    <td>{item.no}</td>
                                    <td>{item.name}</td>
                                    <td>{item.depart}</td>
                                    <td>{item.wallet}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </article>
            <article>
                <li>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(addW);
                        MyContract.methods.eroll_u(addW.name, addW.depart, addW.kind, addW.wallet)
                            .send({ from: account, gas: 300000 })
                            .catch((error) => {
                                console.log(error);
                            })
                            .then((e) => {
                                alert("추가 완료!");
                                axios.post("http://happylife7805.cafe24.com/bmanager.php",
                                    { kind: "add", info: addW })
                                    .then((respon => {
                                        console.log(respon.data);
                                    }))
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            });
                        document.getElementById("name").value = "";
                        document.getElementById("depart").value = "";
                        document.getElementById("wallet").value = "";
                    }}>
                        <table>
                            <caption><h3>{"지갑 허용리스트 추가"}</h3></caption>
                            <tbody>
                                <tr>
                                    <th>{"이름 : "}</th>
                                    <td>
                                        <input
                                            id={"name"}
                                            type={"text"}
                                            placeholder={"이름을 입력해주세요!"}
                                            onChange={(e) => {
                                                setAdd({
                                                    ...addW,
                                                    name: e.target.value,
                                                })
                                            }}
                                        >
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{"부서 : "}</th>
                                    <td>
                                        <input
                                            id={"depart"}
                                            type={"text"}
                                            placeholder={"부서를 입력해주세요!"}
                                            onChange={(e) => {
                                                setAdd({
                                                    ...addW,
                                                    depart: e.target.value,
                                                })
                                            }}
                                        >
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{"지갑주소 : "}</th>
                                    <td>
                                        <input
                                            id={"wallet"}
                                            type={"text"}
                                            placeholder={"지갑 주소를 입력해주세요!"}
                                            onChange={(e) => {
                                                setAdd({
                                                    ...addW,
                                                    wallet: e.target.value,
                                                })
                                            }}
                                        >
                                        </input>
                                    </td>
                                </tr>
                                <tr>
                                    <th>{"구분 : "}</th>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                setAdd({
                                                    ...addW,
                                                    kind: e.target.value,
                                                })
                                            }}>
                                            <option value="관리자">{"관리자"}</option>
                                            <option value="이용자">{"이용자"}</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type={"submit"} value={"추가"}></input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </li>
            </article>
            <article>
                <li>
                    <h3>{"지갑 허용 삭제"}</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(wallet_);
                        MyContract.methods.remove(wallet_).send({ from: account, gas: 300000 })
                            .catch((error) => {
                                console.log(error);
                            })
                            .then((e) => {
                                alert("삭제 완료!");
                                axios.post("http://happylife7805.cafe24.com/bmanager.php",
                                    { kind: "delete", wallet: wallet_ })
                                    .then((respon => {
                                        console.log(respon.data);
                                    }))
                                    .catch((error) => {
                                        console.log(error);
                                    })
                            })
                        document.getElementById("wall").value = "";
                    }}>
                        {"지갑주소 입력 : "}
                        <input
                            id="wall"
                            type={"text"}
                            placeholder={"삭제할 지갑주소를 입력해주세요!"}
                            onChange={(e) => {
                                setWallet(e.target.value);
                            }}></input>
                        <input type={"submit"} value={"삭제"}></input>
                    </form>
                </li>
            </article>
            <article>
                <li>
                    <h3>{"비품 정보 삭제"}</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(code);
                        MyContract.methods.eq_remove(code).send({ from: account, gas: 300000 })
                            .catch((error) => {
                                console.log(error);
                            })
                            .then((e) => {
                                alert("삭제 완료!");
                            })
                        document.getElementById("co").value = "";
                    }}>
                        {"비품코드 입력 : "}
                        <input
                            id="co"
                            type={"text"}
                            placeholder={"삭제할 비품의 비품코드를 입력해주세요!"}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}></input>
                        <input type={"submit"} value={"삭제"}></input>
                    </form>
                </li>
            </article>
        </div >)
}
export default Manager;