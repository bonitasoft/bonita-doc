# 2.4.4 Enforce password policy

## Overview

By default, no password policy is set for users of Bonita BPM. It is therefore highly recommended to set a policy to protect your data.

There are three options:

* Leave the default setting as is: "non-protected".
* Apply our ready-to-use policy to a tenant. This requires a password to contain the following:
  * at least 10 characters long
  * at least 2 special characters
  * at least 2 upper case characters
  * at least 2 lower case characters
  * at least 3 digits

To apply this policy to an existing tenant, edit `/bonita/client/platform/tenant/tenants/`_`tenant-id`_`/conf/security-config.properties `
and change `DefaultPasswordValidator` to `RobustnessPasswordValidator`. 
To apply this change to all tenants that you subsequently create, make the same change in `/bonita/client/platform/tenant-template/conf/security-config.properties`. 
* 
Create a custom password policy by following the tutorial below.

## How to create a custom passord policy

This will enable the System administrator to create a custom class and define the characteristics for a particular password policy.
It will be applied to all users.


### Prerequisites

You should have Maven installed to create a project.

Import **Toolkitview** into your workspace.


## How to create a Java class containing your own password validation characteristics

Here are the steps to add a custom password validator: 


1. Open Maven, and create a new Maven Project. This will create a pom.xml
2. Add a new dependency in your pom.xml to get toolkit-view (x.y.z is the Bonita BPM version number).
`
  org.bonitasoft.web.toolkittoolkit-viewx.y.z`

3. Create your class, eg. `PasswordLengthValidator` with a name for the package, eg. `org.bonitasoft.ext.password.validator`.
`package org.bonitasoft.ext.password.validator;

import static org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n._;

import org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n;
import org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n.LOCALE;
import org.bonitasoft.web.toolkit.client.data.item.attribute.validator.AbstractStringValidator;


/**
 * @author Paul AMAR
 */
public class PasswordLengthValidator extends AbstractStringValidator {

    @Override
    protected void _check(String password) {
        
        LOCALE Locale = AbstractI18n.stringToLocale(locale);

        // Check number of length
        int minimalLength = 10;
        if (password.length() 
    
4. Then, you can build your project. In command-line and type `
    mvn package`

    
5. Go in the `
    target/ folder` and you have your JAR archive, eg. `
    password-validator-0.0.1-SNAPSHOT.jar`
    
6. Take a bundle and start it once. This will extract the `
    bonita.war.`
    
7. Start it by typing: `
    cd bin`then 
    `./catalina.sh run
    `

    
8. Copy your JAR archive in the folder `
    webapps/bonita/WEB-INF/lib`

    
9. Modify all `
    security-config.properties` files to add your new password validator. 
e.g. 
`
# content of the file
security.password.validator org.bonitasoft.ext.password.validator.PasswordLengthValidator`

    
10. Start your bundle again
`cd bin
`and then `
./catalina.sh run`

    
11. Create a new user and check that your password policy has been set. 
    `

To check that the validation is correct, you can type a password to force an error. An exception will be displayed listing all the criterion non-respected.

If the password respects the criterion in the new password policy, no exception error message will be displayed.