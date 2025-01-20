// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DeChat {
    struct Message {
        address sender;
        address recipient;
        string content;
        string messageType; // "text", "image", or "eth"
        uint256 timestamp;
        uint256 ethAmount;
        string imageHash; // IPFS hash for images
    }

    // Mapping from address to their messages
    mapping(address => Message[]) private userMessages;
    
    // Events
    event MessageSent(
        address indexed sender,
        address indexed recipient,
        string content,
        string messageType,
        uint256 timestamp,
        uint256 ethAmount,
        string imageHash
    );

    // Send a text message
    function sendTextMessage(address _recipient, string memory _content) external {
        Message memory newMessage = Message({
            sender: msg.sender,
            recipient: _recipient,
            content: _content,
            messageType: "text",
            timestamp: block.timestamp,
            ethAmount: 0,
            imageHash: ""
        });
        
        userMessages[msg.sender].push(newMessage);
        userMessages[_recipient].push(newMessage);
        
        emit MessageSent(
            msg.sender,
            _recipient,
            _content,
            "text",
            block.timestamp,
            0,
            ""
        );
    }

    // Send an image message
    function sendImageMessage(address _recipient, string memory _imageHash, string memory _caption) external {
        Message memory newMessage = Message({
            sender: msg.sender,
            recipient: _recipient,
            content: _caption,
            messageType: "image",
            timestamp: block.timestamp,
            ethAmount: 0,
            imageHash: _imageHash
        });
        
        userMessages[msg.sender].push(newMessage);
        userMessages[_recipient].push(newMessage);
        
        emit MessageSent(
            msg.sender,
            _recipient,
            _caption,
            "image",
            block.timestamp,
            0,
            _imageHash
        );
    }

    // Send ETH with a message
    function sendETHMessage(address _recipient, string memory _content) external payable {
        require(msg.value > 0, "Must send some ETH");
        require(_recipient != address(0), "Invalid recipient");
        
        Message memory newMessage = Message({
            sender: msg.sender,
            recipient: _recipient,
            content: _content,
            messageType: "eth",
            timestamp: block.timestamp,
            ethAmount: msg.value,
            imageHash: ""
        });
        
        userMessages[msg.sender].push(newMessage);
        userMessages[_recipient].push(newMessage);
        
        // Transfer ETH to recipient
        (bool sent, ) = _recipient.call{value: msg.value}("");
        require(sent, "Failed to send ETH");
        
        emit MessageSent(
            msg.sender,
            _recipient,
            _content,
            "eth",
            block.timestamp,
            msg.value,
            ""
        );
    }

    // Get all messages for a user
    function getUserMessages(address _user) external view returns (Message[] memory) {
        return userMessages[_user];
    }

    // Get contract balance
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Receive function to accept ETH
    receive() external payable {}
    
    // Fallback function
    fallback() external payable {}
}