# Approaches to managing organizations and actor mapping

There are several possible approaches to managing the organization information required by Bonita BPM. The most appropriate approach for your organization depends on many factors, including the size and stability of your organization, the actors that are defined in the processes you are using, and whether you have a central repository for user data that is LDAP-compatible.

If your organization structure is maintained in LDAP, to avoid duplication of the organization data and its maintenance, you are recommended to use the [LDAP synchronizer](ldap-synchronizer.md), 
which is available with the Bonita BPM Performance, Efficiency, and Teamwork editions.

The next three sections describe typical approaches, two using LDAP and one maintaining the organization data manually:

## Maintain organization in LDAP and map actors to groups

If the groups within your organization are suitable for mapping to the actors in your processes, you can use these groups when [mapping actors](actors.md).

If you are using the Bonita BPM Performance, Efficiency, or Teamwork edition, you can [define the actor mapping in Bonita BPM Portal](processes.md) after a process is deployed. 
For the Community edition, you [specify the
actor mapping in Bonita BPM Studio](actors.md), so you need to [define the groups in Bonita BPM Studio](organization-management-in-bonita-bpm-studio.md). However, you only need to create the groups that are used in actor mappings, not your whole organization hierarchy.

## Maintain organization in LDAP and map actors to roles or memberships

If the groups within your organization are not suitable for mapping to actors in your processes, you can use roles or memberships when [mapping actors](actors.md). 
A membership is a combination of a group and a role.

If you are using the Bonita BPM Performance, Efficiency, or Teamwork edition, you can [define the actor mapping in Bonita BPM Portal](processes.md) after a process is deployed. 
For the Community edition, you [specify the
actor mapping in Bonita BPM Studio](actors.md), so you need to [define the roles and memberships in Bonita BPM Studio](organization-management-in-bonita-bpm-studio.md). However, you only need to create the roles and memberships that are used in actor mappings.

In Bonita BPM Portal, [define the roles and memberships](role.md) used in the actor mappings, and [specify the roles of the users](manage-a-user.md). User roles are specified using a membership.

## Maintain organization manually

For smaller organizations that do not use LDAP, or if you are using the Community edition, you can maintain your organization manually.
Typically, you [manage an organization manually using Bonita BPM Studio](organization-management-in-bonita-bpm-studio.md), and then [import it into Bonita BPM Portal](import-export-an-organization.md). 
This means that the organization management and actor mapping are carried out in the same tool, from a single set of data.

Alternatively, you can initialize the organization in Bonita BPM Studio with just the elements needed for actor mapping. Then export this to Bonita BPM Portal and [manage the users in the Bonita BPM Portal](manage-a-user.md).

## Other considerations

* If you are specifying actor mapping in Bonita BPM Studio, you do not need to duplicate the whole organization structure in Bonita BPM Studio, only the elements that are used in actor mapping. 
However, you can choose to have the whole structure in the Studio. In this way, you can manage all the information in one place, then load it into Bonita BPM Portal using the organization export/import features.
* It is possible to map an actor to an individual user. This is not generally recommended, but in rare cases it can be useful, typically for solving a problem or escalating an issue.
* When deciding how to map actors for a process, you also need to take into account the [actor filters](actor-filtering.md) that are specified in the process definition.
* If you are using the LDAP synchronizer, consider using [LDAP authentication](active-directory-or-ldap-authentication.md).
