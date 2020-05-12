#!/usr/bin/env bash

source ./env.sh

#printenv | sort;exit;

# Create Google Kubernetes Engine (GKE)

tags="\
default-allow-ssh,\
default-allow-http,\
default-allow-https\
"
scopes="\
storage-ro,\
logging-write,\
monitoring,\
service-control,\
service-management,\
trace\
"
metadata="\
disable-legacy-endpoints=true\
"
addons="\
HttpLoadBalancing,\
HorizontalPodAutoscaling,\
NetworkPolicy,\
GcePersistentDiskCsiDriver\
"

git commit \
  --quiet \
  --all \
  --gpg-sign=${ID_GPG_KEY} \
  --message "clusters create: ${GKE_CLUSTER_NAME}"

gcloud beta container clusters create ${GKE_CLUSTER_NAME} --project ${GCP_PROJECT_ID} \
  --async \
  --zone ${GKE_CLUSTER_LOCATION} \
  --no-enable-basic-auth \
  --release-channel regular \
  --workload-pool ${GKE_WORKLOAD_IDENTITY} \
  --machine-type ${GKE_MACHINE_TYPE} \
  --image-type ${GKE_IMAGE_TYPE} \
  --disk-type ${GKE_DISK_TYPE} \
  --disk-size ${GKE_DISK_SIZE} \
  --metadata ${metadata} \
  --tags ${tags} \
  --scopes ${scopes} \
  --addons ${addons} \
  --enable-ip-alias \
  --enable-autorepair \
  --enable-autoupgrade \
  --enable-autoscaling \
  --autoscaling-profile optimize-utilization \
  --enable-stackdriver-kubernetes \
  --enable-intra-node-visibility \
  --enable-network-policy \
  --enable-shielded-nodes \
  --enable-resource-consumption-metering \
  --enable-pod-security-policy \
  --num-nodes ${GKE_CLUSTER_NUMBER_NODES} \
  --default-max-pods-per-node ${GKE_CLUSTER_MAXIMUM_PODS_PER_NODE} \
  --min-nodes ${GKE_CLUSTER_MINIMUM_NUMBER_NODES}\
  --max-nodes ${GKE_CLUSTER_MAXIMUM_NUMBER_NODES} \
  --max-surge-upgrade ${GKE_CLUSTER_MAXIMUM_SURGE_UPGRADE} \
  --max-unavailable-upgrade ${GKE_CLUSTER_MAXIMUM_UNAVAILABLE_UPGRADE} \
  --shielded-integrity-monitoring \
  --shielded-secure-boot \
  --resource-usage-bigquery-dataset "cluster_usage_metering" \
  --security-group "gke-security-groups@soprun.com"

gcloud container clusters describe ${GKE_CLUSTER_NAME} \
  --format yaml >> "tmp/cluster-describe-${GKE_CLUSTER_NAME}.yaml"
