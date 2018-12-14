const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const _ = require('lodash');

const COMPONENTS_PATH = './src/Components/';

function exportNessieComponents(lib)
{
    const exportedLib = fs.readdirSync(`./node_modules/${lib}/src/`);
    const spliced = ['Addons', 'defaults.json', 'drivers.js', 'index.js', 'proto', 'utils','.DS_Store'];
    spliced.forEach( item => {
        exportedLib.splice(exportedLib.indexOf( item ), 1)
    } )
    return exportedLib;
}

function loopComponents( Components )
{
    Components.forEach( component => {
        const componentFolder = `${ COMPONENTS_PATH }${component}`;
        const ComponentTag = component;
        fs.mkdirSync( componentFolder );
        fs.writeFileSync( `${ componentFolder }/index.js`, `export { ${component} } from 'nessie-ui';` );
    } )
}

function createComponent( externalComponents = exportNessieComponents( 'nessie-ui' ) )
{
        const internalComponents = fs.readdirSync('./src/Components/');
        const internalComponentsFiltered = internalComponents.filter( item => item != 'readme.md');

        const newComponents = _.difference( externalComponents, internalComponents );

        if( newComponents.length )
        {
            loopComponents( newComponents );
        }

        if( internalComponentsFiltered.length  > externalComponents.length )
        {
            const extraComponents = _.difference( internalComponentsFiltered, externalComponents );
            extraComponents.forEach( item => {
                rimraf( `${COMPONENTS_PATH}${item}`, function(){

                } )
            } )
        }

        if ( internalComponents.length <= 0 )
        {
            loopComponents( externalComponents );
        }

    return externalComponents.map( component => path.resolve( __dirname, '../', `${COMPONENTS_PATH}${component}`, 'index.js') )
}

module.exports = {
    COMPONENTS_PATH,
    createComponent
};
