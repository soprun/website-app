#!/usr/bin/env bash

set -ex

# Configure: Google Cloud Platform (GCP)
export GCP_PROJECT_ID=${GCP_PROJECT_ID:-project-40825}
export GCP_PROJECT_NUMBER=${GCP_PROJECT_NUMBER:-797048000142}
export GCP_PROJECT_REGION=${GCP_PROJECT_REGION:-europe-west3}
export GCP_PROJECT_ZONE=${GCP_PROJECT_ZONE:-europe-west3-a}

# set default configuration value
# gcloud config set project ${GCP_PROJECT_ID}
# gcloud config set compute/region ${GCP_PROJECT_REGION}
# gcloud config set compute/zone ${GCP_PROJECT_ZONE}

source ./.gcloud.sh
