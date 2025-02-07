// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WeatherOracle {
    struct WeatherData {
        string ipfsHash;
        string location;
        uint256 timestamp;
        address requester;
        bool fulfilled;
    }

    address public oracle;
    uint256 public requestCounter;
    mapping(uint256 => WeatherData) public weatherRequests;
    mapping(address => uint256[]) public userRequests;

    event WeatherRequested(
        uint256 indexed requestId,
        string location,
        uint256 timestamp
    );
    event WeatherUpdated(uint256 indexed requestId, string ipfsHash);

    modifier onlyOracle() {
        require(msg.sender == oracle, "Only oracle can update weather data");
        _;
    }

    constructor() {
        oracle = msg.sender;
    }

    function requestWeather(string memory location) external returns (uint256) {
        uint256 requestId = requestCounter++;

        weatherRequests[requestId] = WeatherData({
            ipfsHash: "",
            location: location,
            timestamp: block.timestamp,
            requester: msg.sender,
            fulfilled: false
        });

        userRequests[msg.sender].push(requestId);

        emit WeatherRequested(requestId, location, block.timestamp);
        return requestId;
    }

    function updateWeather(
        uint256 requestId,
        string memory ipfsHash
    ) external onlyOracle {
        require(
            !weatherRequests[requestId].fulfilled,
            "Request already fulfilled"
        );

        WeatherData storage request = weatherRequests[requestId];
        request.ipfsHash = ipfsHash;
        request.fulfilled = true;

        emit WeatherUpdated(requestId, ipfsHash);
    }

    function getUserRequests(
        address user
    ) external view returns (uint256[] memory) {
        return userRequests[user];
    }

    function getWeatherData(
        uint256 requestId
    ) external view returns (WeatherData memory) {
        return weatherRequests[requestId];
    }

    function updateOracle(address newOracle) external onlyOracle {
        require(newOracle != address(0), "Invalid oracle address");
        oracle = newOracle;
    }
}
