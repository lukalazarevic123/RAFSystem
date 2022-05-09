pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./interfaces/IRAFOceneNFT.sol";

contract RAFOceneNFT is IRAFOceneNFT, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _nextTokenID;

    mapping(address => bool) public authorized;

    constructor () ERC721("RAF Ocene", "RAFO") {}

    function authorize(address _addr) external onlyOwner{
        require(!authorized[_addr], "RAFOceneNFT::authorize: Address already authorized!");

        authorized[_addr] = true;
    }

    function mint(address to, string memory uri) external {
        require(authorized[msg.sender], "RAFOceneNFT::mint: Address not authorized to mint!");
    
        _mint(to, Counters.current(_nextTokenID));
        Counters.increment(_nextTokenID);
        _setNFTUri(uri, Counters.current(_nextTokenID));
    }

    function _setNFTUri(string memory _uri, uint256 _tokenId) internal {            
        _setTokenURI(_tokenId, _uri);
    }

}