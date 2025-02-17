const { Tracer, Array1DTracer, ChartTracer, LogTracer, Randomize, Layout, VerticalLayout } = require('algorithm-visualizer');

const chart = new ChartTracer();
const tracer = new Array1DTracer();
const logger = new LogTracer();
Layout.setRoot(new VerticalLayout([chart, tracer, logger]));
const D = Randomize.Array1D({ N: 15 });
tracer.set(D);
tracer.chart(chart);
Tracer.delay();

logger.println(`original array = [${D.join(', ')}]`);

function partition(D, low, high) {
  let i;
  let j;
  let s;
  while (high > low) {
    i = low;
    j = high;
    s = D[low];
    while (i < j) {
      tracer.select(high);
      tracer.select(low);
      Tracer.delay();
      while (D[j] > s) {
        tracer.select(j);
        Tracer.delay();
        tracer.deselect(j);
        j--;
      }
      D[i] = D[j];
      tracer.patch(i, D[j]);
      Tracer.delay();
      tracer.depatch(i);
      while (s >= D[i] && i < j) {
        tracer.select(i);
        Tracer.delay();
        tracer.deselect(i);
        i++;
      }
      D[j] = D[i];
      tracer.patch(j, D[i]);
      Tracer.delay();
      tracer.depatch(j);
      tracer.deselect(high);
      tracer.deselect(low);
    }
    D[i] = s;
    tracer.patch(i, s);
    Tracer.delay();
    tracer.depatch(i);
    partition(D, low, i - 1);
    low = i + 1;
  }
}

function quicksort(D) {
  partition(D, 0, D.length - 1);
}

quicksort(D);
logger.println(`sorted array = [${D.join(', ')}]`);
