# VTEX Checkout

> Declare custom settings to be used by checkout ui

## Setting up a "VTEX Checkout"

### Suggested file structure

```
project-root/
  vtex-checkout/
    checkout-ui-custom/
      checkout6-custom.css
      checkout6-custom.js
    src/
      js/
      sass/
      templates/
    composer.json
    manifest.json
    project.json
    .gitignore
    .vtexignore
  store/
```

#### manifest.json

It's necessary to set the correct vendor for each project.
In the ```vtex-checkout/manifest.json``` file, change the vendor:

```json
{
  "vendor": "CHANGE-ME",
  ....
}
```

### Installation

**Go to your vtex-store project folder where you want to add the custom checkout.**


#### 2. Install everything this module needs on your project

Edit the ```.vtexignore``` and add ```vtex-checkout/```  directory

Go to ```vtex-checkout/``` and run ```yarn install```.

## Basic usage

Go to ```vtex-checkout/``` and run ```yarn dev```.

Go to ```vtex-checkout/``` and run ```yarn install``` everytime you upgrade the version of the module in your project.

Go to ```vtex-checkout/src/``` and make all the changes needed.
You can link this app separately from the store-theme app for testing. 
When you finish and test all your changes, run ```yarn build:prod```, commit and push your changes as defined in the [guidelines](/vtex-docs/basics/guidelines.html)

## Deployment
1. Update the checkout app version in `manifest.json`
1. Go to ```vtex-checkout/```.
1. Make sure that you are logged in on the desired account.
1. Run ```vtex use {{WS-Name}} --production``` to create a production WS.
1. Run `vtex publish --verbose` and press Y key to publish the new version of the app.
1. Install the app on the WS using `vtex install {{vendor}}.{{appName}}@{{version}}`
1. Test the app ```vtex browse```
1. Promote the WS ```vtex promote``` or deploy the app ```vtex deploy```
 
!!! warning
    If you don't promote the WS, delete it.

## Scripts

#### dev
Runs ```['build:dev']``` and watch development files with ```['nodemon']```.
Example ```yarn dev```.

#### dev:link
Runs ```['dev']``` and link files with vtex using ```['vtex link --no-watch']```.
Example ```yarn dev:link```.
#### build:dev
Runs ```['sass', 'minifyJS']```.
Example ```yarn build:dev```.

#### build:prod
Runs ```['sass', 'minifyJS']``` but compressed.
Example ```yarn build:prod```.

#### sass
Runs ```['sass']``` without compress. No watch.
Example ```yarn sass```.

#### minifyJS
Runs ```['uglify-js']``` without compress. No watch.
Example ```yarn minifyJS```.

#### lint
Runs ```['jshint']``` on ```checkout6-custom.js```.
Example ```yarn lint```.

#### format
Runs ```['pretier']``` on ```checkout6-custom.js```.
Example ```yarn format```.
