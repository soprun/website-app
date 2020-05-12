#!/usr/bin/env bash

# ./gpg-secret.sh -f secret.json -p secret -o encrypting.json.gpg --encrypting
# ./gpg-secret.sh -f encrypting.json.gpg -p secret -o decrypting.json

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
    readonly passphrase="$2"
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
    shift # past argument
    shift # past argument
    ;;
esac
done

readonly GPG_FILE=${GPG_FILE:-${file}}
readonly GPG_OUTPUT=${GPG_OUTPUT:-${output}}
readonly GPG_SECRET_PASSPHRASE=${GPG_SECRET_PASSPHRASE:-${passphrase}}

[[ ! -f ${GPG_FILE} ]] && echo "An error occurred, secret file is required." && exit 1;
[[ -z ${GPG_OUTPUT} ]] && echo "An error occurred, output file is required." && exit 1;
[[ -f ${GPG_OUTPUT} ]] && echo "An error occurred, output file is exist." && exit 1;
[[ -z ${GPG_SECRET_PASSPHRASE} ]] && echo "An error occurred, passphrase is required." && exit 1;

if [[ ${encrypting} == "true" ]]; then
  gpg \
    --quiet \
    --batch \
    --cipher-algo AES256 \
    --passphrase ${GPG_SECRET_PASSPHRASE} \
    --output ${GPG_OUTPUT} \
    --symmetric ${GPG_FILE}
else
  gpg \
    --quiet \
    --batch \
    --yes \
    --passphrase ${GPG_SECRET_PASSPHRASE} \
    --output ${GPG_OUTPUT} \
    --decrypt ${GPG_FILE}
fi

echo "ok" && exit 0;
