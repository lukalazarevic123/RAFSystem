pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IRAFOceneNFT is IERC721 {

    function mint(address to, string memory uri) external;
    
    function authorize(address _addr) external;
}