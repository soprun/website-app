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
export GKE_WORKLOAD_IDENTITY=${GKE_WORKLOAD_IDENTITY:-"${GCP_PROJECT_ID}.svc.id.goog"}

# export GKE_CLUSTER_NUMBER_PODS=${GKE_CLUSTER_NUMBER_PODS:-1}
# export GKE_CLUSTER_NUMBER_PODS_MAX=${GKE_CLUSTER_NUMBER_PODS_MAX:-1}
export GKE_CLUSTER_NUMBER_NODES=${GKE_CLUSTER_NUMBER_NODES:-3}
export GKE_CLUSTER_NUMBER_NODES_MAX=${GKE_CLUSTER_NUMBER_NODES_MAX:-8}

export GKE_DISK_TYPE=${GKE_DISK_TYPE:-"pd-ssd"} # pd-standard, pd-ssd.
export GKE_DISK_SIZE=${GKE_DISK_SIZE:-100}
export GKE_MACHINE_TYPE=${GKE_MACHINE_TYPE:-"g1-small"}
export GKE_IMAGE_TYPE=${GKE_IMAGE_TYPE:-"COS"}

# see: https://www.ipaddressguide.com/cidr
# Classless Inter-Domain Routing (CIDR) Range:
# 10.0.0.0/29 - 8
# 10.0.0.0/28 - 16
# 10.0.0.0/26 - 64
# 10.0.0.0/21 - 2,048
# 10.0.0.0/20 - 4,096

export GKE_CLUSTER_SUBNETWORK_NAME=${GKE_CLUSTER_SUBNETWORK_NAME:-"${GKE_APP_NAME}-subnet"}
export GKE_CLUSTER_SUBNETWORK_RANGE=${GKE_CLUSTER_SUBNETWORK_NAME:-"10.156.0.0/28"} # region: europe-west3

# Configure: Google Compute Engine (GCE)
# ...

# Configure: Google Virtual Private Cloud (VPC)
export VPC_LOAD_BALANCER_IP=${VPC_LOAD_BALANCER_IP}
export VPC_LOAD_BALANCER_IP_NAME=${VPC_LOAD_BALANCER_IP_NAME:-"${GKE_APP_NAME}-network-ipv4"}

# export GKE_CLUSTER_MASTER_IP=${GKE_CLUSTER_MASTER_IP:10.0.0.0}

# Configure `kubectl` to connect to the new cluster:
# gcloud container clusters get-credentials "${CLUSTER_NAME}"
# gcloud container clusters --help
