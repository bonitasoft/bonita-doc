# Script 

These are the following script connectors:

* Groovy 1.8 which executes a Groovy 1.8 script.
* Groovy 1.8 (deprecated), which is provided for backward compatibility only so that you can continue to run processes with this connector. Do not use this for new connector instances.
* System script, which executes a command or script, generally a shell script (bash for Linux or cmd for Windows).

## How to configure the system script connector

Follow the steps in the wizard to configure the connector. For the **Parameters of the script**, enter this information:

On Linux or Mac
* In the first field, enter the script interpreter e.g. `/bin/sh`
* In the second field, enter the execution parameter e.g. `-c`
* In the third field, enter the script e.g. `find /home/ -name "*.xml"`

On Windows - Command Prompt
* In the first field, enter the script interpreter `cmd`
* In the second field, enter the execution parameter `/c`
* In the third field, enter the script e.g. `java -version`

On Windows - Powershell
* In the first field, enter the script interpreter `powershell`
* In the second field, enter the execution parameter `-command`
* In the third field, enter the script e.g. `$PSVersionTable`



## How to configure the Groovy script connector

Follow the steps in the wizard to configure the connector. When you have entered the script, click _**Evaluate**_ to test the validity of the script. If the script is not valid, a popup window will display an error message.
