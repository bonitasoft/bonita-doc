# LDAP connector

The LDAP connector allows a process to retrieve data from an LDAP server by running a query. It is not related with user authentication.

Configuring an LDAP connector with the wizard:

1. In the **General** screen:
  * Enter a name and description for the connector. 
  * Specify whether the connector runs at the start or the end of the step.
  * Specify the behavior if the connector fails.
  * Click **_Next_**.
2. Specify the LDAP server information:  

| Input  | Description  | Type  | 
| ------ | ------------ |------ |
| Host  | IP address or name of server hosting LDAP directory  | string  |
| Port  | LDAP directory port number  | number  | 
| Protocol  | LDAP directory port number  | select  | 
| user  | LDAP user name  | string  | 
| password  | LDAP user password  | string  |

Then click **_Next_**.
3. Specify the search criteria:

| Input  | Description  | Type  | 
| ------ | ------------ | ----- |
| Base DN  | the Distinguished Name at which to start search  | string  | 
| Filter  | specify a subset, e.g. (&(objectClass=person)(givenname=John))  | string in accordance with LDAP syntax  |
| Attributes  | define attributes to return in result entries using LDAP syntax  | string of strings separated by ","  |
| Scope  | subtree: entire subtree starting as the base DN, one level: entries immediately below the base DN, base: search just the named entry  | select  |
| Size limit  | maximum number of entries to return  | number  |
| Time limit (in seconds)  | maximum time to allow search to run  | number  | 
| Referral handling  | ignore or follow referrals  | select  | 
| Alias dereferencing  | always: always dereference aliases, searching: dereference aliases only after name resolution, never: never dereference aliases, finding: dereference aliases only during name resolution  | select  |

Then click **_Next_**.
4. Specify the output operations. The connector returns a list object.
5. Click **_Finish_**.
