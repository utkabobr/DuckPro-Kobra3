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
        raise ValueError('Usage: python ' + sys.argv[0] + ' path/to/K3SysUi')

    file_path = sys.argv[1]
    with open(file_path, 'rb') as file:
        data = file.read()

    data = patch(data,
          "22 76 FF EB 01 00 A0 E3 02 00 00 EA",
          "22 76 FF EB 00 00 A0 E3 02 00 00 EA")

    with open(file_path + '.tmp', 'wb') as file:
        file.write(data)

    print('Patched ' + file_path + '.')

__main__()