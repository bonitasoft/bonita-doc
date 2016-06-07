# Approaches to managing organizations and actor mapping

There are several possible approaches to managing the organization information required by Bonita BPM. The most appropriate approach for your organization depends on many factors, including the size and stability of your organization, the actors that are defined in the processes you are using, and whether you have a central repository for user data that is LDAP-compatible.

If your organization structure is maintained in LDAP, to avoid duplication of the organization data and its maintenance, you are recommended to use the [LDAP synchronizer](ldap-synchronizer.md), which is available with the Bonita BPM Performance, Efficiency, and Teamwork editions.

The next three sections describe typical approaches, two using LDAP and one maintaining the organization data manually:

## Maintain organization in LDAP and map actors to groups

If the groups within your organization are suitable for mapping to the actors in your processes, you can use these groups when [mapping actors](actors.md).

If you are using the Bonita BPM Performance, Efficiency, or Teamwork edition, you can [define the actor mapping in Bonita BPM Portal](processes.md) after a process is deployed.  
For the Community edition, you [specify the actor mapping in Bonita BPM Studio](actors.md), so you need to [define the groups in Bonita BPM Studio](organization-management-in-bonita-bpm-studio.md). However, you only need to create the groups that are used in actor mappings, not your whole organization hierarchy.

## Maintain organization in LDAP and map actors to roles or memberships

If the groups within your organization are not suitable for mapping to actors in your processes, you can use roles or memberships when [mapping actors](actors.md).  
A membership is a combination of a group and a role.

If you are using the Bonita BPM Performance, Efficiency, or Teamwork edition, you can [define the actor mapping in Bonita BPM Portal](processes.md) after a process is deployed.  
For the Community editi