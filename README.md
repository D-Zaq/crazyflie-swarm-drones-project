
Liens Youtube :

RF1 : https://youtu.be/13IK0fUkqR0

RF2 : https://youtu.be/disSh0j17Xk

Pour faire fonctionner chacune des composantes, il faut suivre ces commandes :


Interface

Se rendre au dossier Interface et exécuter les commandes suivantes :

npm install
ng add @angular/material
ng serve –open



Serveur Web 

Se rendre au dossier server et exécuter les commandes suivantes :

pip3 install pipenv
virtualenv nomEnv
source nomEnv/bin/activate
pip3 install flask
pip3 install flask-cors
pipenv install sqlalchemy psycopg2-binary
pipenv install flask marshmallow
pip3 install -r requirements.txt


Ensuite se rendre au dossier server/src et lancer le serveur avec : 

python3 “main.py”

Base de données : 

Il faut noter que la base de données est configurée, mais pas obligatoire pour faire fonctionner le système à ce niveau du projet.

PgAdmin4:
Activer virtualenv dans le dossier ou se trouve pgAdmin4 : source pgadmin4/bin/activate
Lance pgAdmin4 : pgadmin4

PostgresSQL :
sudo su - postgres
psql

Simulation : 

sudo x11docker --hostdisplay --hostnet --user=RETAIN -- --privileged -v -- argos-example

sudo docker exec -it $(sudo docker container ls -q) /bin/bash

argos3 -c experiments/crazyflie_sensing.argos

Note (PDR): Comme le Dockerfile n’est pas encore configuré, il est nécessaire de remplacer les fichiers controller.cpp et .h dans le conteneur par le code provenant du répertoire Gitlab dans le dossier sim.
