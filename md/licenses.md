# Licenses

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

Bonita BPM 7.1 introduces a new Bonita BPM Subscription Pack edition licensing model: case-counter licensing. This page explains how to manage the license for your Bonita BPM platform, under the case-counter licensing model or using the legacy licensing model.

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

If a user tries to submits a case start form after the case counter maximum limit is reached, the form cannot be submitted and they see an error message. 
Note that if the process is still using legacy forms, there is no error message.

## Legacy licensing

A legacy license has an expiration date but no case limit.

Shortly before the license expiration date, an email message is sent to the address where the previous license was sent.
The exact number of days before the expiration this reminder message is sent depends on your subscription and is set 
by the sales person you talk to, when purchasing the first license (so if you have a specific need, discuss it with them). You can also check the expiration date using the [REST API](platform-api.md). This is useful if the email address previously used is no longer active, or if the recipient is not checking email (for example, during vacation).

A legacy license is limited to a preset number of CPU cores. A development license is limited to two CPU cores. 
A production license can allow four CPU cores or more. If your server has more CPU cores than the number allocated to Bonita BPM execution in your license, you will need to limit the number of cores available to Bonita BPM Platform.

Below you can find some examples to limit execution of standalone Tomcat setup to 2 CPU cores:

For Windows:   
`start /AFFINITY 3 startup.bat`  
where 3 is the affinity mask (expressed as a hexadecimal number). 1 -\> 1 CPU core, 3 -\> 2 CPU cores, 7 -\> 3 CPU cores, 15 -\> 4 CPU cores...

For Linux:   
`#!/bin/sh taskset -c 0,1 startup.sh `  
where 
0,1 indicates CPU cores to use. You can set a list of CPU cores to use or a range. E.g.: 0,1,2,3 or 0-3

Replace `startup.[bat|sh]` with the appropriate launcher of your application server (`startup.bat` if for Tomcat).

## License installation

Your contract with BonitaSoft specifies the details of the subscription you have purchased, including the edition, license model, and case limit for case-counter licensing. A license matching the subscription details is generated on request.

To obtain and install the license, follow these steps:

1. [Get a request key](#plat_get) for Bonita BPM Platform.
2. Go to the [Customer portal](https://customer.bonitasoft.com/license/request) license request page.
3. Fill in the details in the form.
4. The license file will be sent to you by email.
5. [Install](#plat_install) the license file for Bonita BPM Platform.

### Generate a license request key

You need to generate the license key on the server where you install Bonita BPM Platform. A request key looks like this:
`
(CIVpYDRB8bhouXdWadLY1M9TVctwYUYuv7ou7sqeIrSUSuCqUIkjQAs0ZGgzbtqv3gguFOHlyMZkyvwdr4HLgg==)
`

To generate a request key, go to the `request_key_utils` folder of your Bonita BPM installation and run the `generateRequestKey.bat` script (for Windows) or the `generateRequestKey.sh` script (for other operating systems).

Use the generated request key to request a license on the [Customer portal](https://customer.bonitasoft.com/license/request) license request page. Note: keep the brackets () in the key.
If the key is separated by a line break, remove it and put the key on a single line.

### Install the license

When you receive the license file (`.lic` file extension), [update it](BonitaBPM_platform_setup.md#updating_license).

## License renewal

To renew your license, you need the request key, which you can get using the script, from the Bonita BPM Portal page, or by using the [REST API](platform-api.md).

For either type of license, if you are still within the Subscription period when you approach the license expiration date, request a new license that starts on the last day of your current license. 
Put the license you receive in the license folder alongside the existing license. 
When you reach the "changeover" date for the licenses, Bonita BPM Engine switches automatically from the expired license to the valid one.

If you approach both the license expiration date and the end of the Subscription period, contact your sales person.

For case-counter licensing, the case counter is reset at the end of the counter period. 
If your license expiry date is before the end of the counter period, obtain and install a new license as usual. The case counter will continue from its current value under the new license.
If you approach or reach the case counter limit before the end of the license period, contact your sales person to obtain a new license with additional cases.
