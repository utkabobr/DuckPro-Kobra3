#!/usr/bin/env python

import sys, os

def patch(data, from_hex, to_hex):
    from_bytes = bytes.fromhex(from_hex)
    to_bytes = bytes.fromhex(to_hex)

    if len(to_bytes) != len(from_bytes):
        raise ValueError('HEX length mismatch')

    return data.replace(from_bytes, to_bytes)


def __main__():
    if len(sys.argv) <= 1:
        raise ValueError('Usage: python ' + sys.argv[0] + ' path/to/gklib')

    file_path = sys.argv[1]
    with open(file_path, 'rb') as file:
        data = file.read()

    data = patch(data,
          "00 00 50 E3 06 00 00 1A 68 00 9D E5",
          "00 00 50 E3 06 00 00 EA 68 00 9D E5")

    with open(file_path + '.tmp', 'wb') as file:
        file.write(data)

    print('Patched ' + file_path + '.')

__main__()