# Build Bonita BPM Community edition from the source

This page explains how to build Bonita BPM Community edition from the source.

All source code of Bonita BPM solution is available from the [Bonitasoft GitHub organization](https://github.com/bonitasoft). Each component of the solution has a dedicated repository (e.g. [Engine repository](https://github.com/bonitasoft/bonita-engine)).

# Prerequisites

To build the product, you need the following:

* Internet connection
* Git
* JDK 1.8 or above
* Apache Maven 3.5.4 (version is mandatory)
* NodeJS

::: info
We provide build script for Linux only. Therefore it is recommended to use Linux. If you don't have Linux you can either use a virtual machine or port the build script to Mac.
:::

<!---
BS-8375
--->
::: warning
Note that you can run Bonita BPM on Windows but you cannot build Bonita BPM on Windows (known limitation).
:::

# Building Bonita BPM

In order to build Bonita BPM you need to use the script provided in [Build Bonita BPM](https://github.com/Bonitasoft-Community/Build-Bonita-BPM) GitHub project. Use the branch of the project that match the version you want to build.

Simply run `bash build-script.sh` and provide required information.

A script is used because some components rely on components that are built earlier in the sequence, so the build order must be respected.
