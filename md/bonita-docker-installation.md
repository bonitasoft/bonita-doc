# Deploy a Bonita platform using docker

How to install and use the docker distribution of the Bonita platform.

This guide assumes you are on a unix-based operating system.
It also assumes you use the subscription version of the docker image. 
For the community version, see the guide [on docker hub](https://hub.docker.com/_/bonita).

## Step by step installation procedure

### Retrieve a licence
First generate a request key into a container with a specific hostname (-h):

```
docker run --rm --name=bonita -h bonita -ti bonitasoft/bonita-subscription:${varVersion}.0 /bin/bash
unzip /opt/files/BonitaSubscription-${varVersion}.0.zip
cd BonitaSubscription-${varVersion}.0/tools/request_key_utils/
./generateRequestKey.sh
exit
```
Stop the docker container.
Retrieve the licence from the customer portal and place it to a directory on your host :
```
mkdir ~/Documents/Docker/Volumes/bonita-subscription
cp ~/Downloads/BonitaSubscription-7.7-Cloud_Techuser-bonita-20170124-20170331.lic ~/Documents/Docker/Volumes/bonita-subscription
```

### Start the container

Re-create a new Bonita container with the same hostname (-h) and this host directory mounted (-v) :

```
docker run --name bonita -h bonita -v ~/Documents/Docker/Volumes/bonita-subscription/:/opt/bonita_lic/ -d -p 8080:8080 bonitasoft/bonita-subscription:${varVersion}.0
```

This will start a container running the Tomcat Bundle with Bonita Engine + Portal. As you did not specify any environment variables it's almost like if you had launched the Bundle on your host using startup.{sh|bat} (with security hardening on REST and HTTP APIs, cf Security part). It means that Bonita uses a H2 database here.

You can access the portal on http://localhost:8080/bonita and login using the default credentials : install / install

### Link Bonita to a database

#### PostgreSQL Container

PostgreSQL is the recommended database.
First, set the max_prepared_transactions to 100:
```
mkdir -p ~/Documents/Docker/Volumes/custom_postgres
echo '#!/bin/bash' > ~/Documents/Docker/Volumes/custom_postgres/bonita.sh
echo 'sed -i "s/^.*max_prepared_transactions\s*=\s*\(.*\)$/max_prepared_transactions = 100/" "$PGDATA"/postgresql.conf' >> ~/Documents/Docker/Volumes/custom_postgres/bonita.sh
chmod +x ~/Documents/Docker/Volumes/custom_postgres/bonita.sh
```

For more specific PostgresSQL tuning options see [Performance tuning](performance-tuning.md#postgresql-performance-tuning).

Mount that directory location as /docker-entrypoint-initdb.d inside the PostgreSQL container:
```
docker run --name mydbpostgres -v ~/Documents/Docker/Volumes/custom_postgres/:/docker-entrypoint-initdb.d -e POSTGRES_PASSWORD=mysecretpassword -d postgres:11.2
```
See the official PostgreSQL documentation for more details.
```
docker run --name bonita_postgres --link mydbpostgres:postgres -d -p 8080:8080 bonitasoft/bonita-subscription:${varVersion}.0
```

Alternatively, you can simply link the preconfigured bonita-postgres database (with max_prepared_transactions already set):
```
docker run --name mydbpostgres -e POSTGRES_PASSWORD=mysecretpassword -d bonitasoft/postgres
docker run --name bonita_postgres --link mydbpostgres:postgres -h bonita -v ~/Documents/Docker/Volumes/bonita-subscription/:/opt/bonita_lic/ -d -p 8080:8080 bonitasoft/bonita-subscription:${varVersion}.0
```

#### PostgreSQL
if you don't want to run your database in a docker container, some things need to be configured separately: 
```
cat > /tmp/env.txt <<- EOM
ENSURE_DB_CHECK_AND_CREATION=false
DB_VENDOR=postgres
DB_HOST=172.17.0.2
DB_PORT=5432
DB_NAME=custombonitadb
DB_USER=custombonitauser
DB_PASS=custombonitapass
BIZ_DB_NAME=custombusinessdb
BIZ_DB_USER=custombusinessuser
BIZ_DB_PASS=custombusinesspass
EOM
```
```
docker run --name=bonita -h bonita --env-file=/tmp/env.txt -d -p 8080:8080 bonitasoft/bonita-subscription:${varVersion}.0
```

### Start Bonita with custom security credentials
```
docker run --name=bonita -h bonita -e "TENANT_LOGIN=tech_user" -e "TENANT_PASSWORD=secret" -e "PLATFORM_LOGIN=pfadmin" -e "PLATFORM_PASSWORD=pfsecret" -d -p 8080:8080 bonitasoft/bonita-subscription:${varVersion}.0
```
Now you can access the Bonita Portal on localhost:8080/bonita and login using: tech_user / secret


## Secure your remote access
This docker image ensures to activate by default both static and dynamic authorization checks on [REST API](rest-api-authorization.md). To be coherent it also deactivates the HTTP API.
But for specific needs you can override this behavior by setting HTTP_API to true and REST_API_DYN_AUTH_CHECKS to false :
```
docker run  -e HTTP_API=true -e REST_API_DYN_AUTH_CHECKS=false --name bonita -h bonita -v ~/Documents/Docker/Volumes/bonita-subscription/:/opt/bonita_lic/ -d -p 8080:8080  bonitasoft/bonita-subscription:${varVersion}.0
```

## Migrating from an earlier version of Bonita
The migration scripts affect only the database, not the Bonita instance.
The procedure to migrate a Bonita container is therefore as follow:
* Stop an destroy the running Bonita container.
* Play the migration script on your Bonita database
* Start a new Bonita container, as explained above, in the new version.
