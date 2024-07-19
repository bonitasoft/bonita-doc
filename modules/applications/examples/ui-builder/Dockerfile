ARG VERSION=1.0.0
ARG BASE=bonitasoft.jfrog.io/docker/bonita-ui-builder
FROM ${BASE}:${VERSION}

ARG WORKSPACE=./workspace/
ENV BONITA_APPLICATION_FOLDER_PATH=/workspace/applications/
ENV BONITA_DEV_MODE=false

COPY ${WORKSPACE} ${BONITA_APPLICATION_FOLDER_PATH}

EXPOSE 80
EXPOSE 443
ENTRYPOINT [ "/opt/appsmith/entrypoint.sh" ]
HEALTHCHECK --interval=15s --timeout=15s --start-period=45s CMD "/opt/appsmith/healthcheck.sh"
CMD ["/usr/bin/supervisord", "-n"]
