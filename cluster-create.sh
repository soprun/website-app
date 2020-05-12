#!/usr/bin/env bash

source ./env.sh

# printenv | sort
# exit;

GKE_CLUSTER_NAME="sandbox_cluster"

# Configure: Google Kubernetes Engine (GKE)

number_nodes=3 # default=3 The number of nodes to be created in each of the cluster's zones.
min_nodes_size=0
max_nodes_size=3

max_surge_upgrade=1
max_unavailable_upgrade=0

# --cluster-ipv4-cidr=10.0.0.0/14

# --max-nodes-per-pool=MAX_NODES_PER_POOL
# --default-max-nodes-per-pool=MAX_NODES_PER_POOL
# The maximum number of nodes to allocate per default initial node pool.

# --max-pods-per-node=MAX_PODS_PER_NODE
# --default-max-pods-per-node=MAX_PODS_PER_NODE
# The max number of pods per node for this node pool.


gcloud container clusters create ${GKE_CLUSTER_NAME} \
  --zone=${GKE_CLUSTER_LOCATION} \
  --workload-pool ${GKE_WORKLOAD_IDENTITY} \
  --num-nodes ${number_nodes} \
  --min-nodes ${min_nodes_size}\
  --max-nodes ${max_nodes_size} \
  --max-surge-upgrade ${max_surge_upgrade} \
  --max-unavailable-upgrade ${max_unavailable_upgrade} \
  --enable-ip-alias \
  --create-subnetwork "name=${GKE_CLUSTER_SUBNETWORK_NAME},range=${GKE_CLUSTER_SUBNETWORK_RANGE}" \
  --enable-autorepair \
  --enable-autoupgrade \
  --enable-autoscaling \
  --enable-stackdriver-kubernetes \
  --enable-intra-node-visibility \
  --enable-network-policy \
  --shielded-integrity-monitoring \
  --shielded-secure-boot \
  --resource-usage-bigquery-dataset "cluster_usage_metering" \
  --enable-resource-consumption-metering \

