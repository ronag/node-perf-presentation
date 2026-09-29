/* CRC32 throughput of zlib's crc32_z over 1 MiB, best of 7 x 200 passes */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "zlib.h"
int main (void) {
  size_t n = 1 << 20;
  unsigned char *b = malloc(n);
  for (size_t i = 0; i < n; i++) b[i] = (unsigned char)((i * 2654435761u) >> 24);
  double best = 1e9; unsigned long c = 0;
  for (int r = 0; r < 7; r++) {
    struct timespec t0, t1;
    clock_gettime(CLOCK_MONOTONIC, &t0);
    for (int k = 0; k < 200; k++) c = crc32_z(c, b, n);
    clock_gettime(CLOCK_MONOTONIC, &t1);
    double s = (t1.tv_sec - t0.tv_sec) + (t1.tv_nsec - t0.tv_nsec) / 1e9;
    if (s < best) best = s;
  }
  printf("%6.2f GB/s  (crc %08lx)\n", 200.0 * n / best / 1e9, c & 0xffffffff);
  return 0;
}
