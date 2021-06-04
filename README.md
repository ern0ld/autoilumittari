# Koodihaaste Solidabis Autoilumittari

Tehtävänäsi on toteuttaa autoilumittari-sovellus. Sovelluksen tulee pystyä suorittamaan vertailu matka-ajan ja polttoaineen kulutuksen välillä kahden eri valitun nopeuden mukaan: käyttäjä ilmoittaa saman matkustettavan etäisyyden samalla kulkuneuvotyypillä eri nopeuksilla ja sovellus laskee miten paljon nopeammin käyttäjä on perillä ja kuinka paljon enemmän polttoainetta tähän kuluu. Etäisyyden sekä kulkuneuvotyypin tulee siis olla molemmissa samat. Sovelluksen tulee pystyä näyttämään web-käyttöliittymässä molemmista annetuista matkanopeuksista käytetty aika ja polttoaine, sekä näiden kahden ero.

## Aloitus ja käyttö

Web-käyttöliittymä löytyy osoitteesta https://ern0ld.github.io/autoilumittari/.
* Valitse Auto alasvetovalikosta 
* Syötä Matkustettava etäisyys
* Syötä Nopeus 1
* Syötä Nopeus 2
* Klikkaa Laske

## Tekniikat ja työkalut

* Pure JS
* Single page application-tekniikka. JS noutaa DOM:ista elementit id:n perusteella ja käyttäjän klikattua Laske-nappulaa tekee tarvittavat laskutoimitukset. Sisältää yksinkertaisen tarkastuksen käyttäjän syötteen oikeellisuudesta. JS Lisää tuloselementtien innerHTML:ksi lasketun tuloksen ja asettaa ne näkyviin. 
* Käyttöjärjestelmä Windows 10
* IDE Visual Studio Code

## Tekijä

Erkki Suvila



