docker build \
--build-arg gcp_sql_host=${GCP_CLOUD_SQL_HOST} \
--build-arg gcp_sql_user=${GCP_CLOUD_SQL_USER} \
--build-arg gcp_sql_pwd=${GCP_CLOUD_SQL_PWD} \
--build-arg gcp_sql_db=${GCP_CLOUD_SQL_DB} \
-t restbugs-server .

docker tag restbugs-server us.gcr.io/restbugs/api-server
