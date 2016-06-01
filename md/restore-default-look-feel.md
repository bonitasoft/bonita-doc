# Restore the default Look & Feel

::: info
**Note:** For Performance, Efficiency, and Teamwork editions only.
:::

Normally, the Look & Feel for Bonita BPM Portal and for process forms is [managed using Bonita BPM Portal](managing-look-feel.md). However, it is also possible to restore the default Look & Feel using the Bonita BPM Engine API. 
This provides an "escape" in case a Look & Feel that contains errors that make the Bonita BPM Portal unusable is applied.

The default and active Look & Feels are stored in the Bonita BPM Engine database. The Look & Feel is managed by the `ThemeAPI`.

To restore the default Look & Feel with the API, use the `getDefault` method to get the default Look & Feel from the Engine database, 
then call `updateTheme` to load it into the portal.

For example:
`
getThemeAPI().restoreDefaultTheme(ThemeType.PORTAL);
`
