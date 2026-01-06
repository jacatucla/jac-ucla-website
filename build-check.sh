#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "main" || "$VERCEL_GIT_COMMIT_REF" == "staging" ]] ; then
  # Proceed with the build for main or staging branches
  echo "✅ - Build can proceed"
  exit 1;
else
  # Don't build for any other branches
  echo "🛑 - Build cancelled"
  exit 0;
fi