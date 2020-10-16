```
# launch nginx as a quick and dirty web server to host the static content
docker run --rm --name restbugs-server -v `pwd`/resources:/usr/share/nginx/html:ro -p 8080:80 nginx

# launch nginx with a custom configuration file
docker run --rm --name restbugs-server \
-v `pwd`/resources:/usr/share/nginx/html:ro \
-v `pwd`/nginx.conf:/etc/nginx/nginx.conf \
-p 8080:80 nginx
```
