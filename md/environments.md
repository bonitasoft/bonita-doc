# Environments

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

An environment is a set of configuration definitions for a project. You can configure a process for several environments. In this way, one process can run in several environments without any modification, because the information that is specific to an environment is set at configuration. In the Performance, Efficiency, and Teamwork editions, Bonita Studio proposes three environments, Local,  Production, and Qualification. You can also define custom environments.

You can configure, run, and debug a process in a specific environment.

The default environment is the one most recently selected in the Configure, Run, or Debug menus in the Cool bar.

## Define a custom environment

To define a custom environment for a process, open the process in Bonita Studio Performance, Efficiency, or Teamwork edition and 
select the pool. Then choose **New environment...** from the **Configure**, **Run**, or **Debug** menu in the Cool bar, enter a name for the new environment, and click _**OK**_. The new environment will appear in the  **Configure**, **Run**, and **Debug** menus in the Cool bar.

## Configure a process in an environment

To configure a process for an environment, select the environment from the **Configure** menu in the Cool bar. Then use the configuration wizard to [configure the process](configuring-a-process.md).

## Run a process in an environment

To run a process from Bonita Studio in an environment, select the environment from the **Run** menu in the Cool bar. The process will be launched using the information configured for the specified environment.

## Debug a process in an environment

Use Debug in Bonita Studio to disconnect any connectors that you know cannot run successfully when you run the process in development or test mode. To debug a process from Bonita Studio in an environment, select the environment from the **Debug** menu in the Cool bar. Specify the connectors to be skipped, then click _**Debug**_. The process will be launched using the information configured for the specified environment but the specified connectors will be ignored.
