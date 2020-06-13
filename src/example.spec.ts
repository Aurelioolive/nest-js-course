// feature
class FriendsList {
  friends = [];

  addFriend(name) {
    this.friends.push(name);
    this.announceFriendship(name);
  }

  announceFriendship(name) {
    global.console.log(`${name} is now a friend!`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);

    if (idx === -1) {
      throw new Error('Friend not found!');
    }

    this.friends.splice(idx, 1);
  }
}

// tests
describe('FrindsList', () => {
  let friendsList;

  beforeEach(() => {
    friendsList = new FriendsList();
  });

  it('Initializes friends list', () => {
    expect(friendsList.friends.length).toEqual(0);
  });

  it('Add Ariel to frinds the list', () => {
    friendsList.addFriend('Ariel');
    expect(friendsList.friends[0]).toEqual('Ariel');
  });

  it('Announces friendship', () => {
    friendsList.announceFriendship = jest.fn();

    expect(friendsList.announceFriendship).not.toHaveBeenCalled();

    friendsList.addFriend('Aurélio');

    expect(friendsList.announceFriendship).toHaveBeenCalledWith('Aurélio');
  });

  describe('removeFriend', () => {
    it('removes a friend from the list', () => {
      friendsList.addFriend('Aurélio');
      expect(friendsList.friends[0]).toEqual('Aurélio');

      friendsList.removeFriend('Aurélio');
      expect(friendsList.friends[0]).toBeUndefined();
    });

    it('throws an error as friend does not exist', () => {
      expect(() => friendsList.removeFriend('Aurélio')).toThrow(
        new Error('Friend not found!'),
      );
    });
  });
});
