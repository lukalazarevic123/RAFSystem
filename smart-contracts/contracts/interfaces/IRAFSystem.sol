// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IRAFSystem {

    enum Smer {RN, RI, D, IT}

    event UpisanStudent(Student _student);
    event IspisanStudent(Student _student);
    event DodatPredmet(string indexed _nazivPredmeta, uint256 indexed _predmetID);
    event PolozenPredmet(address _student, uint256 _predmetID);
    event DodatProfesor(address _noviProfesor);
    event DodatIspit(uint8 _predmetID, uint _vremeOdrzavanja);
    event PrijavljenIspit(Student _student);
    event OdrzanIspit(Ispit ispit);

    struct Student {
        Smer smer;
        uint8 godinaStudiranja; // 1, 2, 3, 4
        string indeks; // npr 102/2020
    }

    struct Predmet {
        uint8 espb;
        string nazivPredmeta;
        string profesor;
    }

    struct Ispit {
        Predmet predmet;
        uint vremeOdrzavanja;
        address[] studenti;
        bool odrzan;
    }

    function upisiStudenta(address _noviStudent, string memory _indeks, Smer _smer) external;

    function ispisiStudenta(address _noviStudent) external;

    function dodajPredmet(string memory _nazivPredmeta, string memory _imeProfesora, uint8 _espb) external;

    function dodajIspit(uint8 _predmetID, uint _vremeOdrzavanja) external;
    
    function prijaviIspit(uint8 _ispitID) external payable;

    function odrziIspit(uint8 _ispitID) external;

    function platiSkolarinu() external;

    function izracunajOcenu(address _student, uint _predmetID) view external returns (uint8);

    function getPredmet(uint _predmetID) external view returns (Predmet memory);

    function dodajProfesora(address _noviProfesor) external;

    function getLatestPredmetID() view external returns (uint256);
}