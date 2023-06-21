// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Upload {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) urls;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => mapping(address => bool)) prevData;

    function add(string memory url) external {
        urls[msg.sender].push(url);
    }

    function allow(address _user) external {
        ownership[msg.sender][_user] = true;
        if(prevData[msg.sender][_user]){
            for(uint i = 0; i < accessList[msg.sender].length; i++){
                if(accessList[msg.sender][i].user == _user){
                    accessList[msg.sender][i].access = true;
                }
            }
        }
        else{
            accessList[msg.sender].push(Access(_user, true));
            prevData[msg.sender][_user] = true;
        }
    }

    function disAllow(address _user) external {
        ownership[msg.sender][_user] = false;
        for(uint i = 0; i < accessList[msg.sender].length; i++){
            if(accessList[msg.sender][i].user == _user){
                accessList[msg.sender][i].access = false;
            }
        }
    }

    function display(address _user) external view returns(string[] memory) {
        require(_user == msg.sender || ownership[_user][msg.sender], "You don't have access");
        return urls[_user];
    }

    function shareAccess() public view returns(Access[] memory){
        return accessList[msg.sender];
    }
}
