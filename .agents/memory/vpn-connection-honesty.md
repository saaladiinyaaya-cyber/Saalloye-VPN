---
name: VPN connection honesty
description: Product constraint for connection status and country selection in Saalloye VPN.
---

Saalloye VPN must not display a connected state unless a real VPN server and secure tunnel are active and verified. Until then, keep the status disconnected, explain that protection is unavailable, and treat country choices as saved preferences rather than live server availability.

**Why:** The user explicitly requested an interface-first build and said not to show fake VPN connections.

**How to apply:** Any future connection behavior, status indicator, disconnect control, or country directory must use verified provider/device tunnel state; do not simulate connectivity.
