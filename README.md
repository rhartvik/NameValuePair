# Name value pair manager

## Architecture
A simple React app, bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Set up
1. Install Node (via [Installer](https://nodejs.org/en/download/) or [Package manager](https://nodejs.org/en/download/package-manager/))
2. Run `npm install` to install dependencies
3. Run `npm start` to run application

## Notes on design
- Text "Export to JSON" changed to "Export to XML" to match behaviour as defined in specs.
- Only one text input made available for inputing name-value-pairs, since the singular "textbox" is supposed to clear when the clear button is pressed. All the other rows in the mock up are assumed to be filler (like the empty rows on the right side).
- "Name" was used in client facing text and "Key" was used internally