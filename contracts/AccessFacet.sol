// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

error CannotAuthoriseSelf();
error UnAuthorized();
error OnlyContractOwner();

contract AccessFacet {
    bytes32 internal constant NAMESPACE = keccak256("com.akka.library.access");
    bytes32 internal constant DIAMOND_STORAGE_POSITION =
        keccak256("diamond.standard.diamond.storage");

    struct AccessStorage {
        mapping(bytes4 => mapping(address => bool)) execAccess;
    }

    struct DiamondStorage {
        address contractOwner;
    }
    event AccessGranted(address indexed account, bytes4 indexed method);
    event AccessRevoked(address indexed account, bytes4 indexed method);
    event ExecutionAllowed(address indexed account, bytes4 indexed method);
    event ExecutionDenied(address indexed account, bytes4 indexed method);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    function setContractOwner(address _newOwner) internal {
        DiamondStorage storage ds = diamondStorage();
        address previousOwner = ds.contractOwner;
        ds.contractOwner = _newOwner;
        emit OwnershipTransferred(previousOwner, _newOwner);
    }

    function diamondStorage()
        internal
        pure
        returns (DiamondStorage storage ds)
    {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            ds.slot := position
        }
    }

    function accessStorage()
        internal
        pure
        returns (AccessStorage storage accStor)
    {
        bytes32 position = NAMESPACE;
        // solhint-disable-next-line no-inline-assembly
        assembly {
            accStor.slot := position
        }
    }

    function addAccess(bytes4 selector, address executor) internal {
        if (executor == address(this)) {
            revert CannotAuthoriseSelf();
        }
        AccessStorage storage accStor = accessStorage();
        accStor.execAccess[selector][executor] = true;
        emit AccessGranted(executor, selector);
    }

    function removeAccess(bytes4 selector, address executor) internal {
        AccessStorage storage accStor = accessStorage();
        accStor.execAccess[selector][executor] = false;
        emit AccessRevoked(executor, selector);
    }

    function enforceAccessControl() internal view {
        AccessStorage storage accStor = accessStorage();
        if (accStor.execAccess[msg.sig][msg.sender] != true)
            revert UnAuthorized();
    }

    function enforceIsContractOwner() internal view {
        if (msg.sender != diamondStorage().contractOwner)
            revert OnlyContractOwner();
    }

    function setCanExecute(
        bytes4 _selector,
        address _executor,
        bool _canExecute
    ) external {
        if (_executor == address(this)) {
            revert CannotAuthoriseSelf();
        }
        enforceIsContractOwner();
        _canExecute
            ? addAccess(_selector, _executor)
            : removeAccess(_selector, _executor);
        if (_canExecute) {
            emit ExecutionAllowed(_executor, _selector);
        } else {
            emit ExecutionDenied(_executor, _selector);
        }
    }
}
