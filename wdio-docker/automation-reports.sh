#!/bin/bash
timestamp=`date '+%s'`
if aws s3 ls "s3://nightly-automation-reports" 2>&1 | grep -q 'NoSuchBucket'
then
  aws s3 mb s3://nightly-automation-reports
fi
aws s3 cp --recursive ./wdio-docker-poc/reports/ s3://nightly-automation-reports/$timestamp/reports
aws s3 cp --recursive ./wdio-docker-poc/logs/ s3://nightly-automation-reports/$timestamp/logs
