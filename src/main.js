import * as cp from 'child_process';
const {AutoLanguageClient} = require('atom-languageclient')

class DevfactoryLanguageClient extends AutoLanguageClient {
  getGrammarScopes () { return [ 'source.java', 'source.cs', 'source.py', 'source.rb'] }
  getLanguageName () { return 'Java' }
  getServerName () { return 'Devfactory LanguageServer' }

  startServerProcess () {
    return cp.spawn('langserver', ['-vv'])
  }
}

module.exports = new DevfactoryLanguageClient()