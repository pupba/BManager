// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;
// 구조체 타입 반환을 위한 코드
pragma experimental ABIEncoderV2;
contract BManager{
    struct User{
        string name;
        string depart;
        string kind;
        address wallet;
    }
    address [] private addrContainer;
    mapping(address => User) private usr;
    constructor(){
        usr[msg.sender] = User("Jung","Master","manager",msg.sender);
    }
    // 유저 등록
    function enroll_u(string memory name, string memory depart,string memory kind,address _addr) public
    {
        // 등록하는 계정이 관리자 계정인지 확인
        require(usr[msg.sender].wallet != 0x0000000000000000000000000000000000000000 
        && 
        keccak256(abi.encodePacked(usr[msg.sender].kind)) == keccak256(abi.encodePacked("manager"))
        ,"Not Manager");
        // 이미 등록되어 있는지 확인
        require(usr[_addr].wallet == 0x0000000000000000000000000000000000000000,"Already Registered");
        usr[_addr] = User(name,depart,kind,_addr);
        addrContainer.push(_addr);
    }
    function getIndex(address _addr, address[] memory con) private view returns(uint idx){
        idx = 0;
        for(uint i=0;i<con.length;i++){
            if(con[i] == _addr){
                idx=i;
                break;
            }
        }
        return idx;
    }   
    // 관리자 삭제
    function remove(address _addr) public {
        // 지갑 주소가 등록되어 있는지 확인
        require(usr[_addr].wallet != 0x0000000000000000000000000000000000000000
        && 
        keccak256(abi.encodePacked(usr[msg.sender].kind)) == keccak256(abi.encodePacked("manager"))
        ,"No wallet address");
        delete usr[_addr];
        delete addrContainer[getIndex(_addr, addrContainer)];
    }
    // 유저 로그인
    function login_u(address _addr) public view returns(bool){
        if(usr[_addr].wallet != 0x0000000000000000000000000000000000000000){
            return true; // 등록되어 있음
        }
        return false; // 등록안됨
    }
    // 관리자 로그인
    function login_m(address _addr) public view returns(bool){
        if(usr[_addr].wallet != 0x0000000000000000000000000000000000000000
        && keccak256(abi.encodePacked(usr[msg.sender].kind)) == keccak256(abi.encodePacked("manager"))){
            return true; // 등록되어 있음
        }
        return false; // 등록안됨
    }
    function getInfo(address _addr) public view returns(User memory){
        require(usr[_addr].wallet != 0x0000000000000000000000000000000000000000,"No User Info");
        return usr[_addr];
    }
    // 비품 구조체
    struct Equipment{
        string eq_code;
        string eq_name;
        string eq_standard;
        uint eq_price;
        string eq_date;
        address eq_manage;
    }
    mapping(string => Equipment) private eq;
    // 비품 등록
    function eq_enroll(string memory code, string memory name,string memory standard,uint price,string memory date) public {
        // 관리자 계정인지 확인
        require(usr[msg.sender].wallet != 0x0000000000000000000000000000000000000000
        && keccak256(abi.encodePacked(usr[msg.sender].kind)) == keccak256(abi.encodePacked("manager"))
        ,"Not Manager");
        eq[code] = Equipment(code,name,standard,price,date,msg.sender);
    }
    // 비품 검색
    function eq_get(string memory code) public view returns(Equipment memory){
        require(eq[code].eq_price!=0,"Code not in array");
        return eq[code];
    }
    // 비품 삭제
    function eq_remove(string memory code) public {
        // 관리자 계정인지 확인
        require(usr[msg.sender].wallet != 0x0000000000000000000000000000000000000000
        && keccak256(abi.encodePacked(usr[msg.sender].kind)) == keccak256(abi.encodePacked("manager"))
        ,"Not Manager");
        delete eq[code];
    }
}