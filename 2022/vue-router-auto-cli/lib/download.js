const { promisify } = require("util");

module.exports.clone = async function(repo, desc) {
  const download = promisify(require("download-git-repo"));
  const ora = require("ora");
  const process = ora(`下载... ${repo}`);
  process.start();
  try {
    await download(repo, "test/tmp");
    process.succeed();
  } catch (error) {
    console.log(error);
    process.fail();
  }
};
