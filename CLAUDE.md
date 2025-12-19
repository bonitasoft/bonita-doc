# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the **Bonita Documentation** repository containing AsciiDoc sources for the official Bonita documentation site (https://documentation.bonitasoft.com/bonita). The documentation is built using Antora and covers the Bonita BPM platform.

## Repository Structure

The repository follows an Antora-based structure:

- **antora.yml** - Main configuration file defining component name, version, attributes, and navigation structure
- **modules/** - Contains all documentation modules (22 modules total, ~350 AsciiDoc files):
  - Each module has: `pages/`, `images/`, and optionally `attachments/`, `examples/`
  - Key modules: `ROOT`, `process`, `data`, `applications`, `runtime`, `api`, `identity`, `contributing`, etc.
  - Each module includes a `*-nav.adoc` file defining navigation hierarchy

## Version Management

### Branch Strategy

This repository uses **version-based branches** (not main/master):
- Current working branch: **2024.1**
- Main stable branch for PRs: **2022.2**
- Active branches: 2022.1, 2022.2, 2023.1, 2023.2, 2024.1, 2024.2, 2024.3, 2025.1, 2025.2, 2026.1

When creating PRs, target the appropriate version branch based on the work context.

### Merge Conflicts - ours Strategy

The `.gitattributes` file specifies `merge=ours` for version-specific files:
- `modules/ROOT/pages/release-notes.adoc`
- `modules/ROOT/pages/index.adoc`
- `modules/ROOT/pages/*-dependencies.adoc`
- `modules/version-update/pages/product-versioning.adoc`

These files should maintain their content from the target branch during merges.

## Content Guidelines

### File Naming

ALL files must use **kebab-case** (lowercase with hyphens):
- Correct: `my-super-page.adoc`, `database-connectors-index.adoc`
- Incorrect: `bc-app-declaration.adoc`, `BC_archi_single.png`

### AsciiDoc Structure

Every page MUST start with:
```asciidoc
= Page Title
:description: Brief SEO-friendly description
```

### Cross-References

**NEVER** use hard-coded URLs or relative paths. Always use `xref` macro:

```asciidoc
xref:<version>@<component>:<module>:<page>#anchor[Link Text]
```

Examples:
- Same module: `xref:diagram-overview.adoc[Overview]`
- Different module: `xref:runtime:applications.adoc[Living Applications]`
- Different version: `xref:2023.1@bonita:ROOT:release-notes.adoc[2023.1 Release Notes]`
- With anchor: `xref:setup-dev-environment:logging.adoc#log-levels[Log Levels]`

### Internal Anchors

Define explicit anchors instead of relying on auto-generated ones:
```asciidoc
[#my-anchor]
== Section Title
```

Reference: `<<my-anchor, Display Text>>`

### Page Aliases for Redirects

When renaming/moving pages, add aliases to maintain SEO and existing links:
```asciidoc
= New Page Title
:page-aliases: ROOT:old-page-name.adoc, module:another-old-name.adoc
:description: Page description
```

### Attributes and Variables

Use attributes defined in `antora.yml` for version numbers and URLs:
- `{bonitaVersion}` - Current Bonita version (2024.1)
- `{bonitaTechnicalVersion}` - Technical version (10.0.0)
- `{minimalRequiredJavaVersion}` - Java version requirement (17)
- `{javadocVersion}` - Javadoc version (10.0)
- `{openApiUrl}` - API documentation URL

To prevent attribute substitution (e.g., bash variables), use: `++${VARIABLE}++`

### Code Over Screenshots

Replace code screenshots with AsciiDoc source blocks:
```asciidoc
[source,java]
----
public class Example {
    // code here
}
----
```

Supported languages: java, groovy, xml, json, javascript, bash, sql, etc.

### Downloadable Resources

- Store code examples in `modules/[module-name]/examples/`
- Store attachments (PDFs, templates, etc.) in `modules/[module-name]/attachments/`

## GitHub Workflows

### PR Checks

All PRs trigger automated checks:
- **Commit title validation** - Must follow Conventional Commits format
- **Antora content guidelines** - Validates file naming and structure
- **Cross-reference validation** (`pr-validate-references.yml`) - Ensures all `xref` links are valid
- **Build preview** - Generates preview site deployed to Surge

### Conventional Commits

PR titles must follow Conventional Commits format:
```
<type>(<scope>): <description>

Examples:
docs(rest-api): add pagination examples
feat(connectors): document OAuth2 authentication
fix(runtime): correct deployment instructions
```

Common types: docs, feat, fix, chore, refactor

## Development Workflow

### Viewing Changes Locally

The documentation is built by the separate `bonita-documentation-site` repository. This repo contains only content sources. To preview changes:
1. Wait for PR preview build (automatic via GitHub Actions)
2. Preview link will be posted in PR comments

### Testing Cross-References

Before committing, verify xref links:
- Run `pr-validate-references` workflow (automatic on PR)
- Set `fail-on-warning: true` in workflow means all warnings must be fixed

### Making Changes

1. Create branch from appropriate version branch
2. Edit `.adoc` files in `modules/[module-name]/pages/`
3. Update navigation in `modules/[module-name]/*-nav.adoc` if adding new pages
4. Commit following Conventional Commits format
5. Create PR targeting the appropriate version branch
6. Review automated check results and preview build

## Common Patterns

### Navigation Files

Navigation files (e.g., `process-nav.adoc`) define hierarchical structure:
```asciidoc
* Top Level
 ** xref:page-one.adoc[Page One]
  *** xref:page-one-a.adoc[Subsection A]
  *** xref:page-one-b.adoc[Subsection B]
 ** xref:page-two.adoc[Page Two]
```

Indentation (spaces) defines hierarchy depth.

### Edition-Specific Features

When documenting subscription-only features:
- For 2023.2+: "Subscription editions only"
- Pre-2023.2: "Enterprise, Performance, and Efficiency editions"

Use admonition blocks:
```asciidoc
[NOTE]
====
This feature is available in Subscription editions only.
====
```

## Module Organization

Key modules and their purpose:
- **ROOT** - Release notes, glossary, main entry points
- **process** - Process design, BPMN, connectors, actors
- **data** - Business Data Model, variables, queries
- **applications** - Living Applications, layouts, themes
- **pages-and-forms** - UI Designer, forms, widgets
- **api** - REST API, Extensions API
- **runtime** - Server deployment, configuration, monitoring
- **identity** - Users, groups, roles, authentication
- **setup-dev-environment** - Development setup, logging
- **contributing** - Building Bonita components from source
