# 1.12 Process configuration overview

There are two reasons for configuring a process:

* Configuring a process for testing
* Configuring a process before deployment

Before you can run a process from Bonita BPM Studio for testing, you must configure it. The configuration is partly set implicitly by the Deployment and Web 
preferences set as [Bonita BPM Studio preferences](bonita-bpm-studio-preferences.md) and is partly set explicitly by 
[configuring the process using the configuration wizard](configuring-a-process.md).

Before you export a process for deployment, you need to set the initial configuration [using the configuration wizard](configuring-a-process.md). 
This configuration is exported with the process if you check the Configuration option in the export dialog when you 
[build a .bar archive](import-and-export-a-process.md#build_for_deployment). 
If you are using the Performance edition, you can [update the configuration after deployment](processes.md). 
For other editions, you can modify the actor mapping only.