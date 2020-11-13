STATUS="false"
ctr=1
while [[ "$STATUS" != "true" && ctr -le 60 ]]
do
  echo '\n waiting for grid to be ready. No of tries left:' $((60-ctr))
  STATUS=$(curl -sSL $HUB_HOST:$HUB_PORT/wd/hub/status | jq -r '.value.ready')
  ctr=$((ctr+1))
  sleep 1
done
if [ "$STATUS" == "true" ]
then
 echo "\n grid is ready"
else
 echo "\n grid did not start"
fi
