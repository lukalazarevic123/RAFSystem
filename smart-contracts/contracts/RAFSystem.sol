// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IRAFSystem.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RAFSystem is IRAFSystem {
    using Counters for Counters.Counter;
    Counters.Counter private _predmetIDCounter;
    Counters.Counter private _ispitIDCounter;

    mapping(address => Student) public studenti;
    mapping(address => bool) public profesori;

    mapping(uint => Predmet) public predmeti;
    mapping(uint => mapping(address => uint8)) polozeno;  // PREDMET > (STUDENT > BODOVI)

    mapping(uint => Ispit) public ispiti;
    mapping(uint => mapping(address => bool)) prijavljeni; //ISPIT > (STUDENT > PRIJAVLJEN)


    modifier samoProfesor {
        require(profesori[msg.sender], "samoProfesor: Niste profesor!");
        _;
    }

    modifier validanStudent(address _student) {
        require(studenti[_student].godinaStudiranja != 0, "validanStudent: Student nije upisan ili je vec ispisan!");
        _;
    }

    modifier validanPredmet(uint256 _predmetID) {
        require(bytes(predmeti[_predmetID].nazivPredmeta).length != 0, "validanPredmet: Predmet sa tim ID-em ne postoji ili je obrisan!");
        _;
    }

    modifier validanIspit(uint256 _ispitID) {
        require(ispiti[_ispitID].vremeOdrzavanja != 0, "validanIspit: Ispit sa tim ID-em ne postoji!");
        require(!ispiti[_ispitID].odrzan, "validanIspit: Ispit sa tim ID-em je vec odrzan!");
        _;
    }

    constructor() {
        profesori[msg.sender] = true;

        dodajPredmet("DS & Algorithms" , "John Doe", 8);
        dodajPredmet("Math 1" , "Jane Doe", 8);
        dodajPredmet("Math 2" , "Jane Doe", 8);
        dodajPredmet("Introduction to programming" , "Vitalik Buterin", 8);
    }

    function upisiStudenta(address _noviStudent, string memory _indeks, Smer _smer) override public samoProfesor {
        require(studenti[_noviStudent].godinaStudiranja == 0, "upisiStudenta: Student je vec upisan!");
        Student memory _novi = Student(_smer, 1, _indeks);

        studenti[_noviStudent] = _novi;
        emit UpisanStudent(_novi);
    }

    function ispisiStudenta(address _student) override public samoProfesor validanStudent(_student) {
        emit IspisanStudent(studenti[_student]);
        delete studenti[_student];
    }

    function izracunajOcenu(address _student, uint _predmetID) view override public validanStudent(_student) validanPredmet(_predmetID) returns (uint8) {
        uint8 _poeni = polozeno[_predmetID][_student];

        if (_poeni == 0) {// student nije polozio predmet
            return 5;
        } else if (_poeni <= 60) {
            return 6;
        } else if (_poeni <= 70) {
            return 7;
        } else if (_poeni <= 80) {
            return 8;
        } else if (_poeni <= 90) {
            return 9;
        } else {
            return 10;
        }
    }

    function getLatestPredmetID() view public returns (uint256) {
        return Counters.current(_predmetIDCounter) - 1;
    }

    function getPredmet(uint _predmetID) public override view validanPredmet(_predmetID) returns (Predmet memory)  {
        return predmeti[_predmetID];
    }

    function dodajProfesora(address _noviProfesor) public override samoProfesor {
        profesori[_noviProfesor] = true;
        emit DodatProfesor(_noviProfesor);
    }

    function dodajPredmet(string memory _nazivPredmeta, string memory _imeProfesora, uint8 _espb) public override samoProfesor {
        require(bytes(_nazivPredmeta).length != 0 && bytes(_imeProfesora).length != 0, "dodajPredmet: Imena predmeta i profesora ne mogu biti prazni!");
        require(_espb > 0, "dodajPredmet: ESPB mora biti veci od 0!");

        Predmet memory _noviPredmet = Predmet(0, _espb, _nazivPredmeta, _imeProfesora);
        uint256 _predmetID = Counters.current(_predmetIDCounter);
        predmeti[_predmetID] = _noviPredmet;

        Counters.increment(_predmetIDCounter);
        emit DodatPredmet(_nazivPredmeta, _predmetID);
    }

    function dodajIspit(uint8 _predmetID, uint _vremeOdrzavanja) public override samoProfesor validanPredmet(_predmetID) {
        require(_vremeOdrzavanja <= block.timestamp, "dodajIspit: Ispit ne moze da se odrzi u proslosti!");

        Ispit memory _noviIspit = Ispit(_predmetID, _vremeOdrzavanja, new address[], false);
        uint _ispitID = Counters.current(_ispitIDCounter);
        ispiti[_ispitID] = _noviIspit;

        Counters.increment(_ispitIDCounter);
        emit DodatIspit(_predmetID, _vremeOdrzavanja);
    }

    function prijaviIspit(uint8 _ispitID) public override payable validanIspit(_ispitID) validanStudent(msg.sender) {
        require(ispiti[_ispitID].vremeOdrzavanja > block.timestamp, "validanIspit: Rok za prijavu ispita je prosao!");
        require(!prijavljeni[_ispitID][msg.sender], "prijaviIspit: Student je vec prijavio ispit!");
        require(msg.value == 5 * (10**14), "prijaviIspit: Prijava za ispit kosta 0.0005 eth!");

        prijavljeni[_ispitID][msg.sender] = true;

        emit PrijavljenIspit(studenti[msg.sender]);
    }

}