const CryptoMind = artifacts.require('CryptoMind');

module.exports = async function() {
  const instance = await CryptoMind.deployed();
  const accounts = await web3.eth.getAccounts();

  start(0, accounts, instance);
};

const start = (counter, accounts, instance) => {
  // 100 time loop
  if (counter < 100) {
    setTimeout(async () => {
      counter++;
      // random create or join
      if (!!Math.floor(Math.random() * 2)) {
        await creatRoom(accounts[0], instance);
      } else {
        await joinRoom(accounts[0], instance);
      }
      start(counter, accounts, instance);
    }, 1000);
  }
};

const creatRoom = async (faucet, instance) => {
  var adminRandom = await web3.eth.personal.newAccount('123');
  await web3.eth.personal.unlockAccount(adminRandom, '123', 15000);

  await web3.eth.sendTransaction({
    from: faucet,
    to: adminRandom,
    value: web3.utils.toWei('5', 'ether')
  });

  let create = await instance.createRoom(web3.utils.toWei('3', 'ether'), 3, 44, {
    from: adminRandom,
    value: web3.utils.toWei('3', 'ether')
  });

  // Log create room status
  if (create.receipt.blockHash) {
    console.log('Create room successfully');
  } else {
    console.log('Create room failed');
  }
};

const joinRoom = async (faucet, instance) => {
  var playerRandom = await web3.eth.personal.newAccount('123');
  await web3.eth.personal.unlockAccount(playerRandom, '123', 15000);

  await web3.eth.sendTransaction({
    from: faucet,
    to: playerRandom,
    value: web3.utils.toWei('5', 'ether')
  });

  let waiting = await instance.getWaitingRoom({ from: playerRandom });
  if (waiting[0]) {
    let join = await instance.joinRoom(waiting[0], {
      from: playerRandom,
      value: web3.utils.toWei('3', 'ether')
    });

    // Log join room status
    if (join.receipt.blockHash) {
      console.log('Join room ' + waiting[0] + ' successfully');
    } else {
      console.log('Join room failed');
    }
  }
};
