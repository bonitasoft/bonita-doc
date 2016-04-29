# 2.2 Bonita BPM Studio installation

This page explains how to install Bonita BPM Studio for developing processes. There are installer wizards for Windows, Linux, and Mac systems, and an OS-independent archive that can be installed on any system.


[Prerequisites](#prerequisites)  
[Download Bonita BPM Studio](#download)  
[Install using a wizard](#installer)  
[Install using OS-independent archive](#all_os)  
[Start Bonita BPM Studio](#start)  
[License](#license)  
[Troubleshooting](#troubleshooting)





## Prerequisites


Check the [Support Guide](var_support_guide) for details of prerequisite hardware and software.




Before you download Bonita BPM Studio, make sure that you know whether you are using a using a 32 or 64-bit system, and that you have the appropriate Java version installed:


* For Linux, to find out whether you are using a 32 or 64 bit Linux, run the following command: `getconf LONG_BIT`, which returns either 32 or 64\.
* For Windows, see the [32 and 64 bit Windows FAQ](http://windows.microsoft.com/en-us/windows7/32-bit-and-64-bit-windows-frequently-asked-questions).
* For Mac, 32-bit Java is no longer supported, so there is no 32-bit version of Bonita BPM for Mac systems.

Note for Mac users of OS X 10.7.5 and above: a new security feature called **Gatekeeper** prevents the installation of software that is not officially recognized by Apple.
For more information and details of how to install Bonita BPM Studio on a system running Gatekeeper, see the [Apple support site](http://support.apple.com/kb/ht5290).




## Download Bonita BPM Studio




For a Subscription edition of Bonita BPM Studio, go to the [Customer Portal](https://customer.bonitasoft.com/download/request) and request a download.


For the Community edition of Bonita BPM Studio, go to the Bonitasoft website [downloads page](http://www.bonitasoft.com/how-we-do-it/downloads). 
On this page there are buttons to download the Studio installer for your current operating system and the _all in one_, OS-independent version. 
To download the installer for a different operating system, select it from the drop-down menu beside the **Choose** button, and click **_Choose_**. 
Then click the **_Download_** button.


When the download is complete, you have one of the following new files:

Operating system
Community edition
Subscription editions


32-bit
64-bit
32-bit
64-bit

Linux
`BonitaBPMCommunity-x.y.z-x86.run`
`BonitaBPMCommunity-x.y.z-x86_64.run`
`BonitaBPMSubscription-x.y.z-x86.run`
`BonitaBPMSubscription-x.y.z-x86_64.run`

Windows
`BonitaBPMCommunity-x..zy-x86.exe`
`BonitaBPMCommunity-x.y.z-x86_64.exe`
`BonitaBPMSubscription-x..zy-x86.exe`
`BonitaBPMSubscription-x.y.z-x86_64.exe`

Mac
`Not provided`
`BonitaBPMCommunity-x.y.z-x86_64.dmg`
`Not provided`
`BonitaBPMSubscription-x.y.z-x86_64.dmg`

All
`BonitaBPMCommunity-x.y.z.zip`
`BonitaBPMSubscription-x.y.z.zip`

## Install using a wizard





To run the installer wizard for Linux, Windows, or Mac, double-click the downloaded file.


Then follow the installation wizard through to the end of the installation procedure.

The installer import workspace feature applies only to local repositories. 
If you have shared repositories in your workspace, you will need to reconnect to these manually, and possibly migrate the processes to your new version of Bonita BPM Studio. 
The default workspace is automatically initialized at the end of the installation.




## Install using OS-independent archive




To install Bonita BPM Studio using the zip archive, unzip the downloaded .zip file to a folder on your hard drive. Avoid using a folder with a long path. Do not use a path that contains spaces.




## Start Bonita BPM Studio




To start Bonita BPM Studio, go to the directory where you installed it, and run the launcher for your operating system:

Operating system
Community edition
Subscription editions


32-bit
64-bit
32-bit
64-bit

Linux
`BonitaBPMCommunity-linux`
`BonitaBPMCommunity64-linux`
`BonitaBPMSubscription-linux`
`BonitaBPMSubscription64-linux`

Windows
`BonitaBPMCommunity.exe`
`BonitaBPMCommunity64.exe`
`BonitaBPMSubscription.exe`
`BonitaBPMSubscription64.exe`

Mac
`Not provided`
`BonitaBPMCommunity64.app`
`Not provided`
`BonitaBPMSubscription64.app`

## License




This information applies to the Subscription editions. No license is needed for the Community edition.


When you launch Bonita BPM Studio for the first time, you need to install a license:


1. Click _**Copy to clipboard**_ to copy the request key from the pop-up
2. Use the generated request key to request a license on the [Customer portal](https://customer.bonitasoft.com/license/request)
3. _**Check**_ your email box (after a few minutes) and open the email from _no-reply@bonitasoft.com_
4. _**Download**_ the attached file (.lic)
5. Go back to your Bonita BPM Studio, click _**Install license...**_, and select your .lic file.

## Troubleshooting



### Log files

In case of trouble when running Bonita BPM Studio, you might want to take a look at log files.


Studio log file can be displayed from Bonita BPM Studio in "Help" -\> "Show Bonita BPM Studio log" menu.

If Studio fails to start, you can open the log file manually. File is named `.log` and is located in `<studio_folder>/workspace/.metadata` folder.
Note that folder might be hidden and file might not be displayed if you choose to hide file extensions in your file manager.


There is a separate log file for the UI designer, `<studio_folder>/workspace/tomcat/logs/ui-designer.log`.




### OutOfMemory error in Bonita BPM Studio




After installation, you might see an `OutOfMemory` error in Bonita BPM Studio.
This error sometimes occurs when importing a large process definition.
The log messages are similar to the following:

`
!ENTRY org.bonitasoft.studio.importer 4 0 2014-04-25 09:43:49.467
!ERROR Import has failed for file Autorisation Engagement Depenses-2.0.bos

!ENTRY org.bonitasoft.studio.importer 4 0 2014-04-25 09:43:49.470
!ERROR 
!STACK 0
java.lang.reflect.InvocationTargetException
...
Caused by: java.lang.OutOfMemoryError: GC overhead limit exceeded
`




To fix this issue, you need to increase the memory allocated to the JVM that runs the Bonita BPM Studio.


Edit the `*.ini` file that corresponds to the executable you use to launch the Studio 
(e.g. `BonitaBPMSubscription64.ini` if you run on Windows 64bits) and modify this line: `-Xmx512m` to `-Xmx1024m` (or higher).


Then restart Bonita BPM Studio.