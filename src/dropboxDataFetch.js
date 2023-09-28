const Dropbox = require('dropbox').Dropbox;
const fs = require('node:fs');
const path = require('node:path')

require('dotenv').config()


const {dropBoxToken}= process.env;

const accessToken = dropBoxToken;

// Specify the Dropbox folder path
const folderPath = `/valorant/agent`;

// Create a new Dropbox client
const dbx = new Dropbox({ accessToken, fetch });

// Get a list of all files in the folder
dbx.filesListFolder({ path: folderPath })
  .then((response) => {
    const results = response.result.entries;

    // Create an array to store the promise of each sharable link
    const linkPromises = [];

    // Create an empty object to store the sharable links
    const links = {};

    // Loop through each file in the folder and generate a sharable link
    results.forEach((item, index) => {
      if (item['.tag'] === 'file') {
        const existingLink = item.sharing_info && item.sharing_info.url;
        if (existingLink) {
          // Add a delay of 0.8 seconds to retrieve existing sharable links as API has a response limit
          setTimeout(() => {
            links[item.name] = existingLink;
            console.log(links)
          }, index * 800);
        } else {
          const settings = {
            requested_visibility: { '.tag': 'public' },
            audience: { '.tag': 'public' }
          };
          // Add a delay of 0.8 seconds to retrieve existing sharable links as API has a response limit
          const linkPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
              dbx.sharingCreateSharedLinkWithSettings({ path: item.path_lower, settings })
                .then((response) => {
                  const link = response.result.url;
                  links[item.name] = link;
                  console.log(links)
                  resolve();
                })
                .catch((error) => {
                  reject(error);
                });
            }, index * 800);
          });
          linkPromises.push(linkPromise);
        }
      }
    });

    // Wait for all sharable links to be generated
    console.log(linkPromises)
  })
  .catch((error) => {
    console.error(error);
  });