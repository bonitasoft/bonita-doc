# Deploy Bonita Runtime with Docker

How to install and use the Bonita Runtime docker distribution.

This guide assumes you have a working docker environment.

## Quick start
To start the latest community release
```
docker run --name bonita -d -p 8080:8080 bonita
```

To start the latest subscription release
>Access to Quay.io has to be requested through customer portal
```
docker login quay.io
docker pull quay.io/bonitasoft/bonita-subscription:${varVersion}.0
docker logout quay.io
docker run --name=bonita -d -p 8080:8080 quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```
>Note: You need to provide a valid licence, [follow these steps](#section-StepByStep) in order to get and configure one. 

<a id="section-StepByStep" />

## Step by step installation procedure

### Retrieve a licence
First generate a request key into a container with a specific hostname (-h):

```
docker run --rm --name=bonita -h bonita -ti quay.io/bonitasoft/bonita-subscription:${varVersion}.0 /bin/bash ./generateRequestKey.sh
```
Answer the questions related to the license you want. This will print out the request key and exit automatically from the running container.

Retrieve the licence from the customer portal and place into one folder that will be mounted as a volume of the docker container. In this example, we will use `~/bonita-lic/.`.

```
cp ~/Downloads/BonitaSubscription-7.7-Cloud_Techuser-bonita-20170124-20170331.lic ~/bonita-lic/.
```

Alternatively, you can create a named persistent volume in docker for keeping license file. See [docker documentation on volumes](https://docs.docker.com/storage/volumes/).

### Start the container

Re-create a new Bonita container with the same hostname (-h) and this host directory mounted (-v) :

```
docker run --name bonita -h bonita -v ~/bonita-lic/:/opt/bonita_lic/ -d -p 8080:8080 quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```


::: info
This will only add the initial license to the Bonita Runtime. To renew a license on an existing installation see [Update configuration and license section](#section-update-configuration)
:::

This will start a container running the Tomcat Bundle with Bonita Engine + Portal. As you did not specify any environment variables it's almost like if you had launched the Bundle on your host using startup.{sh|bat} (with security hardening on REST and HTTP APIs, cf Security part). It means that Bonita uses a H2 database here.

You can access the portal on http://localhost:8080/bonita and login using the default credentials : install / install

### Link Bonita to a database
The H2 database allows the Bonita container to work out of the box, but it is not recommended outside of a development environment.

As PostgreSQL is the recommended database for qualification and production environments, follow one of these next sections to configure your Bonita container to run on PostgreSQL database.
You can work with either a PostgreSQL Container, or PostgreSQL as an installed service.

#### PostgreSQL Container

Bonita needs to enable XA transactions in postgres, to do that we set the max_prepared_transactions to 100 (bigger than 0):
```
docker run --name mydbpostgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres:11.2 -c 'max_prepared_transactions=100'
```
See the official PostgreSQL documentation for more details.
```
docker run --name bonita_postgres -v bonita-lic:/opt/bonita_lic/ --link mydbpostgres:postgres -d -p 8080:8080 quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```

#### Using docker-compose

Create a file stack.yml with the following content:
```
# Use tech_user/secret as user/password credentials
version: '3'

services:
  db:
    image: postgres:11.2
    environment:
      POSTGRES_PASSWORD: example
    restart: always
    command:
      - -c
      - max_prepared_transactions=100
  bonita:
    image: quay.io/bonitasoft/bonita-subscription:${varVersion}.0
    volumes:
      - ~/bonita-lic:/opt/bonita_lic/
    ports:
      - 8080:8080
    environment:
      - POSTGRES_ENV_POSTGRES_PASSWORD=example
      - DB_VENDOR=postgres
      - DB_HOST=db
      - TENANT_LOGIN=tech_user
      - TENANT_PASSWORD=secret
      - PLATFORM_LOGIN=pfadmin
      - PLATFORM_PASSWORD=pfsecret
    restart: on-failure:2
    depends_on:
      - db
    entrypoint:
      - bash
      - -c
      - |
        set -e
        echo 'Waiting for Postgres to be available'
        export PGPASSWORD="$$POSTGRES_ENV_POSTGRES_PASSWORD"
        maxTries=10
        while [ "$$maxTries" -gt 0 ] && ! psql -h "$$DB_HOST" -U 'postgres' -c '\l'; do
            let maxTries--
            sleep 1
        done
        echo
        if [ "$$maxTries" -le 0 ]; then
            echo >&2 'error: unable to contact Postgres after 10 tries'
            exit 1
        fi
        exec /opt/files/startup.sh
volumes:
  bonita-lic:        
    external:
      name: bonita-lic 
```

Run `docker stack deploy -c stack.yml bonita`  or `docker-compose -f stack.yml up`, wait for it to initialize completely, and visit `http://swarm-ip:8080`, `http://localhost:8080`, or `http://host-ip:8080` (as appropriate).

#### PostgreSQL as an installed service
If you don't want to run your database in a docker container, the following file `env.txt` needs to be configured and provided to the docker run command: 
```
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
```

```
docker run --name=bonita -h bonita --env-file=env.txt -d -p 8080:8080 quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```

### Start Bonita with custom security credentials
```
docker run --name=bonita -v bonita-lic:/opt/bonita_lic/ -h bonita -e "TENANT_LOGIN=tech_user" -e "TENANT_PASSWORD=secret" -e "PLATFORM_LOGIN=pfadmin" -e "PLATFORM_PASSWORD=pfsecret" -d -p 8080:8080 quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```
Now you can access the Bonita Portal on localhost:8080/bonita and login using: tech_user / secret

## Secure your remote access
This docker image ensures to activate by default both static and dynamic authorization checks on [REST API](rest-api-authorization.md). To be coherent it also deactivates the HTTP API.
But for specific needs you can override this behavior by setting HTTP_API to true and REST_API_DYN_AUTH_CHECKS to false :
```
docker run  -e HTTP_API=true -e REST_API_DYN_AUTH_CHECKS=false --name bonita -v bonita-lic:/opt/bonita_lic/ -h bonita -d -p 8080:8080  quay.io/bonitasoft/bonita-subscription:${varVersion}.0
```

## Environment variables
When you start the bonita image, you can adjust the configuration of the Bonita instance by passing one or more environment variables on the docker run command line.

### PLATFORM_PASSWORD
This environment variable is recommended for you to use the Bonita image. It sets the platform administrator password for Bonita. If it is not specified, the default password `platform` will be used.

### PLATFORM_LOGIN
This optional environment variable is used in conjunction with PLATFORM_PASSWORD to define the username for the platform administrator. If it is not specified, the default username `platformAdmin` will be used.

### TENANT_PASSWORD
This environment variable is recommended for you to use the Bonita image. It sets the tenant administrator password for Bonita. If it is not specified, the default password `install` will be used.

### TENANT_LOGIN
This optional environment variable is used in conjunction with TENANT_PASSWORD to define the username for the tenant administrator. If it is not specified, the default username `install` will be used.

### REST_API_DYN_AUTH_CHECKS
This optional environment variable is used to enable/disable dynamic authorization checking on Bonita REST API. The default value is true, which will activate dynamic authorization checking.

### HTTP_API
This optional environment variable is used to enable/disable the Bonita HTTP API. The default value is false, which will deactivate the HTTP API.

### JAVA_OPTS
This optional environment variable is used to customize JAVA_OPTS. The default value is -Xms1024m -Xmx1024m -XX:MaxPermSize=256m.

### ENSURE_DB_CHECK_AND_CREATION
This optional environment variable is used to allow/disallow the SQL queries to automatically check and create the databases using the database administrator credentials. The default value is true.

### DB_VENDOR
This environment variable is automatically set to postgres or mysql if the Bonita container is linked to a PostgreSQL or MySQL database using --link. The default value is h2. It can be overridden if you don't use the --link capability.

### DB_HOST, DB_PORT
These variables are optional, used in conjunction to configure the bonita image to reach the database instance. There are automatically set if --link is used to run the container.

### DB_NAME, DB_USER, DB_PASS
These variables are used in conjunction to create a new user, set that user's password, and create the bonita database.

`DB_NAME` default value is bonitadb.

`DB_USER` default value is bonitauser.

`DB_PASS` default value is bonitapass.

### BIZ_DB_NAME, BIZ_DB_USER, BIZ_DB_PASS
These variables are used in conjunction to create a new user, set that user's password and create the bonita business database.

`BIZ_DB_NAME` default value is businessdb.

`BIZ_DB_USER` default value is businessuser.

`BIZ_DB_PASS` default value is businesspass.

### DB_ADMIN_USER, DB_ADMIN_PASS
These variables are optional, and used in conjunction to create users and databases through the administrator account used on the database instance.

`DB_ADMIN_USER` if no value is provided, this is automatically set to root with MySQL or postgres with PostgreSQL.

`DB_ADMIN_PASS` if no value is provided, this is automatically set using the value from the linked container: MYSQL_ENV_MYSQL_ROOT_PASSWORD or POSTGRES_ENV_POSTGRES_PASSWORD.

### DB_DROP_EXISTING, BIZ_DB_DROP_EXISTING
`DB_DROP_EXISTING` and `BIZ_DB_DROP_EXISTING` can be used to drop existing databases in order to reuse an existing database instance.

`DB_DROP_EXISTING` default value is N.

`BIZ_DB_DROP_EXISTING` default value is N.

### BONITA_SERVER_LOGGING_FILE, BONITA_SETUP_LOGGING_FILE
Since Bonita 7.9 BONITA_SERVER_LOGGING_FILE and BONITA_SETUP_LOGGING_FILE can be used to update logging configuration.

`BONITA_SERVER_LOGGING_FILE` default value is /opt/bonita/BonitaSubscription-${BONITA_VERSION}/server/conf/logging.properties.

`BONITA_SETUP_LOGGING_FILE` default value is /opt/bonita/BonitaSubscription-${BONITA_VERSION}/setup/logback.xml.

## Migrating from an earlier version of Bonita
The migration scripts affect only the database, not the Bonita instance.
The procedure to migrate a Bonita container is therefore as follow:
* Stop and destroy the running Bonita container.
* Play the migration script on your Bonita database see [migrate the platform from an earlier version of Bonita](migrate-from-an-earlier-version-of-bonita-bpm.md#migrate).
* Get the new Bonita docker image, as explained above.
* Update the license, see [Update configuration and license section](#section-update-configuration)
* Start a new Bonita container.


<a id="section-update-configuration" />

## Update configuration and license

Once renewed from Bonita Customer Portal, the license file and the configuration files are updated using the Setup tool.

Setup tool can be used outside of the Docker container directly by downloading the Tomcat bundle and running it from there.

::: info
The setup tool needs to be able to access the database. Because of that, if the database is in a docker container, its port must be exposed to the host.
:::

See [setup tool page]([setup tool](BonitaBPM_platform_setup.md#update_platform_conf)) for more information.
