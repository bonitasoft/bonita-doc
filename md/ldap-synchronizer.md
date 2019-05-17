# LDAP synchronizer

::: info
**Note:** For Enterprise, Performance, Efficiency, and Teamwork editions only.
:::

The LDAP synchronizer is a service for synchronizing 
Bonita and LDAP directory users and groups in a single direction, LDAP to Bonita. 

The LDAP synchronization service keeps the Bonita organization information synchronized with an external LDAP directory, by creating, updating, or removing
users and groups in the organization
to match as closely as possible the user list attributes defined in LDAP. It does not modify the LDAP directory.

The LDAP Synchronizer connects to both the LDAP server and Bonita Engine to read the data from the LDAP server and modify the organization in the Bonita Engine database using the API.
Both the Engine and the LDAP server must be running when the LDAP Synchronizer tool is run.

The synchronizer program runs in the background. There is no user interface: all configuration settings are specified in files and
all output is written to a log file.

## LDAP objects supported

The synchronizer will synchronize LDAP objects that inherit from the "person" class as users in Bonita.
The synchronizer application does not support user meta data and cannot synchronize passwords. A new user password is initialized with the user name.

The tool supports LDAP groups of the following classes:

* group
* groupOfURLs
* groupOfNames
* groupOfUniqueNames
* ds-virtual-static-group

## Installation

To install the synchronizer, unzip the Tomcat bundle and configure the files located under the tools/BonitaSubscriptionLDAPSynchronizer/conf directory. 
This directory contains a sample configuration in the `conf/default` subfolder which is used to perform LDAP synchronization
on the default tenant. This is also possible to perform the synchronization on a [non default tentant](#non-default-tenant)
which requires dedicated configuration.

Two way to connect the Bonita Engine is possible:

1/ Connection using the Environment variables:

Set the API access mode used by the LDAP Synchronizer, by editing the `<LDAP_SYNCHRONIZER>\BonitaSubscription-<version>-LDAP-Synchronizer.(bat or sh)` file. 

Add between `java` and `-classpath`:
```
-Dorg.bonitasoft.engine.api-type=HTTP -Dorg.bonitasoft.engine.api-type.server.url=http://localhost:8080 -Dorg.bonitasoft.engine.api-type.application.name=bonita
```

The LDAP Synchronizer can use the HTTP, or EJB3 modes, but not local access. For more information about API access modes,
see the [Engine API overview](engine-api-overview.md).

2/ Connection using Bonita.properties files:

See bonita.properties section

Customize the configuration for your system, by editing the configuration files. 
There are some additional considerations for using the LDAP synchronizer in a non-default tenant.

## Configuration files

There are five properties files:

* bonita.properties defines the Bonita connection settings and specifies the account used for user synchronization (requires administration privileges).
* ldap.properties defines the LDAP connection settings and specifies the account used for user browsing.
* logger.properties provides the settings for the logger. Default settings should be fine for most uses.
* mapper.properties specifies the translation between Bonita and LDAP directory user attributes.
* sync.properties defines the synchronization settings.

All configurations files can be found in the conf directory.

**Note**: to use a special character in a properties file, use the Unicode equivalent. For example, for `à` use \\u00E0\. 
You can use a tool such as [native2ascii](http://docs.oracle.com/javase/8/docs/technotes/tools/unix/native2ascii.html) to convert any special characters in the configuration files to Unicode.

You also need to [configure connection on Bonita BPM Engine](configure-client-of-bonita-bpm-engine.md) for the LDAP Synchronizer.

### bonita.properties

This file defines the connection settings and specifies the account used for user synchronization (requires administration privileges).

| Item | Description | Default |
|:-----|:------------|:--------|
| bonita\_home | The path to the Bonita Home folder of the LDAP Synchronizer. (deprecated) |  |
| apiType | The API Type to access the Bonita Engine: HTTP or EJB3 | (1) |
| serverUrl | Url to access the Bonita Server (http://myHost:8080) | (1) |
| applicationName | Application name (bonita is the general name) | (1) |
| ejbReference | Ejb reference when Bonita Server is deployed on an Application server | (1) |
| login | The login to provide is a userName.  | install |
| password | Password of the Bonita account used for synchronization. | install |
| technicalUser | This is the [username of the platform adminstrator](first-steps-after-setup.md). | platformAdmin |
| technicalPassword | This is the [password of the platform adminstrator](first-steps-after-setup.md). | platform |

**(1)**: if apiType properties is not defined, then the variable environment mechanism 
is used to connect to the Bonita Engine.
  
### ldap.properties

This file defines the LDAP connection settings and specifies the account used for user browsing.

| Item | Description | Default |
|:-----|:------------|:--------|
| host\_url | LDAP server URL | ldap://localhost:389 |
| auth\_type | LDAP authentication type (supported values: none, simple or strong) | simple |
| principal\_dn | distinguished name (DN) of the user account used for browsing through the LDAP users | cn=Directory Manager |
| principal\_password | password of the LDAP ?browser account | root |
| directory\_user\_type | type of the user object ("user" for an Active Directory, "person" for an LDAP) | person |

### logger.properties

This file provides the settings for the logger. Default settings should be fine for most uses.

| Item | Description | Default |
|:-----|:------------|:--------|
| log\_dir\_path | directory path where the log files will be stored. The log files are named on the following template: _`log_file_date_prefix`_`_LDAP-BOS_Synchronizer.log` | logs/ |
| log\_file\_date\_prefix | date format used for prefixing the log file name | yyyy=MM=dd |
| log\_level | level of reporting of the logger (relevant values are INFO for production use, FINE for debug use) | INFO |

The date format in log file names follows the syntax of the Java SimpleDateFormat class. 
This is useful to control the number of log file create as the logger will append information to an existing log file if the file name already exists. 
Example: if you set the format to "?yyyy-mm", you will get one new log file per month.

### mapper.properties

This file specifies the translation between Bonita and LDAP directory user attributes such as:
`bonita_property = ldap_property`

The only mandatory property is user\_name, which is the key defined for matching users. All other properties are optional.

An LDAP property may be used several times in the configuration file but each Bonita property should be defined only once. Unused properties should be commented out.

These are the supported Bonita user properties:

| General information | Professional information | Personal information | Custom User Information |
|:-----|:------------|:--------|:--------|
|user\_name  <br/> first\_name  <br/> last\_name  <br/> title  <br/> job\_title  <br/> manager |  pro\_email  <br/> pro\_phone  <br/> pro\_mobile  <br/> pro\_fax  <br/> pro\_website  <br/> pro\_room  <br/> pro\_building  <br/> pro\_address  <br/> pro\_city  <br/> pro\_zip\_code  <br/> pro\_state  <br/> pro\_country | perso\_email  <br/> perso\_phone  <br/> perso\_mobile  <br/> perso\_fax  <br/> perso\_website  <br/> perso\_room  <br/> perso\_building  <br/> perso\_address  <br/> perso\_city  <br/> perso\_zip\_code  <br/> perso\_state  <br/> perso\_country |custom\_\<Custom User Information\>| 

The following items are configured by default:

| Item | Default |
|:-----|:--------|
| user\_name | uid |
| last\_name | sn |
| title | title |
| pro\_email | mail |
| pro\_phone | telephoneNumber |
| pro\_mobile | mobile |
| perso\_phone | homePhone |

**Custom User Information**

The prefix ''custom\_'' is used to map any 'Custom User Information'. For example, to map the 'Custom User Information' "skypeId" and "room"
from LDAP property "skype" and "roomNumber", the syntax is:

```
custom_skypeId = skype
custom_room = roomNumber 
```

### sync.properties

This file defines the synchronization settings.

* error\_level\_upon\_failing\_to\_get\_related\_user: optional parameter that specifies whether an error should be blocking upon getting related users (manager)  
Supported values: ignore, warn or fatal  
Default value: warn
* bonita\_username\_case: optional parameter that specifies whether the LDAP user names should be converted to a given case upon being imported in Bonita.  
Supported values: mixed, uppercase or lowercase  
Default value: mixed (conserves the current LDAP user name case)
* ldap\_watched\_directories: defines the LDAP directories to watch.  
Supported values: list of LDAP watched directory object identifiers separated by commas.  
The syntax for watched directory object properties is detailed in the next section.
* bonita\_nosync\_users: specifies the list of users who should not be synchronized.  
Supported values: user names separated by commas.
* bonita\_user\_role: specifies the role assigned to Bonita users.  
Default value: user
* bonita\_deactivate\_users: optional parameter that specifies whether the tool should deactivate Bonita users who are not present in LDAP. 
When bonita\_deactivate\_users is set to true, a Bonita user who is not present in LDAP is deactivated. The user are not removed from Bonita, but they cannot start process instances or do tasks.
* bonita\_reactivate\_users: optional parameter that specifies whether the tool should reactivate Bonita users who are deactivated in bonita but present in LDAP.  
Supported values: true or false  
Default value: true
* allow\_recursive\_groups: optional parameter that specifies whether sub-groups should also be synchronized. The operation does not preserve the group hierarchy however, and the LDAP sub-groups will be created at root level in Bonita organization.  
Supported values: true or false  
Default value: true
* ldap\_groups: optional parameter that specifies the LDAP groups that should be synchronized.  
Supported values: list of LDAP Group object identifiers separated by commas.  
The syntax for group object properties is detailed in a later section.

* bonita_user_custominfo_policy: Define the policy to synchronize the 'Custom User Information'. The 
  different policy is detailed in a later section.  
  Default value: none

* allow_custominfo_creation: define the strategy when a Custom User Information is detected 
  in the mapper.properties configuration, and not exist in the Bonita database. If this 
  property is true, then the Custom User Information is created.  
Default value: false
  
#### Policy to synchronize the Custom User Information
In Bonita, you can defined a set of Custom User Information attributes. Then, each user has 
a value for each attribute.
A policy named  bonita_user_custominfo_policy gives the strategy to synchronize this 
information.
All examples are based on 

1. Two Custom User Information exist in the Bonita database : *badgeId* and *room*

2. The mapper.properties contains  

```
custom_badgeId = ldapBadgeIdentification
```
The *room* is not declared in the mapper.properties.


* **none**:

```
bonita_user_custominfo_policy = none
```

no 'Custom User Information' is synchronized.

* **partial** : 

```
bonita_user_custominfo_policy = partial
```

Synchronize only 'Custom User Information' declared in the mapper.properties.
 
A 'Custom User Information' not declared in mapper.properties will not be modified. When the Ldap Object doesn't have a property, it will not be modified.

| LDAP object | LDAP property | Synchronization |
|:------------|:--------------|:---------------------------|
| WalterBates | *ldapBadgeIdentification*== 'walterSid' | (Synchronized) *badgeId*=='walterSid' |
| HelenKelly | no property *ldapBadgeIdentification* defined | (No synchronization)  |

* **scope**: 

```
bonita_user_custominfo_policy = scope
```

Same as partial, plus if the Ldap Object doesn't have a property, it will be set to null 
  (all the scope is synchronized)

|LDAP object|LDAP property                          |Synchronization                |
|:----------|:--------------------------------------|:----------------------------------|
|WalterBates|*ldapBadgeIdentification*== 'walterSid'|(Synchronized) *badgeId*=='walterSid'|
|HelenKelly |no property *ldapBadgeIdentification* defined |(Set to null) *badgeId*==null       |

* **full**:  

```
bonita_user_custominfo_policy = full
```

Synchronize all 'Custom User Information'. If a 'Custom User Information' is not declared in mapper.properties, or the Ldap doesn't have the property, it is set to null
 
| LDAP object | LDAP property | Synchronization |
|:------------|:--------------|:---------------------------|
| WalterBates |*ldapBadgeIdentification*== 'walterSid' | (Synchronized) *badgeId*=='walterSid'<br>*room*==null| 
null |



#### LDAP Watched directory object properties syntax

A watched directory is defined by an id that is declared in the "ldap\_watched\_directories" 
list. 
This id provides access to the object properties with this syntax: object\_id.property.

Here are the available object properties:

| | |
|:-----|:--------|
| ldap\_search\_dn | DN of the LDAP watched directory that will be used to get the list of the LDAP users. |
| ldap\_search\_filter | LDAP user search filter (mandatory attribute, but can be a wide filter such as "cn=\*"). |

Example of a watched directory declaration:

```
# Declare a list of LDAP watched directories
ldap_watched_directories = dir1,dir2

# Specify dir1 settings
dir1.ldap_search_dn =   ou=People,dc=example,dc=com
dir1.ldap_search_filter =   cn=*

# Specify dir2 settings
dir2.ldap_search_dn =   ou=OtherPeople,dc=example,dc=com
dir2.ldap_search_filter =   cn=*
```

#### LDAP Group object properties syntax

The tool will automatically detect the group class from LDAP. Here are the LDAP group classes supported by the LDAP
Synchronizer:

* group
* groupOfURLs
* groupOfNames
* groupOfUniqueNames
* ds-virtual-static-group

The tool can determine the list of users belonging to a group by looking these properties, depending on the group's objectClass:
* member: group `objectclass`
* memberURL: `groupOfURLs` objectclass
* member: `groupOfNames` objectclass
* uniqueMember: `groupOfUniqueNames` objectclass
* ds-target-group-dn: `ds-virtual-static-group` objectclass

There are two ways (they can be configured individually or at the same time) to synchronize groups
* declare a list of groups
* perform a LDAP searches to find the list of groups to synchronize


#### Synchronize a list of groups

An LDAP group is defined by an id which is declared in the "ldap\_groups" list. This id provides access to the object properties with this syntax: object\_id.property.
You can also specify groups with a search: all groups that match the search are synchronized.

Groups will be synchronized based on the matching of their LDAP common name (CN) and their Bonita names.


Groups can be declared individually in the configuration file with the following properties :
ldap\_group\_dn
mandatory attribute that specifies the DN of the LDAP group.

forced\_bonita\_group\_name
optional attribute that renames the Bonita group instead of using the original LDAP group name.

force\_add\_non\_existing\_users
optional Boolean attribute (true by default) that defines whether group members that are not present in Bonita should be imported (if false, these users are ignored).

  
Example of group declarations:

```
# List of groups to synchronize
ldap_groups = group1, group2

# Specify group1 settings
group1.ldap_group_dn  =  cn=group1,ou=groups,dc=bonita,dc=com
group1.forced_bonita_group_name  =  forced group1

# Specify group2 settings: 
# sync the group with specified dn but not the users inside this group
group2.ldap_group_dn  =  cn=group2,ou=groups,dc=bonita,dc=com
group2.force_add_non_existing_users  =  false
```


#### Synchronize a list of groups retrieved using a LDAP search

In combination or as an alternative, groups can be declared using the result of an LDAP search that is defined in the configuration file with the following properties :

| | |
|:-----|:--------|
| ldap\_group\_search\_dn | DN of the LDAP watched directory that will be used to get the list of the LDAP groups. |
| ldap\_group\_search\_filter | LDAP group search filter (mandatory attribute, but can be a wide filter such as "cn=\*"). |
| force\_add\_non\_existing\_users | optional boolean attribute (true by default) that defines whether group members that are not present in Bonita should be imported (if false, these users are ignored). |
  
Example of group searches:
```
#Specify search of groups
ldap_search_filter_groups  =  search1,search2

# Specify search1 settings: 
# sync all groups under ou=people,dc=bonita,dc=com with cn starting with "A_"
search1.ldap_group_search_dn  =  ou=people,dc=bonita,dc=com
search1.ldap_group_search_filter  =  cn=A_*

# Specify search2 settings: 
# sync all groups under ou=people,dc=bonita,dc=com with cn starting with "B_" 
# but without importing new users inside these groups
search2.ldap_group_search_dn  =  ou=people,dc=bonita,dc=com
search2.ldap_group_search_filter  =  cn=B_*
search2.force_add_non_existing_users  =  false
```

## Running the synchronizer

Below are all the actions completed by the LDAP synchronizer tool:

1. Reads all Users in the source LDAP directory
2. Creates all Users in the bonita engine db
3. Reads all Groups in the source LDAP directory
4. Creates all Groups in the Bonita Engine db
5. Retrieves all Users that are belonging to the groups in the source LDAP directory
6. Retrieves all Users that are belonging to the groups in the Bonita Engine db
7. For all Users belonging to the groups in the Bonita Engine db and not in the groups in the source LDAP directory, do Delete membership (user, role-in-ldap-tool-config, group)
8. Creates all memberships for all users and groups with a configured role (user, role-in-ldap-tool-config, group)

To run the LDAP synchronizer, execute the script `BonitaSubscription-x.y.z-LDAP-Synchronizer.bat` (for Windows) or `BonitaSubscription-x.y.z-LDAP-Synchronizer.sh` (for Linux), 
where `x.y.z` is the version of Bonita you are running.

**Warning:** Do not modify the Organization from the Bonita Portal while the tool is running, as this will cause a synchronization error.

**Note:** Some use cases require additional configuration server side (for example to use directly the engine API). They are described [here](configure-client-of-bonita-bpm-engine.md).

## <a id="non-default-tenant"/>Using the LDAP synchronizer in a non-default tenant

**Installation:** The LDAP Synchronizer is installed on the platform as described above. 
After installation, Check that the ["User" profile](profiles-overview.md) is defined for the tenant. 
The default tenant has a "User" profile by default, but it must be created manually when a tenant is created. 
The LDAP synchronizer will fail if this profile is not defined.

**Configuration:** To configure the LDAP synchronizer for a tenant that is not the default tenant:

* Create a new folder in `$BonitaSynchronizerFolder/conf` with the same name as the name of the tenant (not the id) that was set when the tenant was created.
* Copy the contents of the default folder from `$BonitaSynchronizerFolder/conf` to this new tenant-specific folder.
* Configure the LDAP synchronizer for the tenant by editing the configuration files in the tenant-specific folder, as described above.

**Running:** To run the LDAP Synchronizer on a tenant, give the name of the tenant as a parameter of the script.


