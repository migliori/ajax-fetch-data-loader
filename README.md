
# Ajax Fetch() Data Loader

This small script allows you to insert HTML content and Javascript code retrieved in Ajax with the Javascript Fetch() API

## Demo

<https://www.ajax-fetch-data-loader.miglisoft.com>

## About

The Fetch() Javascript API is a simple and modern way to load dynamic content into a page.
Unfortunately if the loaded content contains some Javascript code it will not be interpreted, that is why I provide this script.

## Features

- parse the content retrieved with Fetch
- creates an Array with the HTML nodes and the scripts at the end
- parses the Array and:
  - inserts the html nodes in the destination container
  - inserts the javascript into &lt;script /&gt; tags, which allows them to be executed.

## Usage/Examples

```javascript
<script>
    document.addEventListener('DOMContentLoaded', function(event) {
        fetch('data.html')
        .then(function (response) {
            return response.text()
        })
        .then(function (html) {
            console.info('content has been fetched from data.html');
            loadData(html, '#ajax-target').then(function (html) {
                console.info('I\'m a callback');
            })
        }).catch((error) => {
            console.log(error);
        });
    });
</script>
```

## Authors

- [@migliori](https://www.github.com/migliori)
