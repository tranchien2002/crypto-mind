pragma solidity ^0.5.0;

contract CryptoMind {
  /*
  bounty: the wei each player must pay before join game
  owner: who create the game
  roomSize: number players in room
  blockStart: when starting game
  blockTimeout: amount block from start to finish
  highscore: highest score among players
  submited: address array of players submited their answers
  players: address array of players
  answers: address of player => their score
*/
  struct Room {
    uint256 bounty;
    address owner;
    uint256 roomSize;
    uint256 result;
    uint256 blockStart;
    uint256 blockTimeout;
    uint256 highscore;
    address payable[] submited;
    address payable[] players;
    mapping(address => uint256) answers;
  }

  address public manager;
  Room[] public rooms;
  uint256[] public waitingRoom;
  mapping(address => uint256) public playerRoom;

  event StartGame(uint256 roomId, bytes32 seed);

  constructor() public {
    manager = msg.sender;
    address payable[] memory players;
    address payable[] memory submited;
    rooms.push(Room(0, address(0x00), 0, 2, 0, 0, 0, submited, players));
  }

  modifier onlyOwner() {
    require(msg.sender == manager);
    _;
  }

  function createRoom(uint256 _bounty, uint256 _roomSize, uint256 blockTimeout) external payable {
    if (playerRoom[msg.sender] != 0) {
        if (block.number > rooms[playerRoom[msg.sender]].blockStart + rooms[playerRoom[msg.sender]].blockTimeout && rooms[playerRoom[msg.sender]].blockStart != 0) {
            claimReward();
        } else {
            submitAnswer(0);
        }  
    }
    require(msg.value >= _bounty, 'must send value more than bounty');
    require(
      playerRoom[msg.sender] == 0 || rooms[playerRoom[msg.sender]].result > 0 || block.number > rooms[playerRoom[msg.sender]].blockStart + rooms[playerRoom[msg.sender]].blockTimeout,
      'quit previous room or previousRoom submited or playerRoom timeup before join new game'
    );
    address payable[] memory players;
    address payable[] memory submited;

    rooms.push(Room(_bounty, msg.sender, _roomSize, 0, 0, blockTimeout, 0, submited, players));

    waitingRoom.push(rooms.length - 1);
  }

  function removeFromWatingRoom(uint256 _roomId) internal {
    for (uint i = 0; i < waitingRoom.length; i++) {
        if (waitingRoom[i] == _roomId) {
            waitingRoom[i] = waitingRoom[waitingRoom.length - 1];
            waitingRoom.pop();
            break;        
        }
    }
    
  }

  function removePlayerInWaitingRoom(uint256 _roomId, address _player) internal {
    Room storage room = rooms[_roomId];
    for (uint i = 0; i < room.players.length; i++) {
      if (_player == room.players[i]) {
        room.players[i] = room.players[room.players.length - 1];
        room.players.pop();
        playerRoom[_player] = 0;
        break;
      }
    }
    if (room.players.length == 0) {
      room.result = 2;
    }
  }

  function removePlayerInRunningRoom(uint256 _roomId, address _player) internal {
    Room storage room = rooms[_roomId];
    if (!inArray(_player, room.submited)) {
      submitAnswer(0);
    }
    playerRoom[_player] = 0;
  }

  function joinRoom(uint256 _roomId) external payable {
    if (playerRoom[msg.sender] != 0) {
        if (block.number > rooms[playerRoom[msg.sender]].blockStart + rooms[playerRoom[msg.sender]].blockTimeout && rooms[playerRoom[msg.sender]].blockStart != 0) {
            claimReward();
        } else {
            submitAnswer(0);
        }  
    } 
    require(
      playerRoom[msg.sender] == 0 || rooms[playerRoom[msg.sender]].result > 0 || block.number > rooms[playerRoom[msg.sender]].blockStart + rooms[playerRoom[msg.sender]].blockTimeout,
      'quit previous room or previousRoom submited or playerRoom timeup before join new game'
    );
    require(waitingRoom.length > 0, 'must more than one waiting room');
    Room storage room = rooms[_roomId];
    require(room.players.length < room.roomSize, 'players in room must be less than roomSize');
    require(_roomId < rooms.length, 'roomId must be less than rooms length');
    require(msg.value >= room.bounty);
    room.players.push(msg.sender);
    if (room.players.length == room.roomSize) {
      removeFromWatingRoom(_roomId);
      startGame(_roomId);
    }
  }

  function startGame(uint256 _roomId) internal {
    Room storage room = rooms[_roomId];
    require(room.players.length == room.roomSize, 'room must be full');
    room.blockStart = block.number;
    emit StartGame(_roomId, blockhash(block.number));
  }

  function submitAnswer(uint256 result) public {
    uint roomId = playerRoom[msg.sender];
    Room storage room = rooms[roomId];
    uint256 currentBlock = block.number;
    require(!inArray(msg.sender, room.submited), "player only submit one time");
    require(room.blockStart != 0, 'room must be started');
    require(room.result == 0, 'Room must not share bounty');
    require(currentBlock <= room.blockStart + room.blockTimeout, 'Submiting must be in time');
    require(currentBlock > room.blockStart, 'Submitting must be after startGame');
    if (result > room.highscore) {
      room.highscore = result;
    }
    room.answers[msg.sender] = result;
    room.submited.push(msg.sender);
    if (room.submited.length == room.roomSize) {
        shareBounty(roomId);
    }
  }

  function roomOf(address _player)
    external
    view
    returns (
      uint256 roomId,
      uint256 bounty,
      address owner,
      uint256 roomSize,
      uint256 result,
      uint256 blockStart,
      uint256 blockTimeout,
      address payable[] memory players
    )
  {
    roomId = playerRoom[_player];
    Room storage room = rooms[roomId];
    bounty = room.bounty;
    owner = room.owner;
    roomSize = room.roomSize;
    result = room.result;
    blockStart = room.blockStart;
    blockTimeout = room.blockTimeout;
    players = room.players;
  }

  function claimReward() public {
    uint256 roomId = playerRoom[msg.sender];
    Room storage room = rooms[roomId];
    uint256 currentBlock = block.number;
    require(
      currentBlock > room.blockStart + room.blockTimeout,
      'claimReward only executed after time up'
    );
    shareBounty(roomId);
  }

  function shareBounty(uint roomId) internal {
    Room storage room = rooms[roomId];
    uint256 totalBounty = room.bounty * room.roomSize;
    if (room.highscore == 0) {
      room.result = 1;
      return;
    }
    address payable[] memory winners;

    //Find winners
    for(uint i = 0; i < room.players.length; i++) {
      if (room.answers[room.players[i]] == room.highscore) {
        winners[winners.length] = (room.players[i]);
      }
    }

    for(uint i = 0; i < winners.length; i++) {
      winners[i].transfer(totalBounty/winners.length);
    }
    room.result = 1;
  }
  
  function inArray(address player, address payable[] memory arr) private pure returns (bool) {
    bool inArr = false;
    for (uint i = 0; i < arr.length; i++) {
        if (player == arr[i]) {
            inArr = true;
            break;
        }
    }
    return inArr;
  }

  function quitGame() external {
    address player = msg.sender;
    uint roomId = playerRoom[player];
    Room storage room = rooms[roomId];
    require(roomId > 0, "roomId must be greater than 0");
    if (room.blockStart > 0) {
      removePlayerInRunningRoom(roomId, player);
    } else {
      removePlayerInWaitingRoom(roomId, player);
    }
  }

  function withdraw(uint amount) external {
    require(msg.sender == manager, "Only manager");
    msg.sender.transfer(amount);
  }

  function() external payable {}
}
