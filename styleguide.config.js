const path = require('path');
const utils = require('./utils');


module.exports = {
    usageMode: 'expand',
    title: 'Nessie',
    getComponentPathLine(componentPath){
        const dirname = path.dirname(componentPath);
        const componentName = dirname.split('/').slice(-1)[0];
        return `import { ${componentName} } from 'nessie-ui'`;
    },
    styles: {
        Heading: {
            heading1: {
                color: 'orange'
            }
        }
    },
    sections: [
        {
            name: '',
            content: `${utils.COMPONENTS_PATH}/readme.md`
        },
        {
            name: 'Components',
            components: () => utils.createComponent()
        }
    ]
}
