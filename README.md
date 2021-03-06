![][logo]

Bonfire is a simple yet powerful platform for curating and managing your content.

[![check it out][screenshot]][sample]

## Technologies

 - Admin app: [ember.js](http://emberjs.com/)
 - API [express.js](http://expressjs.com/) and [postgres](http://www.postgresql.org/)
 - Blog app: [express.js](http://expressjs.com/)
 - [Docker](https://www.docker.com/)

## Installation

**requirements**

- [Node.js](https://nodejs.org) - `v5+` recommended
- [ember-cli](http://ember-cli) - `v2+`
- [docker](https://docker.com)
- [docker-compose](https://docs.docker.com/compose/)

Let's go!

```bash
git clone https://github.com/BonfireCms/bonfire.git && cd bonfire && scripts/light
```

Your site should now be running in the following locations:

 - **api**: `http://localhost:3000/api/v1`
 - **site**: `http://localhost:3000`
 - **admin area**: `http://localhost:3000/bonfire`

**note: when running on OS X, if using docker-machine replace `localhost` with the docker-machine ip**

## Hacking

The Admin app and API/site app are separated by `admin` and
`server`(api and site app). The backend app runs in a [docker](https://www.docker.com/) container,
making development much faster and easier to get started.

- [Admin app instructions](https://github.com/BonfireCMS/bonfire/tree/master/admin/README.md)
- [API instructions](https://github.com/BonfireCMS/bonfire/tree/master/server/README.md)

## LICENSE

The MIT License (MIT)

Copyright (c) 2015 Dylan Foster <dylan947@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[logo]: bonfire_logo.png
[screenshot]: bonfire.png
[sample]: http://159.203.238.141/bonfire/pages