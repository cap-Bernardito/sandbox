export default function splitLetters(selector, wrapper = '$', delimeter = '', joiner = '') {
  let nodeList = document.querySelectorAll(selector);

  function parseLetters(node) {
    let htmlNode = node.cloneNode();
    htmlNode.innerHTML = '';

    for (let i = 0; i < node.childNodes.length; i++) {
      let childNode = node.childNodes[i];
      if (childNode.nodeType === Node.TEXT_NODE) {
        htmlNode.innerHTML += childNode.data
          .split(delimeter)
          .map(function(letter) {
            if (letter === ' ') {
              return letter;
            } else {
              return wrapper.replace(/\$/g, letter);
            }
          })
          .join(joiner);
      } else {
        htmlNode.appendChild(parseLetters(childNode));
      }
    }

    return htmlNode;
  }

  for (let i = 0; i < nodeList.length; i++) {
    nodeList[i].innerHTML = parseLetters(nodeList[i]).innerHTML;
  }
}

// SplitLetters('.split-letters', '<span class="letter">$</span>', '', '');
