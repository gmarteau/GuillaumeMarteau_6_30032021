PIQUANTE - SoPekocko
[OC - DevWeb P6]

--------------
BACKEND
--------------

Démarrer le serveur
----------------------

A partir du dossier backend (cd backend), exécuter la commande:

npm install

pour installer les dépendances, puis la commande:

node server [ou] nodemon server

pour démarrer le serveur.


*****************************************************

Mesures mises en oeuvre en considération de l'OWASP Top Ten
--------------------------------------------------------------

1. Injection

    Validation des entrées avec Regex excluant certains caractères spécifiques au code tels que =, <, >, $.
    De plus, les champs de formulaires sont passés dans xss qui transforme les caractères dangereux en caractères non nuisibles.


2. Broken Authentication

    Masquage des emails avec maskdata, chiffrement des mots de passe avec bcrypt avec un salt de 10.
    Limitation du nombre de requêtes autorisées par la même adresse IP sur un laps de temps donné avec express-rate-limit sur la route /api/auth/login (vs bruteforcing).

3. Sensitive Data Exposure

    Masquage des emails avec maskdata, chiffrement des mots de passe avec bcrypt avec un salt de 10.

4. XXE

    Pas de XXE utilisées.

5. Broken Access Control

    Mise en place d'un système de session par jeton avec json-web-token. Le token est signé avec le user_id, valide pour 6h max, et sa clé est dans une variable d'environnement.
    Un middleware d'authentification est implémenté sur toutes les routes qui concernent les sauces. Il décode le token et compare le user_id avec celui de l'utilisateur faisant la requête.

6. Security Misconfiguration

    Le serveur utilise helmet pour configurer les headers HTTP de manière sécurisée.

7. XSS

    Le serveur utilise x-xss-protection pour configurer les headers HTTP en prévention d'attaques XSS.
    Les champs de formulaires sont passés dans xss qui transforme les caractères dangereux en caractères non nuisibles.

8. Insecure Deserialization


9. Using Components with Known Vulnerabilities

    Snyk a été utilisé pour s'assurer qu'aucun composant utilisé ne présente de vulnérabilité connue.

10. Insufficient Logging & Monitoring

    A cette étape du projet, aucune stratégie de monitoring n'a encore été mise en place.