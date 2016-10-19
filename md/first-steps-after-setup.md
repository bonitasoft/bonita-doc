# First steps after setup

This page explains the post-installation setup tasks that you must carry out.

## Check the installation

To verify that the installation was successful and the database is correctly configured, connect to Bonita BPM Portal.

In the URL field of your web browser, enter the local host address, e.g. `http://localhost:8080/bonita`.

**Note:** If the Bonita BPM Portal login page is not displayed, [empty your browser cache](http://www.wikihow.com/Clear-Your-Browser's-Cache) and [cookies](http://www.wikihow.com/Clear-Your-Browser%27s-Cookies) and then reload the page.

At this stage no organization information is loaded: only the technical user account exists.

## Review security

There are a number of ways you can improve the security of your platform. 
Review the [REST API authorization](rest-api-authorization.md) and the other features relating to [security and authentication](_security-and-authentication.md) that are available in Bonita BPM and in your operating system, and update your platform as required for your production environment. 
For example, most environments require a [password policy](enforce-password-policy.md).

## Create a Bonita BPM Portal administrator

Create a user with the "administrator" profile:

Note: do not create a user or an administrator with the same login and password as the technical users (platform and tenant)

1. Log in to Bonita BPM Portal as the technical user.  
**Note:** If your system is using single sign-on with CAS, you need to log in with the following URL: `http://`_`hostname:port`_`/bonita/login.jsp?redirectUrl=portal/homepage`.
2. Create a user with the standard profile.
3. Go to **Organization** \> **Profiles**. Select "Administrator" profile.
4. Click on the "More" button (in the top right corner).
5. Under "Users mapping", click on "Add a user".
6. Select your user and click on the "Add" button. Log out as the Technical user and log back in as the newly created user with administrative rights.
7. Create [users with the standard profile](manage-a-user.md).
8. You can add newly created users to the "User" (standard) profile or to a custom profile.

If you already have a system that stores information about end users, you can use it to create user accounts in Bonita.

If you use an LDAP or Active Directory system, you can use the [LDAP synchronizer](ldap-synchronizer.md) tool to keep the Bonita BPM Portal organization synchronized with it.
