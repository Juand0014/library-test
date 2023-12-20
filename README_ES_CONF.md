# ¿Cómo configurar?
## En caso de no tener Docker:

La aplicación requiere una variable de entorno para funcionar (DB_URI), la cual es la "conexión" con la base de datos, se puede configurar a través de un archivo ".env" en la raíz del proyecto o en el sistema operativo.

Una vez hecho lo anterior; ejecutar el comando "npm i(nstall)" (Se asume que el sistema cuenta con Node.js LTS) para instalar las dependencias y "npm start" para iniciar.

## En caso de tener Docker:

Desde la raíz del proyecto: `docker-compose up -d --build`.