#!/usr/bin/env bash

# printenv | sort

printenv SUPER_SECRET

echo ${SUPER_SECRET:-not secret}
