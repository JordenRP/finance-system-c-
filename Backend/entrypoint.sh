#!/bin/bash

/opt/mssql/bin/sqlservr &

sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P 'YourStrong!Passw0rd' -i /var/opt/mssql/scripts/create_database.sql

wait
