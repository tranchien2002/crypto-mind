const CryptoMind = artifacts.require('CryptoMind');

contract('CryptoMind', (accounts) => {
  describe('Create room', () => {
    let instance;
    before(async () => {
      instance = await CryptoMind.deployed();
    });

    it('shoud return roomID 0 when get roomOf for first time', async () => {
      let account1 = accounts[0];
      let roomOf = await instance.roomOf(account1);
      assert.equal(roomOf.roomId, 0);
    });
  });
});
