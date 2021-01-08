const Address = "0xE2931876A8cD0bc76A7114CFaA8232eF983532a3";

let web3tr;

async function newTorus() {

const torus = new Torus({
  buttonPosition: "top-right" // default: bottom-left
});
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "aaa", // default: mainnet
    chainId: 100, // default: 1
    networkName: "xdai" // default: Main Ethereum Network
  },
  showTorusButton: true // default: true
});
await torus.login(); // await torus.ethereum.enable()
web3tr = new Web3(torus.provider);
}

newTorus();



function myButtonClicked() {

	//スマートコントラクト読み込み
	mycontract = new web3tr.eth.Contract(ABI, Address);

	//1.00-beta.36と表示されるのが正しい
	console.log("writer.js_is_checking_web3.js_version..." + Web3.version);

	//id100の数値入力欄から値を読み取って、F12キーで出てくるところに表示(デバッグ用)
	console.log(document.getElementById('id100').value);


	web3tr.eth.getAccounts().then((resolve) => {
		//上記はコントラクトへトランザクションを送るための定型文(Metamaskが重いのでthenでの処理待ちが必須)
		console.log(resolve[0])
		console.log(document.getElementById('id100').value)
		console.log(document.getElementById('tid').value)
		mycontract.methods.transferFrom( resolve[0] , document.getElementById('id100').value , document.getElementById('tid').value ).send({ from: resolve[0] });
		console.log("resolve[0]_is_your_Address:" + resolve[0]);
	});
}
