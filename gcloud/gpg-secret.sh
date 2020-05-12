#!/usr/bin/env bash

# ./gpg-secret.sh -f secret.json -p secret -o encrypting.json.gpg --encrypting
# ./gpg-secret.sh -f encrypting.json.gpg -p secret -o decrypting.json

readonly GPG_SECRET_PASSPHRASE

while [[ $# -gt 0 ]]
do
key="$1"
case ${key} in
    -f|--file)
    readonly file="$2"
    shift # past argument
    shift # past value
    ;;
    -p|--passphrase)
    passphrase="$2"
    shift # past argument
    shift # past value
    ;;
    -o|--output)
    readonly output="$2"
    shift # past argument
    shift # past value
    ;;
    -e|--encrypting)
    readonly encrypting=true
    shift # past argument
    ;;
    *)    # unknown option
    readonly encrypting=false
    shift # past argument
    ;;
esac
done

passphrase=${GPG_SECRET_PASSPHRASE:-${passphrase}}

#echo "file = ${file}"
#echo "output = ${output}"
#echo "passphrase = ${passphrase}"
#echo "encrypting = ${encrypting}"

[[ ! -f ${file} ]] && echo "An error occurred, secret file is required." && exit 1;
[[ -z ${passphrase} ]] && echo "An error occurred, passphrase is required." && exit 1;
[[ -z ${output} ]] && echo "An error occurred, output file is required." && exit 1;

if [[ ${encrypting} == "true" ]]; then
  gpg \
    --quiet \
    --batch \
    --cipher-algo AES256 \
    --passphrase="${passphrase}" \
    --output ${output} \
    --symmetric ${file}
else
  gpg \
    --quiet \
    --batch \
    --yes \
    --passphrase=${passphrase} \
    --output ${output} \
    --decrypt ${file}
fi

echo "ok" && exit 0;
