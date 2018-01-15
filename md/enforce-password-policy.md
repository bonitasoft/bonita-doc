# Enforce password policy

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

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

To apply this policy edit [`security-config.properties`](BonitaBPM_platform_setup.md) and change `DefaultPasswordValidator` to `RobustnessPasswordValidator`.
* Create a custom password policy by following the tutorial below.

## How to create a custom password policy

This will enable the System administrator to create a custom class and define the characteristics for a particular password policy.
It will be applied to all users.

#### Prerequisites

You should have Maven installed to create a project.

Import **Toolkitview** into your workspace.

## How to create a Java class containing your own password validation characteristics

Here are the steps to add a custom password validator: 

1. Open Maven, and create a new Maven Project. This will create a pom.xml
2. Add a new dependency in your pom.xml to get toolkit-view (x.y.z is the Bonita BPM version number).
```xml
<dependencies>
      <dependency>
          <groupId>org.bonitasoft.console</groupId>
          <artifactId>console-common</artifactId>
          <version>x.y.z</version>
      </dependency>
  </dependencies>`
```

::: warning
**Note:** As this artifact is not available in public repositories, you
have to follow this given procedure (example given for the 7.3.3 version):
* retrieve the console-common-7.3.3.jar from a Bonita distribution or live
instance (in the bonita.war or in the explosed war)
* retrieve poms from the github repository
  * bonita-console: https://github.com/bonitasoft/bonita-web/blob/7.3.3/pom.xml
  * console-common: https://github.com/bonitasoft/bonita-web/blob/7.3.3/common/pom.xml
* manually put the jars and pom in your local repository or deploy them
into your repository manager
  * bonita-console pom.xml file in <M2_REPO>/org/bonitasoft/console/bonita-console/7.3.3
  * console-common pom.xml and jar files in <M2_REPO>/org/bonitasoft/console/console-common/7.3.3
:::


3. Create your class, eg. `PasswordLengthValidator` with a name for the package, eg. `org.bonitasoft.ext.password.validator`.

```java
package org.bonitasoft.ext.password.validator;

import static org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n._;

import org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n;
import org.bonitasoft.web.toolkit.client.common.i18n.AbstractI18n.LOCALE;
import org.bonitasoft.web.toolkit.client.data.item.attribute.validator.AbstractStringValidator;
/**
 * @author John Doe
 */
public class PasswordLengthValidator extends AbstractStringValidator {

    @Override
    protected void _check(String password) {
        
        LOCALE Locale = AbstractI18n.stringToLocale(locale);

        // Check number of length
        int minimalLength = 10;
        if (password.length() < minimalLength) {
                addError(_("Password is not long enough", Locale));
        }
    }
}
```

4. Then, you can build your project. In command-line and type `mvn package`
5. Go in the `target/ folder` and you have your JAR archive, eg. `password-validator-0.0.1-SNAPSHOT.jar`
6. Take a bundle and start it once. This will extract the `bonita.war.`
7. Start it by typing: `cd bin`then `./catalina.sh run`
8. Copy your JAR archive in the folder `webapps/bonita/WEB-INF/lib`
9. Modify all `security-config.properties` files to add your new password validator. e.g. 
```
# content of the file
security.password.validator org.bonitasoft.ext.password.validator.PasswordLengthValidator
```

10. Start your bundle again
`cd bin` and then `./catalina.sh run`
11. Create a new user and check that your password policy has been set. 
To check that the validation is correct, you can type a password to force an error. An exception will be displayed listing all the non-filled criteria.

If the password complies with the criteria in the new password policy, no exception error message will be displayed.
