/* eslint-disable unicorn/prefer-module */
require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

// eslint-disable-next-line promise/catch-or-return
fetch(process.env.MAGENTO_GRAPHQL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    variables: {},
    query: `
      {
        __schema {
          types {
            kind
            name
            possibleTypes {
              name
            }
          }
        }
      }
    `,
  }),
})
  .then((result) => result.json())
  // eslint-disable-next-line promise/always-return
  .then((result) => {
    const possibleTypes = {};

    // eslint-disable-next-line no-underscore-dangle
    result.data.__schema.types.forEach((supertype) => {
      if (supertype.possibleTypes) {
        possibleTypes[supertype.name] = supertype.possibleTypes.map((subtype) => subtype.name);
      }
    });

    fs.writeFileSync('./src/types/fragmentTypes.json', JSON.stringify(possibleTypes), (err) => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
