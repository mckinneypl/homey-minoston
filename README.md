# Minoston Z-Wave Remote for Homey Pro

Experimental community source release v1.0.0 for the Minoston MR40Z four-button scene controller. Shared from the author's working installation; not an official Minoston app or an App Store release.

## Features

- One device WHEN card: **A button action occurred**.
- Select Button 1–4 and Pressed 1 time, Pressed 2 times, Pressed 3 times, Held down, or Released.
- Battery measurement through the Z-Wave Battery command class.
- No automatic light bindings: choose your own actions in Homey Flows.

The implementation translates text descriptions in Central Scene reports. Numeric-only or differently worded reports are not handled by this version. Other Minoston models, firmware variants, and additional press counts are not claimed as supported. The Flow card has no output tokens.

## Requirements

- A Z-Wave-capable Homey Pro running Homey 12.0.0 or later.
- An MR40Z with matching device identifiers: manufacturer 786, product type 2340, product ID 53249.
- Node.js/npm and the Homey CLI on the installation computer.

## Install from source

Extract the ZIP into a new folder, open a terminal in that folder, then run:

```bash
npm ci
homey app validate
homey app run
```

If validation fails, stop and retain the error output. Do not treat syntax checks as Homey validation. For temporary testing, keep `homey app run` running. Stop it before installing persistently:

```bash
homey app install
```

For a new device, add the MR40Z through Homey's device pairing interface and use the manufacturer's inclusion procedure. For an existing installation with the same app ID, do not delete or re-pair the working device just to update the source.

## Create a Flow

Choose the MR40Z's **A button action occurred** WHEN card, select a button and action, and connect a notification or other desired action. Test the desired combinations on the physical controller. This release does not claim a comprehensive physical test of every button/action combination.

## Packaging verification

The app/driver JavaScript, manifests, dependency lockfile, and assets are preserved from the supplied working source. Generated build files are excluded from the community ZIP. JavaScript syntax and archive integrity were checked during packaging; Homey CLI validation and physical checks must be performed on the target setup. There is no automated test suite in this release.

## License and support

MIT License, copyright 2026 Percy McKinney. Shared as-is without guaranteed support, bug fixes, or ongoing maintenance. Community forks and contributions are welcome. Third-party dependencies retain their own licenses.
