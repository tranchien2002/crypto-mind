import Web3 from 'web3';
export const getStartGame = async (_fromBlock, _address, _roomId, _url) => {
  //hash of Event
  let event = Web3.utils.sha3('StartGame(uint256,uint256,uint256,uint256)');
  let res = await getLogs(_fromBlock, _address, _roomId, _url, event);
  if (res.result[0]) {
    let data = res.result[0].data;
    data = data.substr(2);
    let seed = data.substr(0, 64);
    let blockStart = parseInt(data.substr(64, 64), 16);
    let blockTimeout = parseInt(data.substr(128, 64), 16);
    return { seed, blockStart, blockTimeout };
  }
};

export const getJoinRoom = async (_fromBlock, _address, _roomId, _url) => {
  let event = Web3.utils.sha3('JoinRoom(uint256,address)');
  let res = await getLogs(_fromBlock, _address, _roomId, _url, event);
  if (res.result[0]) {
    let data = res.result[0].data;
    return '0x' + data.substr(-40);
  }
};

export const getQuitRoom = async (_fromBlock, _address, _roomId, _url) => {
  let event = Web3.utils.sha3('QuitRoom(uint256,address)');
  let res = await getLogs(_fromBlock, _address, _roomId, _url, event);
  if (res.result[0]) {
    let data = res.result[0].data;
    return '0x' + data.substr(-40);
  }
};

const getLogs = async (_fromBlock, _address, _roomId, _url, _event) => {
  let roomId = dec2hexString(_roomId, 64);
  let fromBlock = dec2hexString(_fromBlock);
  const response = await fetch(_url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getLogs',
      params: [
        {
          fromBlock: fromBlock,
          address: _address,
          topics: [_event, roomId]
        }
      ],
      id: 74
    })
  });
  return await response.json();
};

const dec2hexString = (value, len) => {
  value = parseInt(value);
  return '0x' + ('0'.repeat(len) + value.toString(16)).slice(-len);
};

export const getTrxByHash = async (_hash, _url) => {
  const response = await fetch(_url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'eth_getTransactionReceipt',
      params: [_hash],
      id: 74
    })
  });
  return await response.json();
};
