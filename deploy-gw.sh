PROJECT=subsurface-advanced-analytics
GW_SA=aa-api-esp@subsurface-advanced-analytics.iam.gserviceaccount.com
GW_NAME=mudgas-func-gw
SVC_NAME=mudgas-api

gcloud endpoints services deploy ${SVC_NAME}.yaml --project ${PROJECT}
gcloud alpha run deploy ${GW_NAME} \
    --image="gcr.io/endpoints-release/endpoints-runtime-serverless:1" \
    --allow-unauthenticated \
    --project=${PROJECT} \
    --platform managed \
    --service-account ${GW_SA} \
    --region europe-west1 \
    --set-env-vars="ENDPOINTS_SERVICE_NAME=${SVC_NAME}.endpoints.${PROJECT}.cloud.goog, ESP_ARGS=^++^--cors_preset=basic++--cors_allow_origin=mudgas-frontend-yu3ohomvwq-ew.a.run.app++--cors_allow_methods=POST"
