const ansiEscapes = require('ansi-escapes-common');
const supportsHyperlinks = require('supports-hyperlinks');

function terminalLink(text, url, {target = 'stdout', ...options} = {}) {
  if (!supportsHyperlinks[target]) {
    if (options.fallback === false) {
      return text;
    }

    return typeof options.fallback === 'function' ? options.fallback(text, url) : `${text} (\u200B${url}\u200B)`;
  }

  return ansiEscapes.link(text, url);
}

terminalLink.isSupported = supportsHyperlinks.stdout;
terminalLink.stderr = (text, url, options = {}) => terminalLink(text, url, {target: 'stderr', ...options});
terminalLink.stderr.isSupported = supportsHyperlinks.stderr;

module.exports = terminalLink;
