#!/bin/sh

#===========================
# VARIABLES DATABASE
#===========================
#DATABASE HOST
MONGO_HOST="35.201.243.41"
MONGO_PORT="27017"
MONGO_DATABASE="alomobile"
MONGO_USERNAME="alomobile"
MONGO_PASSWORD="letuananh"
MONGO_BACKUPDIR="/home/leanhtuan110596/Alomobile"
MONGO_AUTHDB="alomobile"
#===========================
TIMESTAMP=`date +%F-%H%M`
BACKUP_NAME="$MONGO_DATABASE-$TIMESTAMP"
#===========================
# STARTING BACKUP
#===========================
echo "Performing backup of $MONGO_DATABASE"
echo "------------------------------------"
#create dump file gzip
mongodump --quiet --host $MONGO_HOST --port $MONGO_PORT --username $MONGO_USERNAME --password $MONGO_PASSWORD --authenticationDatabase $MONGO_AUTHDB --db $MONGO_DATABASE --archive=$BACKUP_NAME.gz --gzip
echo "Finish backup database"