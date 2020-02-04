apt-get update
apt-get install -y jq
url=`jq '.publicURL' response.json`
urlsize=${#url}
if [ $urlsize -eq 0 ]
then
    echo Appetize deploy failed. Please check your appetize CI/CD variables.
    exit 1
fi
