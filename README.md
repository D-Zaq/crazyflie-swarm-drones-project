Liens Youtube :

RF1 : https://youtu.be/13IK0fUkqR0

RF2 (simulation) : https://youtu.be/disSh0j17Xk

RF2 (physique) : https://youtu.be/0ldOjo93YiA

RF3 (simulation) : https://youtu.be/6V3i5QbMqSM

RF3 (physique) : https://youtu.be/6oj3N6FtFUk

RF4 (simulation) : https://youtu.be/oqQtMK2dclg

RF4 (physique) : https://youtu.be/0ldOjo93YiA

RF5 (simulation) : https://youtu.be/QU_WdWpacfs

RF5 (physique) : https://youtu.be/0ldOjo93YiA

RF8 RF9 et RF11 (simulation): https://youtu.be/wgHPegepmkc

RF10 (RR) : https://youtu.be/gvLCnpMKphQ

RF13 : https://youtube.com/shorts/S4xfAArf5-k?feature=share

RF17 et RF18 (simulation) : https://youtu.be/cMP4kRYs6wc

RF17 et RF18 (physique): https://youtu.be/hpVkW4-mHgo

RC1 (simulation) : https://www.youtube.com/watch?v=EOlxl1FAvlE

RC1 (physique) : https://youtu.be/ZCaThBH-fKE

RF2 RF3 RF4 RF5 RF6 RF7 RF8 RF9 et RF11 (physique) : https://youtu.be/435cvL4hRAc

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
pipenv install sqlalchemy psycopg2-binary
pipenv install flask marshmallow
pip3 install -r requirements.txt


Ensuite se rendre au dossier server/src et lancer le serveur avec : 

python3 “main.py”

**Base de données : **

Il faut noter que la base de données est configurée, mais pas obligatoire pour faire fonctionner le système à ce niveau du projet.

PgAdmin4:
Activer virtualenv dans le dossier ou se trouve pgAdmin4 : source pgadmin4/bin/activate
Lance pgAdmin4 : pgadmin4

PostgresSQL :
sudo su - postgres
psql

**Simulation**

Note: Avant de d'effectuer les commandes suivantes, il est important de s'assurer que le serveur **et** l'interface soient lancés

Lancer le script sim_launch.sh situé à la racine du dossier simulation.

Appuyer sur le bouton "play"
