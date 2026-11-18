"""Mede a rolagem entre quadros consecutivos de img/seq/<site>/d_###.webp.

Saida: os atributos para o index.html. data-shift="i:s ..." diz que o quadro i+1
e o quadro i rolado s px para cima; data-shift-top e a altura da barra fixa do site.
Transicoes que sao animacao no lugar (sem rolagem) ficam de fora e seguem com fusao.

Uso: python tools/frame_shifts.py acai voltride barber kurama agenda
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

MAX_SHIFT = 240


def load(path):
    return np.asarray(Image.open(path).convert('L'), dtype=np.float32)[:, ::2]


def measure(a, b):
    H = a.shape[0]
    best_s, best_e = 0, 1e9
    for s in range(1, MAX_SHIFT):
        e = np.mean(np.abs(a[s + 90:H, ::2] - b[90:H - s, ::2]))  # ignora o topo, onde pode haver barra fixa
        if e < best_e:
            best_s, best_e = s, e
    still = np.mean(np.abs(a[90:H - best_s, ::2] - b[90:H - best_s, ::2]))
    if best_e > 4 or best_e > 0.35 * still:
        return None
    # barra fixa: linhas do topo que batem melhor paradas do que roladas
    row_still = np.mean(np.abs(a[:H - best_s] - b[:H - best_s]), axis=1)
    row_moved = np.mean(np.abs(a[best_s:] - b[:H - best_s]), axis=1)
    h = 0
    for y in range(0, 160):
        if row_still[y] + 1 < row_moved[y]:
            h = y + 1
    return best_s, h


for name in sys.argv[1:]:
    frames = [load(f) for f in sorted(Path('img/seq', name).glob('d_*.webp'))]
    out, tops = [], []
    for i in range(len(frames) - 1):
        m = measure(frames[i], frames[i + 1])
        if m:
            out.append(f'{i}:{m[0]}')
            tops.append(m[1])
    top = int(np.median(tops)) if tops else 0
    print(f'{name}: data-shift="{" ".join(out)}" data-shift-top="{top}"')
