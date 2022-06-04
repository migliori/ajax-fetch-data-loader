
/**
 * Parse the HTML/Javascript nodes
 *
 * @param {string} html the HTML/Javascript returned by fetch()
 * @return {array} a table with the html nodes then the scripts at the end
 */
var _htmlToElements = function (html) {
    var template = document.createElement('template');
    template.innerHTML = html;

    const nodes = template.content.childNodes,
        nodesArray = [],
        scriptsArray = [];
    for (var i in nodes) {
        if (nodes[i].nodeType == 1) { // get rid of the whitespace text nodes
            if (nodes[i].nodeName === 'SCRIPT') {
                scriptsArray.push(nodes[i]);
            } else {
                nodesArray.push(nodes[i]);
            }
        }
    }
    return nodesArray.concat(scriptsArray);
}

/**
 * recursive function that loads each node into the container and then loads the scripts
 *
 * @param {string} data
 * @param {integer} index
 * @param {string} container
 * @return {boolean} true on success after recursion
 */
var _loadContent = function (data, index, container, appendData) {
    if (index === 0 && !appendData) {
        document.querySelector(container).innerHTML = '';
    }
    if (index <= data.length) {
        var element = data[index];
        if (element !== undefined && element.nodeName === 'SCRIPT') {
            // output scripts
            var script = document.createElement('script');
            // copy type
            if (element.type) {
                script.type = element.type;
            }
            // clone attributes
            Array.prototype.forEach.call(element.attributes, function (attr) {
                script.setAttribute(attr.nodeName ,attr.nodeValue);
            });
            if (element.src != '') {
                script.src = element.src;
                script.onload = function () {
                    _loadContent(data, index + 1, container);
                };
                document.head.appendChild(script);
            } else {
                script.text = element.text;
                document.body.appendChild(script);
                _loadContent(data, index + 1, container);
            }
        } else {
            if (element !== undefined) {
                document.querySelector(container).appendChild(element);
            }
            _loadContent(data, index + 1, container);
        }
    } else {
        return true;
    }
};


/**
 * the main function to load the fetched content into the HTML container
 *
 * @param {string} data the HTML/Javascript returned by fetch()
 * @param {string} container the container target selector. ie: '#ajax-target'
 * @param {boolean} appendData choose whether to add the content to the end of the container or to replace it
 * @return {boolean} true on success
 */
var loadData = async function (data, container, appendData = false) {
    return _loadContent(_htmlToElements(data), 0, container, appendData);
}
