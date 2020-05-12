#!/usr/bin/env bash

export GPG_SECRET_PASSPHRASE=${GPG_SECRET_PASSPHRASE:-secret}

#gpg \
#  --batch \
#  --cipher-algo AES256 \
#  --passphrase="${passphrase}" \
#  --output ./secret/encrypt.json.gpg \
#  --symmetric ./secret.json \

#exit;
# Decrypt the file
#mkdir $HOME/secrets

ls -la "$HOME/gcloud"

# --batch to prevent interactive command --yes to assume "yes" for questions
gpg \
  --quiet \
  --batch \
  --yes \
  --decrypt \
  --passphrase=${GPG_SECRET_PASSPHRASE} \
  --output secret/decrypt.json secret/encrypt.json.gpg
