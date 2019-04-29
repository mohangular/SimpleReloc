const os = require('os');

//Gets a unique name for this particular node
//Is unique per VM
export function getUniqueName() {
  let name = 'Node_' + os.hostname();
  if (process.env.WEBSITE_SITE_NAME != undefined) {
    name = process.env.WEBSITE_SITE_NAME + '_' + process.env.WEBSITE_INSTANCE_ID;
  }
  return name;
}
