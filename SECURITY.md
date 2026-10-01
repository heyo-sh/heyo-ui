# Security policy

## Reporting a vulnerability

Please do not open a public issue for a suspected security vulnerability.
Use GitHub's private vulnerability-report form for this repository instead:

<https://github.com/heyo-sh/heyo-ui/security/advisories/new>

Include the affected package and version, a minimal proof of concept, impact,
and any mitigation you know. Do not include credentials, customer data, or
production secrets.

We will acknowledge a report, investigate it privately, and coordinate a fix
and disclosure with the reporter where possible.

## Scope

heyo-ui is a browser component library. The issues we treat as vulnerabilities
are the ones a component can cause in a host application — for example markup
that lets caller-supplied content escape into the DOM as HTML, a component that
leaks a value it was asked to mask, or a published artefact that does not match
this repository.

## Supported versions

Security fixes are made against the latest released version and `main`.
