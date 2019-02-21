# bierrekening-2.0

**file styteem**

Bentrot.net is opgedeeld in de bierrekening en de streepapp. De bierrekening is opgedeeld in de login pagina, de hoofdpagina en de hoofdpagina voor level 10 members.

Voor elke pagina is er een route aangemaakt in de map routes. Waarin voor elke pagina een pug file wordt aangeroepen. Deze staan in het mapje vieuws. Elke pagina betaat uit een layout file en een index file. Layout is de hoofdfile, en index wordt daar aan toe gevoegd.

naast de pug files en routes zijn er ook nog andere javascripts die gebruikt worden. Hierin staan alle functies om de pagina's te vullen. De belangrijkste hiervoor zijn strepen.js en bierrekening.js respectievelijk voor de streepapp en voor de bierrekening. De stylesheets voor de bierrekening en de streep app zijn style.css en style_streep.css



**Pug**

De pug file wordt bij het maken van de website omgezet naar html. Pug is een vermakkelijkde versie van html. (ken je wel html maar geen pug kan je altijd gewoon html in een pug file zetten of eerst online van html naar pug omschrijven).

In pug is het mogenlijk om met een block te werken. Zo staan in de layout files meerdere "block _naam_" en de inhoud daarvan staat in de index file. 

**Gentella**

Gentella is een HTML template die is gebruikt voor de bierrekening. Hierbij horen ook stylesheets en javascrips. Deze zijn allemaal te vinden in de build en vendors mappen in stylesheets. 