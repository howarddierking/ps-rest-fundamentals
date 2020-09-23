To get started, run the following:

```
# create a static file
echo "Hello World" > index.html

# launch nginx as a quick and dirty web server to host the static content
docker run --rm --name static-host -v `pwd`:/usr/share/nginx/html:ro -p 8080:80 nginx
```
