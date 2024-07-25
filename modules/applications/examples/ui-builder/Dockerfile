ARG VERSION=pass:a[{bonita-ui-builder-version}]
ARG BASE=pass:a[{bonita-ui-builder-image}]
FROM $\{BASE}:$\{VERSION}

# Argument for the folder location on the host where exported JSON applications are stored
ARG WORKSPACE=./workspace/

# Make sure that the dev mode is disabled
ENV BONITA_DEV_MODE=false

# If you're using the 1.0.0-beta.1 version of the UI builder, you need to uncomment the following line and comment the line 15
#COPY $\{WORKSPACE} /workspace/applications/

# Copy JSON applications inside an internal folder to be imported at startup
COPY $\{WORKSPACE} /opt/appsmith/workspace/applications/

EXPOSE 80
EXPOSE 443
ENTRYPOINT [ "/opt/appsmith/entrypoint.sh" ]
HEALTHCHECK --interval=15s --timeout=15s --start-period=45s CMD "/opt/appsmith/healthcheck.sh"
CMD ["/usr/bin/supervisord", "-n"]
