// https://opentelemetry.io/docs/js/getting_started/nodejs/

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { NodeSDK, tracing } from '@opentelemetry/sdk-node';

const sdk = new NodeSDK({
  traceExporter: new tracing.InMemorySpanExporter(),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

process.on('SIGTERM', () => sdk.shutdown().finally(() => process.exit(0)));
