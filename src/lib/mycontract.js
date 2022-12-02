import Web3 from "web3";
export const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        "wss://goerli.infura.io/ws/v3/9489fc2f6e7445b39ccc06ebe60e2dfe"
    )
);
web3.eth.accounts.wallet.add(
    "5982cfeafdae69a24051998df779b346505dadf2d09bf82d73cb1f37bb3bd4a7"
);
export const CONTRACT_ADDRESS = "0x959AD442E001931Cd83A234f3A5F15E15c1bdEfd";
export const ABI = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "depart",
                type: "string",
            },
            {
                internalType: "string",
                name: "kind",
                type: "string",
            },
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "enroll_u",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "code",
                type: "string",
            },
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "standard",
                type: "string",
            },
            {
                internalType: "uint256",
                name: "price",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "date",
                type: "string",
            },
        ],
        name: "eq_enroll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "code",
                type: "string",
            },
        ],
        name: "eq_get",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "eq_code",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "eq_name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "eq_standard",
                        type: "string",
                    },
                    {
                        internalType: "uint256",
                        name: "eq_price",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "eq_date",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "eq_manage",
                        type: "address",
                    },
                ],
                internalType: "struct BManager.Equipment",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "string",
                name: "code",
                type: "string",
            },
        ],
        name: "eq_remove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "getInfo",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "depart",
                        type: "string",
                    },
                    {
                        internalType: "string",
                        name: "kind",
                        type: "string",
                    },
                    {
                        internalType: "address",
                        name: "wallet",
                        type: "address",
                    },
                ],
                internalType: "struct BManager.User",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "login_m",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "login_u",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_addr",
                type: "address",
            },
        ],
        name: "remove",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export const MyContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
