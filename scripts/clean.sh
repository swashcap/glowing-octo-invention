#!/bin/sh

find api/src ui/src -type f -name "*.js" -exec rm {} \+ &
rm -rf dist

wait