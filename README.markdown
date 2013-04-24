# Chaplin.js Front-end + Sinatra Backend

This project combines the [Chaplin.js](https://github.com/chaplinjs/chaplin) [boilerplate](https://github.com/chaplinjs/chaplin-boilerplate) application with a Sinatra backend, using the [Heroku Sinatra MVC template](http://os.alfajango.com/heroku-sinatra-mvc/) 

## Work in progress
This is very much work in progress. I am still getting my head around how Chaplin works - and will be refining this example over time once I figure more stuff out.

## Server

The sinatra application is contained in the server folder. 

I run the sinatra app with:

```
bundle exec shotgun 
```

I'm using Mongo as the datastore - more details to follow.

## Client

The client code is mainly found in the `coffee` folder. 

I compile the coffee scripts to javascript with

```
coffee -cwo server/public/js coffee 
```

This compiles the js files into the server/public/js folder where sinatra can serve them as static files. 

The handlebars templates are stored in `server\public\js\templates`.I'm not that happy about this, as I would prefer to keep all the client code that is modified in the coffee folder (should probably rename it `client-source` or something) - and then the public folder only contains the compiled code. I would really like to have a better separation both between source code vs. compiled/generated code, and between server-side code and client-side code.

