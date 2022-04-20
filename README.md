# INF3995 - Projet 3 Équipe 103

# Prérequis
* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [x11Docker](https://github.com/mviereck/x11docker)

# Cloner le répertoire avec tous les sous-modules

```
git clone --recurse-submodules https://gitlab.com/polytechnique-montr-al/inf3995/20221/equipe-103/INF3995-103.git
```

# Liens Démos Videos

1. RF1 : https://youtu.be/13IK0fUkqR0

2. RF2 et RF4 (simulation) : https://youtu.be/DDPy3zP6av8

3. RF2 (physique) : https://youtu.be/0ldOjo93YiA

4. RF3 (simulation) : https://youtu.be/6V3i5QbMqSM

5. RF3 (physique) : https://youtu.be/6oj3N6FtFUk

6. RF4 (physique) : https://youtu.be/0ldOjo93YiA

7. RF5 (simulation) : https://youtu.be/_wsYKvkqE_U

8. RF5 (physique) : https://youtu.be/0ldOjo93YiA

9. RF6 (simulation) : https://youtu.be/ZjJxnp08VyY

10. RF7 (simulation): https://youtu.be/HtsJeYMvS48 et https://youtu.be/f4pQGaMIH9o

11. RF8 RF9 et RF11 (simulation): https://youtu.be/wgHPegepmkc

12. RF10 (RR) : https://youtu.be/gvLCnpMKphQ

13. RF13 : https://youtube.com/shorts/S4xfAArf5-k?feature=share

14. RF17 et RF18 (simulation) : https://youtu.be/cMP4kRYs6wc

15. RF17 et RF18 (physique): https://youtu.be/hpVkW4-mHgo

16. RC1 (simulation) : https://www.youtube.com/watch?v=EOlxl1FAvlE

17. RC1 (physique) : https://youtu.be/ZCaThBH-fKE

18. RF2 RF3 RF4 RF5 RF6 RF7 RF8 RF9 et RF11 (physique) : https://youtu.be/435cvL4hRAc

19. RC2: https://youtu.be/ZYtIfvIZdOM

20. RC3: https://youtu.be/fqE2uKaNJmc

21. RC5: https://youtu.be/0Ivn4ZESiYs

# Pour tout démarrer
```
./start.sh
```

## FrontEnd

Le frontend est construit en typescript avec Angular.

Pour le démarrer en utilisant docker compose:
```
docker-compose up --build inf3995-frontend
```

Pour faire fonctionner chacune des composantes, il faut suivre ces commandes :


**Interface**

Se rendre au dossier Interface et exécuter les commandes suivantes :

npm install

ng add @angular/material

npm install firebase @angular/fire --save

npm install duration

ng serve –open




**Serveur Web**

Se rendre au dossier server et exécuter les commandes suivantes :

pip3 install pipenv

virtualenv nomEnv

source nomEnv/bin/activate

pip3 install flask

pip3 install flask-cors

pip3 install -r requirements.txt


Ensuite se rendre au dossier server/src et lancer le serveur avec : 

python3 “main.py”


**Simulation**

Note: Avant de d'effectuer les commandes suivantes, il est important de s'assurer que le serveur **et** l'interface soient lancés

Lancer le script sim_launch.sh situé à la racine du dossier simulation.

Appuyer sur le bouton "play"

# Convention de codage

C++: Google C++ Style Guide (https://google.github.io/styleguide/cppguide.html)

Python
