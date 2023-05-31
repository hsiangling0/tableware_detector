export const abi=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_clubName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "AddClub",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_resourceID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_resourceName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "AddResource",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ApproveBackend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_clubName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_hr",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_resourceID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_resourceName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "BookedResource",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_resourceID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "BookResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_resourceID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_hr",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "BookResource_backend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_resourceName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_newCost",
				"type": "uint256"
			}
		],
		"name": "ChangeResourceCost",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_addr",
				"type": "address"
			}
		],
		"name": "CreateClub",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name_",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "CreateResource",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_activityID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_activityName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_oldnum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_picID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_picNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_add",
				"type": "uint256"
			}
		],
		"name": "ModifyPicnum_Add",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_activityID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_activityName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_oldnum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_picID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_picNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_minus",
				"type": "uint256"
			}
		],
		"name": "ModifyPicnum_Retake",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_clubName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_activityID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_activityName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_newpicID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_oldnum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_newnum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_balance",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_action",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "ModifyPicture",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_newcost",
				"type": "uint256"
			}
		],
		"name": "ModifyResourceCost",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_clubName",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_activityID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_activityName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_pictureID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_number",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_token",
				"type": "uint256"
			}
		],
		"name": "uploadPicture",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_activityID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_activityName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_picID",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_picNum",
				"type": "uint256"
			}
		],
		"name": "UploadPicture",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			}
		],
		"name": "ClubAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			}
		],
		"name": "ClubBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_clubID",
				"type": "uint256"
			}
		],
		"name": "ClubName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "ResourceCost",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "ResourceName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]