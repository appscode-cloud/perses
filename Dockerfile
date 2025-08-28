FROM alpine AS build-env
RUN apk add --update --no-cache mailcap
RUN mkdir /perses
RUN mkdir /plugins

FROM gcr.io/distroless/base-debian12

LABEL maintainer="The Perses Authors <perses-team@googlegroups.com>"

# Copy a minimal shell and a few tools from Alpine for debugging
COPY --from=alpine:3.20 /bin/sh /bin/sh
COPY --from=alpine:3.20 /bin/ls /bin/ls
COPY --from=alpine:3.20 /bin/cat /bin/cat
COPY --from=alpine:3.20 /bin/mkdir /bin/mkdir
COPY --from=alpine:3.20 /bin/rm /bin/rm

USER nobody

COPY --chown=nobody:nobody /bin/perses                            /bin/perses
COPY --chown=nobody:nobody /bin/percli                            /bin/percli
COPY --chown=nobody:nobody LICENSE                           /LICENSE
COPY --chown=nobody:nobody plugins-archive/                  /etc/perses/plugins-archive/
COPY --chown=nobody:nobody dev/config.yaml                   /etc/perses/config.yaml
COPY --from=build-env --chown=nobody:nobody                  /perses         /perses
COPY --from=build-env --chown=nobody:nobody                  /plugins        /etc/perses/plugins
COPY --from=build-env --chown=nobody:nobody                  /etc/mime.types /etc/mime.types

WORKDIR /perses

EXPOSE 8080
VOLUME ["/perses"]

ENTRYPOINT [ "/bin/perses" ]
CMD ["--config=/etc/perses/config.yaml", "--log.level=error"]