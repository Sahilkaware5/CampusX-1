# Backend foundation

This directory is intentionally scaffolded for the PHP/MySQL phase.

Planned layers:
- config: database and application configuration
- auth: login/logout/session handling
- middleware: server-side authentication and RBAC
- student, faculty, cr, council, crc: role-specific backend operations

Production rules:
- Never authorize using frontend JavaScript.
- Use PHP sessions for authenticated state.
- Use password_hash() and password_verify().
- Use prepared statements for database queries.
- Validate and sanitize server-side.
- Add CSRF protection to state-changing requests.
- Escape output to reduce XSS risk.
- Log security-sensitive actions.
