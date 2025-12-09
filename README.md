"# COMP.SE.200-SW-testing" 

This GitHub repository was created for the COMP.SE.200 Software Testing course. Its purpose is to implement automated unit tests for the JavaScript utility library provided in the course materials. The library under test is included in this project as a Git submodule and can be found as:

library

All tests are written using Jest, Chai, and c8 as defined in the test plan. The .internal directory of the library is intentionally excluded from testing and coverage, following course requirements. Continuous integration is handled through GitHub Actions, and coverage reporting will be published via Coveralls.

How to clone and run the unit tests:
"git clone --recurse-submodules https://github.com/Virtanenn/COMP.SE.200-SW-testing.git"


If you already cloned without submodules:
"git submodule update --init --recursive"


Install dependencies:
npm install


Run all tests with coverage:
npm test
