const {spawn} = require('child_process')
const {AutoLanguageClient} = require('atom-languageclient')

class DevfactoryLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.java', 'source.cs', 'source.py', 'source.rb'] }
  getLanguageName () { return 'Java' }
  getServerName () { return 'Devfactory LanguageServer' }

  startServerProcess () {
    console.log('Starting Devfactory LanguageServer')
    const childProcess = cp.spawn('langserver', ['-vv'])
    childProcess.on("error", err =>
      atom.notifications.addError("Unable to start the Devfactory language server.", {
        dismissable: true,
        buttons: [
          {
            text: "Install Instructions",
            onDidClick: () => atom.workspace.open("atom://config/packages/devfactory-language-client")
          },
          {
            text: "Download Python",
            onDidClick: () => shell.openExternal("https://www.python.org/downloads/")
          }
        ],
        description:
          "This can occur if you do not have Python installed or if it is not in your path.\n\n Make sure to install `langserver` by running:\n```\npip3 install --extra-index https://pypi.swarm.devfactory.com devfactory-langserver\n```"
      })
    );
    return childProcess;
  }
}

module.exports = new DevfactoryLanguageClient()
