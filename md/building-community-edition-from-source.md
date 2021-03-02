# Build Bonita Community edition from the source

Bonita is an opensource Digital Process Automation platform, you can therefore build Bonita Community edition from the source.

All source code of Bonita is available from the [Bonitasoft GitHub organization](https://github.com/bonitasoft). Each Bonita component has
a dedicated repository (e.g. [Engine repository](https://github.com/bonitasoft/bonita-engine)).

# Building Bonita

## Manual Bonita build

You can build Bonita from component to component, but you have to know the component interdependencies: some components rely on components
that are built earlier in the sequence, so the build order must be respected. For instance, build `bonita-engine` prior to build
`bonita-web`.

## The 'Build Bonita' repository

To simplify the build process, you can use the solution provided in the [Build Bonita](https://github.com/Bonitasoft-Community/Build-Bonita) GitHub project.

Follow the `README` file to get instructions about

- the build procedure
- eventual limitations
- eventual additional prerequisites
