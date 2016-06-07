# Licenses

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

Bonita BPM 7.1 introduces a new Bonita BPM Subscription edition licensing model: case-counter licensing. This page explains how to manage the license for your Bonita BPM Platform, under the case-counter licensing model or using the legacy, CPU core-based, licensing model.

The **_License_** menu in Bonita BPM Portal displays information about the current license. This information is available to the platform administrator only.

The [license for Bonita BPM Studio](bonita-bpm-studio-installation.md) is installed using a wizard when you start the studio for the first time after installation (or after the previous license expires).

## Case-counter licensing

A case-counter license defines the maximum number of cases (process instances) that the platform is permitted to start in the counter period.  
The counter period is typically one year and starts when your Subscription starts or on the anniversary.  
Each time a case starts, the case counter is increased by one.  
Case-counter licenses are available for development and for production. A development license must not be used for production, and typically has a lower case limit than a production license.  
The maximum number of cases is defined in your commercial contract, in discussion with your sales person.

As well as using Bonita BPM Portal, you can monitor the case counter using the [REST API](platform-api.md). You can also check the expiration date of the license with the REST API.

When the case counter reaches the limit set in the license, no more cases can be started. Active cases continue to completion.

If a user tries to submit an instantiation form after the case counter maximum limit is reached, the form is not submitted and an error message is displayed to her.
Note that if the process is still using legacy, 6.x, forms, there is no error message.

## Legacy, CPU core-based, licensing

A legacy license has an expiration date but no case limit.

Shortly before the license expiration date, an email message is sent to the address where the previous license was sent.  
The exact delay before license expiration depends on your subscription and is set by the sales person you talk to, when purchasing the first license, so if you have a specific need, you can discuss it with him or her). You can also check the expiration date using the [REST API](platform-api.md). This is useful if the email address previously used is no longer active, or if the recipient is not checking email (for example, during vacation).

A legacy license is limited to a preset number of CPU cores. A development license is limited to two CPU cores.  
A production license can allow four CPU cores or more. If your server has more CPU cores than the number allocated to Bonita BPM execution in your license, you will need to limit the number of cores available to Bonita BPM Platform.

Below you can find some examples to limit execution of standalone Tomcat setup to 2 CPU cores:

For Windows:   
`start /AFFINITY 3 startup.bat`  
where 3 is the affinity mask (expressed as a hexadecimal number). 1 -\> 1 CPU core, 3 -\> 2 CPU cores, 7 -\> 3 CPU cores, 15 -\> 4 CPU cores...

For Linux:   
`#!/bin/sh taskset -c 0,1 startup.sh `  
where 0,1 indicates CPU cores to use. You can set a list of CPU cores to use or a range. E.g.: 0,1,2,3 or 0-3

Replace `startup.[bat|sh]` with the appropriate launcher of your application server (`startup.bat` if for Tomcat).

## License generation and installation

Your contract with Bonitasoft specifies the details of the subscription you have purchased, including the edition, license model, and case limit for case-counter licensing. A license matching the subscription details is generated on request.

There are two ways to get a license: from the server or using the REST API.

1. Generate a request key from the Bonita BPM Platform server:
   1. Go to the `request_key_utils` folder of your Bonita BPM installation
   2. Run the `generateRequestKey.bat` script (for Windows) or the `generateRequestKey.sh` script (for other operating systems)
2. Generate a request key using the [platform REST API](platform-api.md#license)  

A request key looks like this: `(CIVpYDRB8bhouXdWadLY1M9TVctwYUYuv7ou7sqeIrSUSuCqUIkjQAs0ZGgzbtqv3gguFOHlyMZkyvwdr4HLgg==)`.

Then:   
1. Copy it and go to the [Customer portal](https://customer.bonitasoft.com/license/request) license request page
2. Fill in the details in the form, and copy the request key in the *Request Key* field    
   Note: keep the brackets () in the key; if the key is separated by a line break, remove it and put the key on a single line
3. The license file will be sent to you by email.


### Install the license

When you receive the license file (`.lic` file extension), [update it](BonitaBPM_platform_setup.md#update_platform_conf).

## License renewal timing

To renew your license, you need the request key, which you can get using the script, from the Bonita BPM Portal page, or by using the [REST API](platform-api.md).

For either type of license, if you are still within the Subscription period when you approach the license expiration date, request a new license that starts on the last day of your current license.  
Put the license you receive in the license folder alongside the existing license.  
When you reach the "changeover" date for the licenses, Bonita BPM Engine switches automatically from the expired license to the valid one.

If you approach both the license expiration date and the end of the Subscription period, contact your sales person.

For case-counter licensing, the case counter is reset at the end of the counter period.  
If your license expiring date is before the end of the counter period, get and install a new license as usual. The case counter will continue from its current value under the new license.  
If you approach or reach the case counter limit before the end of the license period, contact your sales person to get a new license with additional cases.
