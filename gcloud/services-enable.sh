#!/usr/bin/env bash

source ./env.sh

# Чтобы включить метрики, выполните следующее:
# gcloud config set disable_usage_reporting false

# gcloud services list >> tmp/services-list.txt

gcloud services enable sqladmin.googleapis.com
