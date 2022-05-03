pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract RAFOceneNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _nextTokenID;

    mapping(address => bool) public authorized;

    constructor () public ERC721("RAF Ocene", "RAFO") {}

    function authorize(address _addr) external onlyOwner{
        require(!authorized[_addr], "RAFOceneNFT::authorize: Address already authorized!");

        authorized[_addr] = true;
    }

    function mint(address to, string memory uri) external {
        require(authorized[msg.sender], "RAFOceneNFT::mint: Address not authorized to mint!");
    
        _safeMint(to, nextTokenId);
        _setNFTUri(uri, nextTokenId++);
    }

    function _setNFTUri(string memory _uri, uint256 _tokenId) internal {            
        _setTokenURI(_tokenId, campaign.uri);
    }

}