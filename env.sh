#!/usr/bin/env bash

#!/usr/bin/env bash

set -ex

# Google Cloud Platform (GCP)
# Google Kubernetes Engine (GKE)

# GCP_
# GKE_

# set environment variables: Google Cloud Platform
export PROJECT_ID=${PROJECT_ID:-project-40825}
export PROJECT_NUMBER=${PROJECT_NUMBER:-797048000142}
export PROJECT_REGION=${PROJECT_REGION:-europe-west3}
export PROJECT_ZONE=${PROJECT_ZONE:-EUROPE-WEST3-A}

# Configure default
gcloud config set project ${PROJECT_ID}
gcloud config set compute/region ${PROJECT_REGION}
gcloud config set compute/zone ${PROJECT_ZONE}

# Cluster
export CLUSTER_NAME=${CLUSTER_NAME:-cluster}
export CLUSTER_LOCATION=${CLUSTER_LOCATION:-europe-west3-a} # ZONE_OR_REGION
export CLUSTER_MASTER_IP=${CLUSTER_MASTER_IP:-34.89.153.11}
# export WORKLOAD_IDENTITY="${PROJECT_ID}.svc.id.goog"

# export CLUSTER_MASTER_IPV4=${CLUSTER_MASTER_IPV4}
# export CLUSTER_MASTER_IPV4_NAME=""

export APP_DOMAIN_NAME=${APP_DOMAIN_NAME}
export APP_INSTANCE_NAME="app"
export APP_NAMESPACE="sandbox" # sandbox or publication

# export LOAD_BALANCER_IP=""
# export LOAD_BALANCER_IP_NAME="${APP_NAMESPACE}-${APP_INSTANCE_NAME}-static-ipv4"

# Configure `kubectl` to connect to the new cluster:
# gcloud container clusters get-credentials "${CLUSTER_NAME}"
# gcloud container clusters --help

