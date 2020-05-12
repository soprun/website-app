#!/usr/bin/env bash

# source ./env.sh


# Configure: Google Kubernetes Engine (GKE)
export GKE_CLUSTER_NAME=${GKE_CLUSTER_NAME:-cluster}
export GKE_CLUSTER_LOCATION=${GKE_CLUSTER_LOCATION:-europe-west3-a} # ZONE_OR_REGION
export GKE_CLUSTER_MASTER_IP=${GKE_CLUSTER_MASTER_IP:-34.89.153.11}
# export WORKLOAD_IDENTITY="${PROJECT_ID}.svc.id.goog"

export GKE_APP_DOMAIN_NAME=${GKE_APP_DOMAIN_NAME}
export GKE_APP_NAME=${GKE_APP_NAME:-app}
export GKE_APP_NAMESPACE=${GKE_APP_NAMESPACE:-sandbox} # sandbox or publication

# Configure: Google Compute Engine (GCE)

# Configure: Google Virtual Private Cloud (VPC)
export VPC_LOAD_BALANCER_IP=""
export VPC_LOAD_BALANCER_IP_NAME="${APP_NAMESPACE}-${APP_INSTANCE_NAME}-static-ipv4"

# Configure `kubectl` to connect to the new cluster:
# gcloud container clusters get-credentials "${CLUSTER_NAME}"
# gcloud container clusters --help

