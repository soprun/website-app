#!/usr/bin/env bash

set -ex

# export GKE_APP_DOMAIN_NAME=${GKE_APP_DOMAIN_NAME}
export GKE_APP_NAME=${GKE_APP_NAME:-app}
export GKE_APP_NAMESPACE=${GKE_APP_NAMESPACE:-sandbox} # sandbox or publication

# Configure: Google Cloud Platform (GCP)
export GCP_PROJECT_ID=${GCP_PROJECT_ID:-project-40825}
export GCP_PROJECT_NUMBER=${GCP_PROJECT_NUMBER:-797048000142}
export GCP_PROJECT_REGION=${GCP_PROJECT_REGION:-europe-west3}
export GCP_PROJECT_ZONE=${GCP_PROJECT_ZONE:-europe-west3-a}

# set default configuration value
# gcloud config set project ${GCP_PROJECT_ID}
# gcloud config set compute/region ${GCP_PROJECT_REGION}
# gcloud config set compute/zone ${GCP_PROJECT_ZONE}

# Configure: Google Kubernetes Engine (GKE)
export GKE_CLUSTER_NAME=${GKE_CLUSTER_NAME:-cluster}
export GKE_CLUSTER_LOCATION=${GKE_CLUSTER_LOCATION:-europe-west3-a} # ZONE_OR_REGION
export GKE_DISK_TYPE=${GKE_DISK_TYPE:-pd-standard} # pd-standard, pd-ssd.
export GKE_DISK_SIZE=${GKE_DISK_SIZE:-100}
# export GKE_CLUSTER_MASTER_IP=${GKE_CLUSTER_MASTER_IP:10.0.0.0}
# export GKE_WORKLOAD_IDENTITY="${PROJECT_ID}.svc.id.goog"

# export GKE_CLUSTER_NUMBER_NODES=3 # min number nodes: 3
# cluster-ipv4-cidr=10.0.0.0/21 \
# export GKE_CLUSTER_IPV4_CIDR=${GKE_CLUSTER_MASTER_IP:10.156.0.0/16}
export GKE_CLUSTER_SUBNETWORK_NAME="${GKE_APP_NAME}-subnet"
export GKE_CLUSTER_SUBNETWORK_RANGE="10.156.0.0/21"


# 10.0.0.0/8

# Configure: Google Compute Engine (GCE)

# Configure: Google Virtual Private Cloud (VPC)
export VPC_LOAD_BALANCER_IP=""
export VPC_LOAD_BALANCER_IP_NAME="${APP_NAMESPACE}-${APP_INSTANCE_NAME}-static-ipv4"

# Configure `kubectl` to connect to the new cluster:
# gcloud container clusters get-credentials "${CLUSTER_NAME}"
# gcloud container clusters --help
